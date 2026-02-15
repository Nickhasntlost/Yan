import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import SiteConfig from '@/models/SiteConfig';
import { INITIAL_SITE_CONFIG } from '@/lib/initial-content';

export async function POST() {
    try {
        console.log("Starting seed process...");
        await connectDB();
        console.log("DB Connected");

        // Check if config exists
        const existingConfig = await SiteConfig.findOne();
        console.log("Existing config found:", !!existingConfig);

        if (existingConfig) {
            // Option 1: Do nothing if exists
            // return NextResponse.json({ message: "Config already exists", config: existingConfig });

            // Option 2: Update it to ensure new fields are present (User wants to ensure specific content is in DB)
            // We will merge the initial config.
            console.log("Updating existing config...");
            await SiteConfig.updateOne({}, { $set: INITIAL_SITE_CONFIG });
            console.log("Config updated.");
            return NextResponse.json({ message: "Config updated with initial content" });
        } else {
            console.log("Creating new config...");
            await SiteConfig.create(INITIAL_SITE_CONFIG);
            console.log("Config created.");
            return NextResponse.json({ message: "Config seeded successfully" });
        }

    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: 'Failed to seed database: ' + error }, { status: 500 });
    }
}
