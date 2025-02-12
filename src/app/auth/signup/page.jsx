"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // ✅ Import signIn for Google Auth

const Signup = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (res.ok) {
                router.push("/auth/signin"); // Redirect to login page after signup
            } else {
                console.error("Signup failed");
            }
        } catch (error) {
            console.error("Error signing up:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setLoading(true);
        try {
            await signIn("google", { callbackUrl: "/restaurant/dashboard" });
        } catch (error) {
            console.error("Google SignIn Error:", error);
        }
        setLoading(false);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="contact"
                        value={user.contact}
                        onChange={handleChange}
                        placeholder="Contact"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        value={user.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <div className="w-full border-t border-gray-300"></div>
                    <p className="px-3 text-gray-500">OR</p>
                    <div className="w-full border-t border-gray-300"></div>
                </div>

                {/* Google Sign-Up Button */}
                <button
                    onClick={handleGoogleSignUp}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                    disabled={loading}
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.35 11.1h-9.17v2.97h5.25c-.24 1.4-1.04 2.56-2.25 3.35l3.63 2.82c2.12-1.96 3.33-4.83 3.33-8.07 0-.65-.06-1.28-.18-1.88z" />
                        <path d="M12 21c2.71 0 4.98-.9 6.64-2.42l-3.63-2.82c-1 .67-2.25 1.08-3.63 1.08-2.79 0-5.14-1.88-5.98-4.44H1.68v2.83c1.69 3.42 5.22 5.77 9.32 5.77z" />
                        <path d="M6.02 13.39c-.22-.65-.35-1.34-.35-2.05s.13-1.4.35-2.05v-2.83h-4.34c-.88 1.76-1.38 3.76-1.38 5.88s.5 4.12 1.38 5.88z" />
                        <path d="M12 4.64c1.57 0 2.97.54 4.07 1.58l3.03-3.03C17.98 1.16 15.71 0 12 0 7.9 0 4.36 2.35 2.68 5.77l3.63 2.83c.84-2.56 3.19-4.44 5.98-4.44z" />
                    </svg>
                    {loading ? "Signing Up..." : "Sign Up with Google"}
                </button>
            </div>
        </div>
    );
};

export default Signup;
