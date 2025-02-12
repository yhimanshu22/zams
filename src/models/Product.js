import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    path: String,
    desc: String,
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
