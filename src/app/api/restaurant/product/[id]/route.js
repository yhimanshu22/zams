
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

// DELETE a product by ID
export async function DELETE(req, { params }) {
    await connectDB();

    try {
        // const { id } = params; // ❌ This won't work
        // Extract the ID correctly from URL
        const url = new URL(req.url);
        const idFromUrl = url.pathname.split("/").pop(); // Extracts ID from "/api/product/:id"

        if (!idFromUrl) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        const deletedProduct = await Product.findByIdAndDelete(idFromUrl);

        if (!deletedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


// PUT (Update a product)
export async function PUT(req, { params }) {
    await connectDB();

    try {
        const { id } = params;
        const body = await req.json();
        const { name, price, path, desc } = body;

        if (!id) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, path, desc },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product updated successfully", updatedProduct }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
