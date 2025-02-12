import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hash } from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB(); // Connect to MongoDB

        const { name, email, password, contact, address, city } = await req.json();

        // Check if all required fields are provided
        if (!name || !email || !password || !contact || !address || !city) {
            return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
        }

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password,
            contact,
            address,
            city
        });

        return new Response(JSON.stringify({ message: "User created successfully", user: newUser }), { status: 201 });
    } catch (error) {
        console.error("Signup Error:", error);
        return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
    }
}
