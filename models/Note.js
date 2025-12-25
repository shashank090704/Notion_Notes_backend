import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: { type: String, required: true },
    content: { type: String, default: "" },
    category: { type: String, default: "Personal" },
    color: { type: String, default: "blue" },
    isFavorite: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.Note ||
  mongoose.model("Note", NoteSchema);
