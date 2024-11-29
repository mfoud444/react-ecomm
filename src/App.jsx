import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';
import ProuctsPage from './pages/ProuctsPage';
import BlogsPage from './pages/BlogsPage';
import WorkshopsPage from './pages/WorkshopsPage';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import AdminDashboard from './pages/admin/AdminDashboard'
import ProductManagement from './pages/admin/ProductManagement'
// import AdminUsers from './pages/admin/AdminUsers';
// import AdminOrders from './pages/admin/AdminOrders';
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/shop", element: <ProuctsPage /> },
  { path: "/blogs", element: <BlogsPage /> },
  { path: "/workshops", element: <WorkshopsPage /> },
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/auth/signup", element: <SignupPage/> },
  { path: "/profile", element: <ProfilePage/> },
  { path: "*", element: <div>Page Not Found</div> },
  { path: "/cart", element: <CartPage /> },
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/admin/products", element: <ProductManagement /> },
  // { path: "/admin/users", element: <AdminUsers /> },
  // { path: "/admin/orders", element: <AdminOrders /> },
]);

const App = () => {
  return (
    <div className=" bg-white min-h-[100vh] dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
