"use client";

import { motion } from "framer-motion";

export const Loader = ({ message = "Loading data..." }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] w-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/5 to-[#00B388]/5 pointer-events-none" />
      <motion.div
        className="relative flex items-center justify-center w-24 h-24 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#007BFF] border-r-[#00B388] border-b-[#007BFF] opacity-80 shadow-lg shadow-[#007BFF]/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner pulsing ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-[#042B6B]/10 border-l-[#042B6B] opacity-90"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Logo */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#042B6B] to-[#007BFF] flex items-center justify-center shadow-inner z-10">
          <motion.span 
            className="font-black text-xl text-white tracking-tighter"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            CV
          </motion.span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col items-center gap-2"
      >
        <h3 className="text-lg font-black text-[#042B6B] tracking-tight">CoreVita</h3>
        <div className="flex items-center gap-1.5 text-sm font-bold text-[#007BFF] opacity-80 uppercase tracking-widest">
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          >•</motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          >•</motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          >•</motion.span>
          <span className="ml-1">{message}</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          >•</motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          >•</motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          >•</motion.span>
        </div>
      </motion.div>
    </div>
  );
};
