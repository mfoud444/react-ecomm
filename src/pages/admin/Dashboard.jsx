import React, { useState } from 'react';
import { Menu, X, Home, ShoppingBag, Users, FileText, ChevronDown } from 'lucide-react';

const Dashboard = () => {
 
  return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              {/* Dashboard cards */}
              {['Total Products', 'Active Users', 'Pending Orders', 'Total Revenue'].map((item, index) => (
                <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-md">
                  <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">{item}</p>
                    <p className="text-lg font-semibold text-gray-700">0</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Placeholder for more dashboard content */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <p className="text-gray-600">No recent activity to display.</p>
            </div>
          </div>
        </main>
  );
};

export default Dashboard;

