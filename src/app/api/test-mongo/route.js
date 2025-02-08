import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import restaurantSchema from "@/lib/model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Ensure MongoDB connection
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr);
      console.log("✅ Connected to MongoDB");
    }

    // Test Query: Fetch any one document
    const testRestaurant = await restaurantSchema.findOne();

    return NextResponse.json({
      success: true,
      message: "MongoDB is working!",
      data: testRestaurant || "No restaurants found",
    });
  } catch (error) {
    console.error("❌ MongoDB Test Failed:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
