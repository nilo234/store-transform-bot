import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container-wide">
          <motion.div 
            className="max-w-lg mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-8xl mb-6 block">🔍</span>
            <h1 className="font-display text-6xl md:text-7xl font-bold mb-4 text-primary">404</h1>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="btn-primary w-full sm:w-auto">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" className="w-full sm:w-auto border-2">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Products
                </Button>
              </Link>
            </div>
            
            <p className="mt-8 text-sm text-muted-foreground">
              Need help?{' '}
              <Link to="/contact" className="text-primary hover:underline">
                Contact our support team
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
