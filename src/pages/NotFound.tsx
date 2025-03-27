
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-slate-50">
        <div className="text-center px-6 py-24 max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-brand-600 mb-4">404</h1>
          <p className="text-2xl font-semibold text-slate-800 mb-4">Page not found</p>
          <p className="text-slate-600 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button className="bg-brand-600 hover:bg-brand-700">
              Go back to home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
