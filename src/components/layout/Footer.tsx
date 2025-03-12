
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="w-full py-6 px-8 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} HealthLens AI. All rights reserved.
        </p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <FooterLink>Privacy</FooterLink>
          <FooterLink>Terms</FooterLink>
          <FooterLink>Contact</FooterLink>
        </div>
      </div>
      <div className="mt-4 text-center text-xs text-gray-400">
        <p>This tool is for educational purposes only and does not replace professional medical advice.</p>
      </div>
    </motion.footer>
  );
};

const FooterLink = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.a 
      href="#" 
      className="text-sm text-gray-500 hover:text-medical-600 transition-all-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

export default Footer;
