
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Header = () => {
  return (
    <motion.header 
      className="w-full py-6 px-8 flex items-center justify-between glassmorphism sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/" className="flex items-center gap-2">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <Activity className="h-6 w-6 text-medical-600" />
          <span className="ml-2 text-xl font-medium text-gray-900">HealthLens AI</span>
        </motion.div>
      </Link>
      
      <nav className="hidden md:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/analyze">Analyze</NavLink>
        <NavLink to="/history">History</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      
      <div className="md:hidden">
        {/* Mobile menu button could go here */}
      </div>
    </motion.header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link 
      to={to} 
      className="text-gray-600 hover:text-medical-600 transition-all-200 text-sm font-medium"
    >
      {children}
    </Link>
  );
};

export default Header;
