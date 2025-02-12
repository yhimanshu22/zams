"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", price: "", path: "", desc: "" });
    const [editId, setEditId] = useState(null);
    const router = useRouter();

    // Fetch all products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/restaurant/product");
            const data = await res.json();
            if (data.success) {
                setProducts(data.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add or Update Product
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const method = editId ? "PUT" : "POST";
        const url = editId ? `/api/restaurant/product/${editId}` : "/api/restaurant/product";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (data.error) {
                alert(data.error);
            } else {
                alert(editId ? "Product updated!" : "Product added!");
                setForm({ name: "", price: "", path: "", desc: "" });
                setEditId(null);
                fetchProducts(); // Refresh product list
            }
        } catch (error) {
            console.error("Error saving product:", error);
        }

        setLoading(false);
    };

    // Delete Product
    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/restaurant/product/${id}`, { method: "DELETE" });
            const data = await res.json();

            console.log(data);

            if (data.message == "Product deleted successfully") {
                alert("Product deleted!");
                fetchProducts(); // Refresh product list after delete
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
        setLoading(false);
    };

    // Set product for editing
    const handleEdit = (product) => {
        setForm({ name: product.name, price: product.price, path: product.path, desc: product.desc });
        setEditId(product._id);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>

            {/* Product Form */}
            <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="path"
                    value={form.path}
                    onChange={handleChange}
                    placeholder="Image Path"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="desc"
                    value={form.desc}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded w-full"
                    disabled={loading}
                >
                    {loading ? "Processing..." : editId ? "Update Product" : "Add Product"}
                </button>
            </form>

            {/* Product List */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Products</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="space-y-2">
                        {products.length === 0 ? (
                            <p>No products found</p>
                        ) : (
                            products.map((product) => (
                                <li key={product._id} className="p-2 border rounded flex justify-between items-center">
                                    <span>{product.name} - ${product.price}</span>
                                    <div>
                                        <button
                                            className="bg-green-500 text-white p-1 rounded mr-2"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white p-1 rounded"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}
