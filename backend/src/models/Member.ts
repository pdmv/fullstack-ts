import mongoose, { Document, Schema } from "mongoose";

export interface IMember extends Document {
  name: string;
  email: string;
  borrowedBooks: mongoose.Types.ObjectId[];
}

const MemberSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

export default mongoose.model<IMember>("Member", MemberSchema);