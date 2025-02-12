"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignIn = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await signIn("credentials", {
            email: credentials.email,
            password: credentials.password,
            redirect: false, // Prevent automatic redirect
        });

        if (result?.error) {
            alert("Login failed: " + result.error); // Show error to user
        } else {
            router.push("/restaurant/dashboard"); // Redirect after login
        }

        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        await signIn("google", { callbackUrl: "/restaurant/dashboard" });
        setLoading(false);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign in with Google"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
