"use client";

import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import React from 'react';

const Dashboard = () => {
    return (
        <div className="flex h-screen w-full bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-500 min-w-[250px] shadow-lg">
                <Sidebar />
            </aside>
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6 bg-gray-50">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Dashboard</h1>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        {/* Add your dashboard components here */}
                        <p className="text-gray-700">Welcome to your dashboard!</p>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
