"use client"; // ✅ This makes it a client component

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children, session }) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
