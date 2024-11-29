import express, { Request, Response } from "express";
import Member from "../models/Member";
import Book from "../models/Book";
import { Types } from "mongoose";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  if (req.query.searchTerm) {
    const members = await Member.find({ name: { $regex: req.query.searchTerm } });
    res.json(members);
    return;
  }
  const members = await Member.find();
  res.json(members);
});

router.get("/:id", async (req: Request, res: Response) => {
  const member = await Member.findById(req.params.id);

  if (!member) {
    res.status(404).json({ message: "Member not found" });
    return;
  }

  res.json(member);
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }

    res.json({ message: "Member deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.post(
  "/borrow/:memberId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const member = await Member.findById(req.params.memberId);
      const book = await Book.findById(req.body.bookId);

      if (!member || !book) {
        res.status(404).json({ message: "Member or Book not found" });
        return;
      }

      if (book.quantity <= 0) {
        res.status(400).json({ message: "Book not available" });
        return;
      }

      if (member.borrowedBooks.includes(req.body.bookId)) {
        res.status(400).json({ message: "Book can only be borrowed once" });
        return;
      }

      member.borrowedBooks.push(book._id as Types.ObjectId);
      book.quantity -= 1;

      await member.save();
      await book.save();

      res.json({ member, book });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);

router.post(
  "/return/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const member = await Member.findById(req.params.id);
      const book = await Book.findById(req.body.bookId);

      if (!member || !book) {
        res.status(404).json({ message: "Member or Book not found" });
        return;
      }

      member.borrowedBooks = member.borrowedBooks.filter(
        (b) => b.toString() !== (book._id as Types.ObjectId).toString()
      );
      book.quantity += 1;

      await member.save();
      await book.save();

      res.json({ member, book });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);

export default router;
