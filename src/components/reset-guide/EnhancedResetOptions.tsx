"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { ButtonColorfulRed } from "@/components/ui/button-colorful-red";
import { Check, X, ArrowRight, Shield, Trash2, FileCheck, Database, HardDrive } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TextShimmer } from "@/components/ui/text-shimmer";

export type ResetOptionType = "keepFiles" | "removeEverything" | null;

interface EnhancedResetOptionsProps {
  onOptionSelect: (option: ResetOptionType) => void;
  selectedOption: ResetOptionType;
}

export function EnhancedResetOptions({ onOptionSelect, selectedOption }: EnhancedResetOptionsProps) {
  const [hoveredOption, setHoveredOption] = useState<ResetOptionType>(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    }),
    selected: {
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
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
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-1">
          Choose Your
          <div className="mt-2 md:mt-3">
            <TextShimmer as="span" duration={2} spread={6} className="inline-block pb-2">
              Reset Option
            </TextShimmer>
          </div>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-6 md:mt-8">
          Select one of the following options to continue with the Windows 11 reset process.
          This choice will determine which files are kept or removed during the reset.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {/* Both cards will have identical structure and sizing */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          animate={selectedOption === "keepFiles" ? "selected" : hoveredOption === "keepFiles" ? "hover" : "visible"}
          onHoverStart={() => setHoveredOption("keepFiles")}
          onHoverEnd={() => setHoveredOption(null)}
          viewport={{ once: true }}
          variants={cardVariants}
        >
          <Card className={`h-full border-0 shadow-md transition-all duration-300 overflow-hidden flex flex-col ${
            selectedOption === "keepFiles"
              ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-0 bg-blue-50/50 dark:bg-blue-950/30"
              : "hover:shadow-xl"
          }`}>
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pb-8 relative overflow-hidden h-[140px] flex flex-col justify-center">
              <div className="absolute right-0 top-0 w-32 h-32 -mt-8 -mr-8 rounded-full bg-blue-400/20 backdrop-blur-sm"></div>
              <div className="absolute left-0 bottom-0 w-24 h-24 -mb-12 -ml-12 rounded-full bg-blue-400/10 backdrop-blur-sm"></div>

              <div className="relative z-10 flex items-center gap-3">
                <motion.div
                  className="bg-white/20 backdrop-blur-sm p-2 rounded-full"
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <FileCheck className="h-6 w-6" />
                </motion.div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold mb-1">Keep My Files</CardTitle>
                  <CardDescription className="text-blue-100 line-clamp-2">Reinstall Windows while preserving your personal data</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6 flex-grow">
              <ul className="space-y-3 min-h-[180px]">
                {[
                  { text: "Keeps all personal files (documents, photos, music)", icon: <HardDrive className="h-5 w-5 text-blue-500" />, positive: true },
                  { text: "Preserves some personalization settings", icon: <Shield className="h-5 w-5 text-blue-500" />, positive: true },
                  { text: "Removes all installed applications", icon: <Database className="h-5 w-5 text-red-500" />, positive: false },
                  { text: "Removes system customizations and settings", icon: <Trash2 className="h-5 w-5 text-red-500" />, positive: false }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={listItemVariants}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-2 pb-6 mt-auto">
              {selectedOption === "keepFiles" ? (
                <ButtonColorful
                  className="w-full h-11 flex items-center justify-center"
                  onClick={() => onOptionSelect("keepFiles")}
                  label="Selected"
                />
              ) : (
                <ButtonColorful
                  className="w-full h-11 bg-blue-500 flex items-center justify-center"
                  onClick={() => onOptionSelect("keepFiles")}
                  label="Choose This Option"
                />
              )}
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          animate={selectedOption === "removeEverything" ? "selected" : hoveredOption === "removeEverything" ? "hover" : "visible"}
          onHoverStart={() => setHoveredOption("removeEverything")}
          onHoverEnd={() => setHoveredOption(null)}
          viewport={{ once: true }}
          variants={cardVariants}
        >
          <Card className={`h-full border-0 shadow-md transition-all duration-300 overflow-hidden flex flex-col ${
            selectedOption === "removeEverything"
              ? "ring-2 ring-red-500 ring-offset-2 dark:ring-offset-0 bg-red-50/50 dark:bg-red-950/30"
              : "hover:shadow-xl"
          }`}>
            <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white pb-8 relative overflow-hidden h-[140px] flex flex-col justify-center">
              <div className="absolute right-0 top-0 w-32 h-32 -mt-8 -mr-8 rounded-full bg-red-400/20 backdrop-blur-sm"></div>
              <div className="absolute left-0 bottom-0 w-24 h-24 -mb-12 -ml-12 rounded-full bg-red-400/10 backdrop-blur-sm"></div>

              <div className="relative z-10 flex items-center gap-3">
                <motion.div
                  className="bg-white/20 backdrop-blur-sm p-2 rounded-full"
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <Trash2 className="h-6 w-6" />
                </motion.div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold mb-1">Remove Everything</CardTitle>
                  <CardDescription className="text-red-100 line-clamp-2">Complete reset to factory defaults</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6 flex-grow">
              <ul className="space-y-3 min-h-[180px]">
                {[
                  { text: "Completely fresh Windows installation", icon: <Shield className="h-5 w-5 text-green-500" />, positive: true },
                  { text: "Removes all potential system issues", icon: <Check className="h-5 w-5 text-green-500" />, positive: true },
                  { text: "Deletes ALL personal files and data", icon: <Trash2 className="h-5 w-5 text-red-500" />, positive: false },
                  { text: "Removes all applications and user accounts", icon: <Database className="h-5 w-5 text-red-500" />, positive: false }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={listItemVariants}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-2 pb-6 mt-auto">
              {selectedOption === "removeEverything" ? (
                <ButtonColorfulRed
                  className="w-full h-11 flex items-center justify-center"
                  onClick={() => onOptionSelect("removeEverything")}
                  label="Selected"
                />
              ) : (
                <ButtonColorfulRed
                  className="w-full h-11 flex items-center justify-center"
                  onClick={() => onOptionSelect("removeEverything")}
                  label="Choose This Option"
                />
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {selectedOption && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mt-8"
        >
          {selectedOption === "keepFiles" ? (
            <ButtonColorful
              className="px-8 h-11"
              onClick={() => document.getElementById('reset-steps')?.scrollIntoView({ behavior: 'smooth' })}
              label="Continue to Reset Steps"
            />
          ) : (
            <ButtonColorfulRed
              className="px-8 h-11"
              onClick={() => document.getElementById('reset-steps')?.scrollIntoView({ behavior: 'smooth' })}
              label="Continue to Reset Steps"
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
