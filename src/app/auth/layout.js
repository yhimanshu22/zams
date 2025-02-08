import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-400 to-red-500 p-6">
      <Card className="w-full max-w-md shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            🍔 Zomato for Food
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>

      <footer className="mt-6 text-sm text-white">
        © {new Date().getFullYear()} Foodie App - Deliciousness Delivered 🚀
      </footer>
    </div>
  );
};

export default Layout;
