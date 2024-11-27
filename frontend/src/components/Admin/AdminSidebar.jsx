import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Users, FileText } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/admin' },
    { icon: ShoppingBag, label: 'Products', href: '/admin/products' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: FileText, label: 'Orders', href: '/admin/orders' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:static lg:inset-0">
      <div className="flex items-center justify-between h-16 px-6 bg-gray-800 text-white">
        <span className="text-xl font-semibold">Admin Panel</span>
      </div>
      <nav className="mt-6">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 ${
                  location.pathname === item.href
                    ? 'bg-gray-100 text-gray-900 border-r-4 border-gray-900'
                    : ''
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;