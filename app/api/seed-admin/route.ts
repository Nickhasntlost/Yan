import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectDB();

        // Check for a secret key to prevent unauthorized seeding
        const { searchParams } = new URL(req.url);
        const secret = searchParams.get("secret");

        if (secret !== process.env.ADMIN_PASSWORD) { // Temporarily using the old env var as the secret key
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const username = "admin";
        const password = "yantrika$2560"; // Hardcoded initial password as requested

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            // Update password
            const hashedPassword = await bcrypt.hash(password, 10);
            existingAdmin.password = hashedPassword;
            await existingAdmin.save();
            return NextResponse.json({ message: "Admin password updated" });
        }

        // Create new admin
        const hashedPassword = await bcrypt.hash(password, 10);
        await Admin.create({
            username,
            password: hashedPassword,
        });

        return NextResponse.json({ message: "Admin created successfully" });
    } catch (error) {
        console.error("Error seeding admin:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
