import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import Note from "@/models/Note";

export async function PUT(req, { params }) {
  await connectDB();
  const decoded = verifyToken(req);
  if (!decoded) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const data = await req.json();

  const note = await Note.findOneAndUpdate(
    { _id: params.id, userId: decoded.userId },
    data,
    { new: true }
  );

  if (!note) {
    return NextResponse.json(
      { message: "Note not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(note);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const decoded = verifyToken(req);
  if (!decoded) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  await Note.findOneAndDelete({
    _id: params.id,
    userId: decoded.userId
  });

  return NextResponse.json({ message: "Note deleted" });
}
