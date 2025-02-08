"use client"
import React from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-lg p-4">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input type="email" placeholder="Enter email" className="w-full" />
            <Input type="password" placeholder="Enter password" className="w-full" />
            <div className="flex flex-col items-center space-y-2">
              <Button className="w-full">Login</Button>
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-blue-500 underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login

