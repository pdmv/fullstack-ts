import express, { Express } from "express";
import "dotenv/config";
import connectDB from "./configs/db";
import cors from "cors";
import bodyParser from "body-parser";
import bookRoutes from "./routes/bookRoutes";
import memberRoutes from "./routes/memberRoutes";

const app: Express = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});