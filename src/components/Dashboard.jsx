"use client"

import { useState } from "react";
import { Menu, Moon, Sun, User, ShoppingCart, BarChart } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Dashboard = () => {
    const [darkMode, setDarkMode] = useState(false);

    const session = getServerSession(authOptions)

    if (!session) {
        redirect('/auth/login')
    }

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex`}>
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-5 hidden md:block">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
                <nav className="mt-6 space-y-4">
                    <a href="#" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                        <User className="w-5 h-5" /> <span>Profile</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                        <ShoppingCart className="w-5 h-5" /> <span>Orders</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                        <BarChart className="w-5 h-5" /> <span>Analytics</span>
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Top Bar */}
                <div className="flex justify-between items-center">
                    <button className="md:hidden p-2 rounded-md bg-white dark:bg-gray-700">
                        <Menu className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold">Welcome Back, User!</h1>
                    <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-md bg-white dark:bg-gray-700">
                        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    </button>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Total Orders</h2>
                        <p className="text-3xl font-bold">1,234</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Revenue</h2>
                        <p className="text-3xl font-bold">$12,340</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">New Users</h2>
                        <p className="text-3xl font-bold">345</p>
                    </div>
                </div>

                {/* Recent Orders Table */}
                <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">Recent Orders</h2>
                    <table className="w-full mt-3 text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-300 dark:border-gray-700">
                                <th className="p-2">Order ID</th>
                                <th className="p-2">Customer</th>
                                <th className="p-2">Total</th>
                                <th className="p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-300 dark:border-gray-700">
                                <td className="p-2">#1234</td>
                                <td className="p-2">John Doe</td>
                                <td className="p-2">$120</td>
                                <td className="p-2 text-green-600 dark:text-green-400">Completed</td>
                            </tr>
                            <tr className="border-b border-gray-300 dark:border-gray-700">
                                <td className="p-2">#1235</td>
                                <td className="p-2">Jane Smith</td>
                                <td className="p-2">$75</td>
                                <td className="p-2 text-yellow-600 dark:text-yellow-400">Pending</td>
                            </tr>
                            <tr className="border-b border-gray-300 dark:border-gray-700">
                                <td className="p-2">#1236</td>
                                <td className="p-2">Alex Johnson</td>
                                <td className="p-2">$90</td>
                                <td className="p-2 text-red-600 dark:text-red-400">Cancelled</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
