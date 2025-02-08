"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input
              type="email"
              placeholder="Enter email"
              className="w-full"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              type="password"
              placeholder="Enter password"
              className="w-full"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
          
          <div className="flex flex-col items-center space-y-2 mt-4">
            <Button className="w-full">Login</Button>
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-blue-500 underline">
                Register
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

