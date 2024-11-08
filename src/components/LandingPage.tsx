import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Silhouette Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 0 L100 100 L0 100 Z" fill="%23111827"/></svg>')`
        }}
      ></div>

      {/* Geometric Patterns */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-96 h-96 border-r-4 border-teal-400 transform rotate-45"
          ></motion.div>
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-96 h-96 border-r-4 border-teal-400 transform rotate-45 translate-x-8"
          ></motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-7xl font-bold tracking-tight">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-teal-400"
            >
              ASESORIA
            </motion.span>
          </h1>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center space-x-4"
          >
            <ChevronDoubleRightIcon className="h-8 w-8 text-teal-400" />
            <h2 className="text-4xl font-medium tracking-wider">
              ONLINE
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-5xl font-bold text-teal-400"
          >
            CUTIFIT
          </motion.div>

          <motion.button
            onClick={onEnter}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-transparent border-2 border-teal-400 rounded-lg overflow-hidden transition-all duration-300 ease-out hover:bg-teal-400 mt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">COMENZAR AHORA</span>
            <div className="absolute inset-0 bg-teal-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};