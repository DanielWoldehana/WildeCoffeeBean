"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 5000,
  position = "top-right", // "top-right" or "center"
  actionButton = null, // Optional button component
  autoClose = true, // Whether to auto-close (default true for success, false for errors)
}) {
  const [animationData, setAnimationData] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Load animation based on type
    const animationFile =
      type === "success"
        ? "/animations/SuccessToast.json"
        : "/animations/ErrorToast.json";

    fetch(animationFile)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setAnimationData(data);
        } catch (parseError) {
          console.error(
            `Failed to parse ${type} Toast Lottie JSON:`,
            parseError
          );
        }
      })
      .catch((err) =>
        console.error(`Failed to load ${type} Toast Lottie animation:`, err)
      );

    // Auto-dismiss after duration (only if autoClose is true)
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300); // Wait for animation to complete
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [type, duration, onClose, autoClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const handleBackdropClick = (e) => {
    // Close if clicking the backdrop (not the modal content)
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Theme colors - clean and modern
  const bgColor =
    type === "success"
      ? "bg-[var(--lime-green)]"
      : "bg-[var(--coffee-brown-medium-light)]";
  const textColor = type === "success" ? "text-white" : "text-[var(--coffee-brown)]";

  // Always use center layout for modal-like behavior
  const isCenterLayout = position === "center" || true; // Force center layout

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop - prevents interaction with rest of app */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/50 z-[9998]"
          />

          {/* Toast Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] ${bgColor} ${textColor} rounded-xl shadow-2xl w-[90%] max-w-md mx-auto`}
            onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking modal
          >
            {/* Center layout: Animation at top, message below, buttons side by side */}
            <div className="flex flex-col items-center p-6 sm:p-8">
              {/* Animation Header */}
              <div className="mb-4">
                {animationData ? (
                  <div className="h-20 w-20 sm:h-24 sm:w-24">
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      autoplay={true}
                      className="h-full w-full"
                    />
                  </div>
                ) : (
                  <div className="h-20 w-20 sm:h-24 sm:w-24 flex items-center justify-center text-4xl">
                    {type === "success" ? "✓" : "✕"}
                  </div>
                )}
              </div>

              {/* Message */}
              <p className="text-center text-sm sm:text-base font-medium mb-4 px-2">
                {message}
              </p>

              {/* Action Button and Close Button - Side by Side, no gap, closer to edges */}
              <div className="flex items-center w-full -mx-2 px-2">
                {actionButton && <div className="flex-1">{actionButton}</div>}
                <button
                  onClick={handleClose}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105 ${
                    actionButton
                      ? type === "success"
                        ? "bg-white/20 hover:bg-white/30 text-white"
                        : "bg-[var(--coffee-brown)] hover:bg-[var(--coffee-brown-dark)] text-white"
                      : type === "success"
                      ? "bg-white/20 hover:bg-white/30 text-white flex-1"
                      : "bg-[var(--coffee-brown)] hover:bg-[var(--coffee-brown-dark)] text-white flex-1"
                  }`}
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
