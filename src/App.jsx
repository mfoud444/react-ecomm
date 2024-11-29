import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedAdminRoute from './components/common/ProtectedAdminRoute';
import HomePage from './pages/HomePage';
import ProuctsPage from './pages/ProuctsPage';
import BlogsPage from './pages/BlogsPage';
import WorkshopsPage from './pages/WorkshopsPage';
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import AdminLayout from './components/Admin/AdminLayout';
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage';

import { lazy, Suspense } from 'react';

// Lazily loaded admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProductManagement = lazy(() => import('./pages/admin/ProductManagement'));
// const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
// const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));

const App = () => {
  return (
    <div className="bg-white min-h-[100vh] dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ProuctsPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/workshops" element={<WorkshopsPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/workshops" element={<WorkshopsPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />

            <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
    
           
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<ProductManagement />} />
              {/* Uncomment and use if Admin pages are available */}
              {/* <Route path="users" element={<AdminUsers />} /> */}
              {/* <Route path="orders" element={<AdminOrders />} /> */}
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
