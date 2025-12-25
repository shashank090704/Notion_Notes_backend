import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import Note from "@/models/Note";

export async function GET(req) {
  await connectDB();
  const decoded = verifyToken(req);
  if (!decoded) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const notes = await Note.find({ userId: decoded.userId })
    .sort({ updatedAt: -1 });

  return NextResponse.json(notes);
}

export async function POST(req) {
  await connectDB();
  const decoded = verifyToken(req);
  if (!decoded) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const note = await Note.create({
    ...body,
    userId: decoded.userId
  });

  return NextResponse.json(note, { status: 201 });
}
