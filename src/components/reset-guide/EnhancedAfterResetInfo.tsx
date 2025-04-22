"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  AlertTriangle,
  Download,
  Settings,
  FileCheck,
  HardDrive,
  Laptop,
  Shield,
  RefreshCw,
  Zap,
  Clock,
  Wifi,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ResetOptionType } from "./EnhancedResetOptions";
import { memo, useRef, useMemo } from "react";

interface EnhancedAfterResetInfoProps {
  selectedOption: ResetOptionType;
}

export const EnhancedAfterResetInfo = memo(function EnhancedAfterResetInfo({ selectedOption }: EnhancedAfterResetInfoProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    },
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  // Define colors based on selected option
  const getIconColors = () => {
    if (selectedOption === "keepFiles") {
      return {
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-600 dark:text-blue-400"
      };
    } else {
      return {
        bgColor: "bg-red-100 dark:bg-red-900/30",
        textColor: "text-red-600 dark:text-red-400"
      };
    }
  };

  const { bgColor, textColor } = getIconColors();
  const iconColorClass = `${bgColor} ${textColor}`;

  // Content for "Keep My Files" option
  const keepFilesContent = useMemo(() => [
    {
      icon: <Download className="h-6 w-6" />,
      color: iconColorClass,
      title: "Reinstall Your Applications",
      description: "All your applications will need to be reinstalled as they were removed during the reset process. Start with essential software like browsers, antivirus, and productivity tools."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      color: iconColorClass,
      title: "Reconfigure Settings",
      description: "While some personalization settings are preserved, you'll need to reconfigure many system settings to your preferences, including display settings, privacy options, and default applications."
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      color: iconColorClass,
      title: "Verify Your Files",
      description: "Although your personal files should be preserved, it's good practice to verify that all important files are still accessible and functioning properly."
    },
    {
      icon: <Wifi className="h-6 w-6" />,
      color: iconColorClass,
      title: "Update Drivers & Windows",
      description: "Make sure to check for and install the latest Windows updates and device drivers to ensure optimal performance and security."
    }
  ], [iconColorClass]);

  // Content for "Remove Everything" option
  const removeEverythingContent = useMemo(() => [
    {
      icon: <Laptop className="h-6 w-6" />,
      color: iconColorClass,
      title: "Complete Initial Setup",
      description: "Your computer will be like new, requiring you to go through the initial Windows setup process. This includes creating a user account, connecting to networks, and setting basic preferences."
    },
    {
      icon: <Download className="h-6 w-6" />,
      color: iconColorClass,
      title: "Install Essential Applications",
      description: "Install your preferred web browser, antivirus, productivity tools, and other essential applications. Consider using a package manager to streamline this process."
    },
    {
      icon: <HardDrive className="h-6 w-6" />,
      color: iconColorClass,
      title: "Restore Your Backups",
      description: "If you created backups before the reset, now is the time to restore your important files from those backups. Make sure to verify the integrity of restored files."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      color: iconColorClass,
      title: "Configure Security Settings",
      description: "Set up Windows Security features, including firewall settings, virus protection, and account security options to keep your fresh installation protected."
    }
  ], [iconColorClass]);

  // Select the appropriate content based on the selected option
  const { content, title, subtitle, gradientColors } = useMemo(() => ({
    content: selectedOption === "keepFiles" ? keepFilesContent : removeEverythingContent,
    title: selectedOption === "keepFiles"
      ? "What to Do After Keeping Your Files"
      : "What to Do After Removing Everything",
    subtitle: selectedOption === "keepFiles"
      ? "Follow these steps to get your system back to a fully functional state while preserving your personal data."
      : "Follow these steps to set up your freshly reset Windows 11 device from scratch.",
    gradientColors: selectedOption === "keepFiles"
      ? "from-blue-500 to-cyan-500"
      : "from-red-500 to-orange-500"
  }), [selectedOption, keepFilesContent, removeEverythingContent]);

  return (
    <div ref={sectionRef}>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedOption}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={cardVariants}
          className="space-y-8"
        >
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className={`bg-gradient-to-r ${gradientColors} text-white pb-6 relative overflow-hidden`}>
            {/* Random dots pattern - positioned behind the content */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 32 }).map((_, index) => {
                // Generate random positions
                const size = Math.random() * 0.8 + 0.2; // Random size between 0.2 and 1
                const top = Math.random() * 100; // Random top position
                const left = Math.random() * 100; // Random left position
                const delay = Math.random() * 0.5; // Random animation delay
                const opacity = Math.random() * 0.4 + 0.2; // Random opacity between 0.2 and 0.6

                return (
                  <motion.div
                    key={index}
                    className="absolute rounded-full bg-white blur-[0.5px]"
                    style={{
                      top: `${top}%`,
                      left: `${left}%`,
                      width: `${size * 8}px`,
                      height: `${size * 8}px`,
                      opacity: opacity
                    }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                      y: [0, size * -3, size * -5, size * -3, 0],
                      opacity: [opacity, opacity * 0.8, opacity * 0.7, opacity * 0.8, opacity]
                    }}
                    transition={{
                      delay: delay,
                      duration: 3 + Math.random() * 4, // Random duration between 3-7 seconds
                      repeat: Infinity,
                      repeatDelay: 0.1, // Tiny delay between repeats for smoother looping
                      ease: "easeInOut"
                    }}
                  />
                );
              })}
            </div>

            {/* Content positioned on top of the dots */}
            <div className="relative z-10 flex items-center gap-4">
              <motion.div
                className="bg-white/20 backdrop-blur-sm p-3 rounded-full"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                {selectedOption === "keepFiles" ? (
                  <FileCheck className="h-6 w-6" />
                ) : (
                  <RefreshCw className="h-6 w-6" />
                )}
              </motion.div>
              <div>
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                <CardDescription className="text-white/80 dark:text-white mt-1 text-base">
                  {subtitle}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {content.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={listItemVariants}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`p-3 rounded-full ${item.color}`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {item.icon}
                        </motion.div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50 dark:bg-gray-900/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {selectedOption === "keepFiles"
                  ? "Estimated time to complete: 30-60 minutes depending on the number of applications"
                  : "Estimated time to complete: 1-2 hours for a complete setup"
                }
              </p>
            </div>
            <Button
              variant="outline"
              className={`rounded-full ${
                selectedOption === "keepFiles"
                  ? "border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-800 dark:hover:text-blue-200 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-800"
                  : "border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-800 dark:hover:text-red-200 hover:border-red-300 dark:hover:border-red-600 bg-white dark:bg-gray-800"
              }`}
            >
              <Zap className="mr-2 h-4 w-4" />
              View Detailed Guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-4 flex items-start gap-3"
        >
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-sm">Important Note</p>
            <p className="text-sm text-muted-foreground">
              {selectedOption === "keepFiles"
                ? "While your personal files are preserved, you may need to reactivate some software licenses. Keep your product keys and account information handy."
                : "Make sure you have backups of all important files before proceeding with the 'Remove Everything' option, as all data will be permanently deleted."
              }
            </p>
          </div>
        </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});
