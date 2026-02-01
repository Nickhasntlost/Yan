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

export async function DELETE() {
  await connectDB();
  await CoreTeam.deleteMany({});
  return NextResponse.json({ message: "All members deleted" });
}
