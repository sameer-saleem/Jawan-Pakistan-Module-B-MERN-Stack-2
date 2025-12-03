import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';
import SignIn from './components/login/Login';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/signup/Signup';
import { useLocation } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Sidebar from './components/sidebar/Sidebar';
import Students from './components/students/Students';
import LandingPage from './components/pages/LP';

function App() {
  const location = useLocation();
  const path = location.pathname;

  const appRoutes = ['/dashboard', '/students', '/profile', '/settings'];

  const publicRoutes = ['/', '/sign-in', '/website'];

  const isAppRoute = appRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  return (
    <>

      {isAppRoute && <Sidebar />}
      {isAppRoute && <Header />}

      <Routes>

        <Route path="/" element={<Signup />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/website" element={<LandingPage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />

      </Routes>

      {isAppRoute && <Footer />}
    </>
  );
}

export default App;