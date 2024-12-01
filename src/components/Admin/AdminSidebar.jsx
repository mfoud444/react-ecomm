import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, ShoppingBag, Users, FileText, Calendar } from 'lucide-react';

const AdminSidebar = ({ isOpen, onClose, onNavigate }) => {
  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/admin' },
    { icon: ShoppingBag, label: 'Products', href: '/admin/products' },
    { icon: FileText, label: 'Categories', href: '/admin/categories' },
    { icon: Users, label: 'Customers', href: '/admin/customers' },
    { icon: Users, label: 'Artists', href: '/admin/artists' },
    { icon: Users, label: 'Admins', href: '/admin/admins' },
    { icon: FileText, label: 'Orders', href: '/admin/orders' },
    { icon: Calendar, label: 'Workshops', href: '/admin/workshops' },
  ];

  return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-black shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-6 bg-blue-900 text-white">
        <span className="text-xl font-semibold">Admin Panel</span>
        <button onClick={onClose} className="lg:hidden">
          <X size={24} />
          <span className="sr-only">Close sidebar</span>
        </button>
      </div>
      <nav className="mt-6">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.href}
                onClick={onNavigate}
                className={({ isActive }) => `
                  flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900
                  ${isActive ? 'bg-gray-100 text-gray-900 border-r-4 border-gray-900' : ''}
                `}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;