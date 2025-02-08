import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import restaurantSchema from "@/lib/model"; 


export async function GET() {

console.log(connectionStr)
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr);
      console.log("Connected to MongoDB");
    }

    const data = await restaurantSchema.find()
    console.log(data);

    return NextResponse.json({ result: true });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    return NextResponse.json({ result: false, error: error.message }, { status: 500 });
  }
}
