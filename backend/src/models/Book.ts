import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  quantity: number;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  quantity: { type: Number, default: 0 },
});

export default mongoose.model<IBook>("Book", BookSchema);
