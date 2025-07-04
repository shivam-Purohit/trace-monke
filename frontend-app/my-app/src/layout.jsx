// Layout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import ResponsiveNavBar from './components/navbar';
import Footer from './components/footer';

export default function Layout() {
  const location = useLocation();
  const showFooter = location.pathname !== '/login';

  return (
    <div className="App">
      <ResponsiveNavBar />
      <Outlet />
      {showFooter && <Footer />}
    </div>
  );
}
