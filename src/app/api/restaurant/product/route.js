import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

// GET all products
export async function GET() {
    await connectDB();

    try {
        const products = await Product.find(); // Fetch all products from DB
        return NextResponse.json({ success: true, data: products }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
    }
}

// POST (Add a new product)
export async function POST(req) {
    await connectDB();

    try {
        const body = await req.json();
        const { name, price, path, desc } = body;

        if (!name || !price || !path || !desc) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const newProduct = await Product.create({ name, price, path, desc });

        return NextResponse.json({ message: "Product added successfully", newProduct }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
