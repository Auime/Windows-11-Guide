"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isMobile } from "@/lib/isMobile";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [domReady, setDomReady] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const assetsToLoad = useRef([
    '/images/chat-icon.svg',
    '/images/Logo.png',
    '/images/testimonial-1.jpg',
    '/images/testimonial-2.jpg',
    '/images/testimonial-3.jpg',
    // Add other critical assets here
  ]);
  const loadedAssets = useRef(new Set());

  // Check if user is on a mobile device
  useEffect(() => {
    // Check if the user is on a mobile device
    const mobile = isMobile();
    setIsMobileDevice(mobile);

    // If on mobile, set loading as failed
    if (mobile) {
      setLoadingFailed(true);
      // Change progress to show error state
      setProgress(100);
    }
  }, []);

  // Check if DOM is ready
  useEffect(() => {
    if (document.readyState === 'complete') {
      setDomReady(true);
    } else {
      const handleReadyStateChange = () => {
        if (document.readyState === 'complete') {
          setDomReady(true);
        }
      };
      document.addEventListener('readystatechange', handleReadyStateChange);
      return () => document.removeEventListener('readystatechange', handleReadyStateChange);
    }
  }, []);

  // Preload assets
  useEffect(() => {
    const preloadAssets = async () => {
      const promises = assetsToLoad.current.map(src => {
        return new Promise((resolve, reject) => {
          if (src.endsWith('.svg') || src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg')) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              loadedAssets.current.add(src);
              resolve(src);
            };
            img.onerror = () => reject(`Failed to load image: ${src}`);
          } else {
            // For other asset types, just fetch them
            fetch(src)
              .then(() => {
                loadedAssets.current.add(src);
                resolve(src);
              })
              .catch(() => reject(`Failed to fetch: ${src}`));
          }
        });
      });

      try {
        await Promise.all(promises);
        setAssetsLoaded(true);
      } catch (error) {
        console.error('Error preloading assets:', error);
        // Continue anyway to not block the user
        setAssetsLoaded(true);
      }
    };

    preloadAssets();
  }, []);

  // Handle progress and completion
  useEffect(() => {
    // If on mobile device, don't proceed with normal loading
    if (isMobileDevice) {
      return;
    }

    // Start with slower progress until assets are loaded
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Limit progress based on loading states
        let maxProgress = 50; // Base progress
        if (assetsLoaded) maxProgress += 25;
        if (domReady) maxProgress += 25;

        // Only allow 100% when everything is ready
        const isFullyLoaded = assetsLoaded && domReady;

        // Accelerate progress as it gets closer to maxProgress
        const remaining = maxProgress - prevProgress;
        const increment = Math.max(0.5, Math.floor(remaining / 10));
        const nextProgress = Math.min(maxProgress, prevProgress + increment);

        // Check if we've reached 100% and everything is loaded
        if (nextProgress >= 100 && isFullyLoaded) {
          clearInterval(interval);
          // Add a small delay before completing
          setTimeout(() => {
            setIsComplete(true);
            // Notify parent component that loading is complete
            setTimeout(onLoadingComplete, 800);
          }, 500);
        }

        return nextProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete, assetsLoaded, domReady, isMobileDevice]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        ease: [0.22, 1, 0.36, 1],
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    },
    exit: {
      scale: 1.5,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" }
    }
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: `${progress}%`,
      transition: { ease: "easeInOut" }
    }
  };

  return (
    <>
      {/* Mobile device error dialog */}
      <AlertDialog open={isMobileDevice} defaultOpen={isMobileDevice}>
        <AlertDialogContent className="border-2 border-red-500 dark:border-red-700 w-[90%] max-w-[350px] bg-gray-50 dark:bg-gray-800 p-5 shadow-lg rounded-xl overflow-hidden">
          <AlertDialogHeader className="pb-2">
            <AlertDialogTitle className="text-red-600 dark:text-red-400 text-center text-xl font-bold">
              Mobile Devices Not Supported
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center border-t border-gray-200 dark:border-gray-700 pt-3 mt-2">
              <div className="mt-3 mb-4">
                <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-3 w-20 h-20 mx-auto flex items-center justify-center mb-4 shadow-inner border border-red-200 dark:border-red-800/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  This website is not available on mobile devices.
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                  Please visit this site on a desktop or laptop computer for the best experience.
                </p>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700/50 p-2 rounded-md">
                  <span className="font-medium">Note:</span> This site requires a larger screen and is not optimized for mobile browsing.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      <AnimatePresence mode="wait">
        {!isComplete && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Animated circles */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/10 dark:from-blue-500/10 dark:to-cyan-500/5 blur-3xl"
                variants={circleVariants}
                animate={{
                  x: [0, 10, 0, -10, 0],
                  y: [0, -10, 0, 10, 0],
                  transition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 dark:from-purple-500/10 dark:to-pink-500/5 blur-3xl"
                variants={circleVariants}
                animate={{
                  x: [0, -10, 0, 10, 0],
                  y: [0, 10, 0, -10, 0],
                  transition: {
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              <motion.div
                className="absolute top-1/2 right-1/3 w-[20vw] h-[20vw] rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/10 dark:from-amber-500/10 dark:to-orange-500/5 blur-3xl"
                variants={circleVariants}
                animate={{
                  x: [0, 15, 0, -15, 0],
                  y: [0, -5, 0, 5, 0],
                  transition: {
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
            </div>

            {/* Content container */}
            <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center">
              {/* Modern animated loading circle */}
              <motion.div
                className="relative w-48 h-48"
                variants={itemVariants}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Main progress circle */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Background track */}
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="rgba(0,0,0,0.05)"
                      strokeWidth="2"
                      className="dark:stroke-white/5"
                    />

                    {/* Main progress track */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke={loadingFailed ? "#ef4444" : "url(#gradient)"}
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{
                        pathLength: progress / 100,
                        transition: { duration: 0.5, ease: "easeInOut" }
                      }}
                    />

                    {/* Gradient */}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" /> {/* blue-500 */}
                        <stop offset="50%" stopColor="#06B6D4" /> {/* cyan-500 */}
                        <stop offset="100%" stopColor="#8B5CF6" /> {/* violet-500 */}
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Inner content with percentage */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {loadingFailed ? (
                      <>
                        <div className="text-4xl font-semibold text-red-500 dark:text-red-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <div className="text-xs text-red-500 dark:text-red-400 mt-1 tracking-wider">
                          ERROR
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-4xl font-semibold text-black dark:text-white">
                          {Math.floor(progress)}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 tracking-wider">
                          LOADING
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)] pointer-events-none opacity-30 dark:opacity-20" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
