// 📁 src/components/IntroAnimation.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IntroAnimation() {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => navigate("/home"), 1000); // Delay before navigating
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen bg-[#22004e] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <motion.img
              src="/public/siggraph-logo-2.svg"
              alt="SIGGRAPH BNMIT Logo"
              className="w-40 h-40"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2 }}
            />
            <motion.h1
              className="mt-4 text-white text-2xl font-bold tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              SIGGRAPH BNMIT
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
