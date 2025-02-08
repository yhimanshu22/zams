import { connectionStr } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Restaurant from "@/lib/model";  // Ensure this is correct

export async function POST(request) {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
        }

        const payload = await request.json();
        console.log("Received Payload:", payload);

        // Check if all fields exist
        if (!payload.email || !payload.password || !payload.contact || !payload.address || !payload.city) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
        }

        const restaurant = new Restaurant(payload);
        const result = await restaurant.save();

        console.log("Saved Data:", result);

        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error creating restaurant:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
