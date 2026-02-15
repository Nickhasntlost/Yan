import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import SiteConfig from "@/models/SiteConfig";

async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.has("admin_session");
}

export async function GET() {
    await connectDB();
    let config = await SiteConfig.findOne();
    if (!config) {
        config = await SiteConfig.create({});
    }
    return NextResponse.json(config);
}

export async function PUT(request: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const data = await request.json();

    const config = await SiteConfig.findOneAndUpdate({}, data, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
    });

    return NextResponse.json(config);
}
