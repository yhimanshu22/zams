import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db"; // Your database connection function
import User from "@/models/User"; // Your User model

export const authOptions = {
    providers: [
        // ✅ Google Authentication
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        // ✅ Email & Password Authentication
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "your@email.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB(); // Connect to database

                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("User not found");
                }

                // Verify password (Assuming bcrypt)
                const isValidPassword = await user.comparePassword(credentials.password);
                if (!isValidPassword) {
                    throw new Error("Invalid password");
                }

                return user; // Return user if authentication succeeds
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin", // Custom sign-in page
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
