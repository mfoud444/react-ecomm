import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedAdminRoute from './components/common/ProtectedAdminRoute';
import HomePage from './pages/HomePage';
import ProuctsPage from './pages/ProuctsPage';
import WorkshopsPage from './pages/WorkshopsPage';
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import AdminLayout from './components/Admin/AdminLayout';
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage';

import { lazy, Suspense } from 'react';
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProductManagement = lazy(() => import('./pages/admin/ProductManagement'));
const CategoryManagement = lazy(() => import('./pages/admin/CategoryManagement'));
const CustomerManagement = lazy(() => import('./pages/admin/CustomerManagement'));
const ArtistManagement = lazy(() => import('./pages/admin/ArtistManagement'));
const AdminManagement = lazy(() => import('./pages/admin/AdminManagement'));
const OrderManagement = lazy(() => import('./pages/admin/OrderManagement'));
const WorkshopManagement = lazy(() => import('./pages/admin/WorkshopManagement'));

const App = () => {
  return (
    <div className="bg-white min-h-[100vh] dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ProuctsPage />} />
            <Route path="/workshops" element={<WorkshopsPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />

            <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
    
           
              <Route index path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="categories" element={<CategoryManagement />} />
              <Route path="customers" element={<CustomerManagement />} />
              <Route path="artists" element={<ArtistManagement />} />
              <Route path="admins" element={<AdminManagement />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="workshops" element={<WorkshopManagement />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
