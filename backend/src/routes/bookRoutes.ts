import express, { Request, Response } from "express";
import Book, { IBook } from "../models/Book"

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const books = await Book.find();
  res.json(books);
});

router.get("/:id", async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404).json({ message: "Book not found" });
    return;
  }

  res.json(book);
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const book: IBook = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
