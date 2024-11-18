import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';
import ProuctsPage from './pages/ProuctsPage';
import BlogsPage from './pages/BlogsPage';
import WorkshopsPage from './pages/WorkshopsPage';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/shop", element: <ProuctsPage /> },
  { path: "/blogs", element: <BlogsPage /> },
  { path: "/workshops", element: <WorkshopsPage /> },
  { path: "*", element: <div>Page Not Found</div> },
]);

const App = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
