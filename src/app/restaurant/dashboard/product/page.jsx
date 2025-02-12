"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

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

            if (data.message === "Product deleted successfully") {
                alert("Product deleted!");
                setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id)); // Remove product instantly
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
        <div className="container mx-auto p-6">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Product Management</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Product Form */}
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <Input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Product Name" required />
                        <Input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
                        <Input type="text" name="path" value={form.path} onChange={handleChange} placeholder="Image Path" required />
                        <Input type="text" name="desc" value={form.desc} onChange={handleChange} placeholder="Description" required />
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Processing..." : editId ? "Update Product" : "Add Product"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Product List */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Product List</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p>Loading...</p>
                    ) : products.length === 0 ? (
                        <p>No products found</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>${product.price}</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm" onClick={() => handleEdit(product)} className="mr-2">
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(product._id)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
