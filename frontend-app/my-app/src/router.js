import { createBrowserRouter} from "react-router-dom"
import SignInPage from "./components/signin"
import HomePage from "./components/homepage";
import Layout from './layout'; // Optional wrapper for navbar/footer

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // this includes ResponsiveNavBar and Footer
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <SignInPage /> },
    ],
  },
]);
export default router;