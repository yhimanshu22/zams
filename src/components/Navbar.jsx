"use client";

import { useSession } from "next-auth/react"; // ✅ Import useSession
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession(); // ✅ Get user session

    const handleLogout = async () => {
        // Sign out and remove session
        await signOut({ callbackUrl: "/", redirect: true });

        // Clear localStorage or sessionStorage if storing user data
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");

        // (Optional) Clear cookies manually if needed
        document.cookie =
            "next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    return (
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <div className="flex h-14 items-center justify-between border-b border-zinc-200 max-w-7xl mx-auto px-4">
                {/* Logo */}
                <Link href="/" className="flex z-40 font-semibold">
                    <span>Zams</span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden items-center space-x-4 sm:flex">
                    {!session ? (
                        <>
                            <Link href="/pricing" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                                Pricing
                            </Link>
                            <Link href="/auth/signin" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                                Sign in
                            </Link>
                            <Link href="/auth/signup" className={buttonVariants({ size: "sm" })}>
                                Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/restaurant/dashboard" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                                Dashboard
                            </Link>
                            <p className="text-sm  text-gray-700">Welcome, {session.user.name}</p>
                            <button
                                onClick={handleLogout}
                                className={buttonVariants({ size: "sm" })}
                            >
                                Logout
                            </button>

                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
