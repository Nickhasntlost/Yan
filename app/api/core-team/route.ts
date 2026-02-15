import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CoreTeam from "@/models/CoreTeam";

export async function GET() {
  await connectDB();
  const members = await CoreTeam.find().sort({ roleOrder: 1 });
  return NextResponse.json(members);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const member = await CoreTeam.create(body);
  return NextResponse.json(member);
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const { _id, ...updateData } = body;
  const member = await CoreTeam.findByIdAndUpdate(_id, updateData, { new: true });
  return NextResponse.json(member);
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    await CoreTeam.findByIdAndDelete(id);
    return NextResponse.json({ message: "Member deleted" });
  } else {
    // Optional: Keep delete all or remove it for safety. keeping it as per original but it's risky.
    // Given the admin context, maybe we only want to delete one.
    // The previous implementation was deleteMany({}).
    // I will support SINGLE deletion primarily.
    return NextResponse.json({ message: "ID required for deletion" }, { status: 400 });
  }
}
