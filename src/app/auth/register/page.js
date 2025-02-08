"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setCPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const handleRegister = async () =>{
    console.log(email,password,c_password,name,address,contact);

    let result = await fetch("http://localhost:3000/api/auth",{
        method:"POST",
        //we do not send password
        body:JSON.stringify({email,password,name,city , contact,address})
    })

    result = await result.json()
    console.log(result);

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input
              type="email"
              placeholder="Please provide email ID"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={c_password}
              onChange={(event) => setCPassword(event.target.value)}
            />
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              type="text"
              placeholder="City"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <Input
              type="text"
              placeholder="Contact"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
            />
            <Input
              type="text"
              placeholder="Full Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </form>

          <div className="flex flex-col items-center space-y-2 mt-4">
            <Button onClick={handleRegister} className="w-full">Register</Button>
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-500 underline">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
