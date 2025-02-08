'use client'
import React from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input type="email" placeholder="Please provide email ID" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="confirm Password" />
            <Input type="text" placeholder="Name" />
            <Input type="text" placeholder="City" />
            <Input type="text" placeholder="Contact" />
             <Input type="text" placeholder="Full Address" />
            <Input type="text" placeholder="Pincode" />
            
          </form>
                      <div className="flex flex-col items-center space-y-2">
              <Button className="w-full">Register</Button>
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
  )
}

export default Register
