import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import LabProject from "@/models/LabProject";

export async function GET() {
    try {
        await connectDB();
        const labProjects = await LabProject.find().lean();
        return NextResponse.json(labProjects);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch lab projects" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const labProject = await LabProject.create(body);
        return NextResponse.json(labProject, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create lab project" },
            { status: 500 }
        );
    }
}
