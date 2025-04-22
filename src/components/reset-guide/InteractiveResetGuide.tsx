"use client";

import { useState, useEffect, useRef, useMemo, memo, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Balloons } from "@/components/ui/balloons";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from "@/components/ui/stepper";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  LaptopIcon,
  Settings,
  RefreshCw,
  Zap,
  HardDrive,
  FileCheck,
  Trash2,
  Shield,
  AlertTriangle
} from "lucide-react";
import { ResetOptionType } from "./EnhancedResetOptions";

// Define the step data structure
interface ResetStep {
  number: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface InteractiveResetGuideProps {
  selectedOption: ResetOptionType;
}

export const InteractiveResetGuide = memo(function InteractiveResetGuide({ selectedOption }: InteractiveResetGuideProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  // Track current step for each option separately
  const [keepFilesCurrentStep, setKeepFilesCurrentStep] = useState(0);
  const [removeEverythingCurrentStep, setRemoveEverythingCurrentStep] = useState(0);

  // Track completed steps for each option separately
  const [keepFilesCompletedSteps, setKeepFilesCompletedSteps] = useState<number[]>([]);
  const [removeEverythingCompletedSteps, setRemoveEverythingCompletedSteps] = useState<number[]>([]);

  // Track whether the user has clicked the "Mark as Complete" button at least once for each option
  const [keepFilesHasMarkedAsComplete, setKeepFilesHasMarkedAsComplete] = useState(false);
  const [removeEverythingHasMarkedAsComplete, setRemoveEverythingHasMarkedAsComplete] = useState(false);

  // Get the appropriate hasMarkedAsComplete state based on the selected option
  const hasMarkedAsComplete = selectedOption === "keepFiles" ? keepFilesHasMarkedAsComplete : removeEverythingHasMarkedAsComplete;
  const setHasMarkedAsComplete = selectedOption === "keepFiles" ? setKeepFilesHasMarkedAsComplete : setRemoveEverythingHasMarkedAsComplete;

  // Get the appropriate current step and completed steps based on the selected option
  const currentStep = selectedOption === "keepFiles" ? keepFilesCurrentStep : removeEverythingCurrentStep;
  const setCurrentStep = selectedOption === "keepFiles" ? setKeepFilesCurrentStep : setRemoveEverythingCurrentStep;
  const completedSteps = selectedOption === "keepFiles" ? keepFilesCompletedSteps : removeEverythingCompletedSteps;
  const balloonsRef = useRef<HTMLDivElement & { launchAnimation: () => void }>(null);

  // Define the steps for the Windows 11 reset process based on the selected option
  const resetSteps = useMemo((): ResetStep[] => {
    // Common steps for both options
    const commonSteps: ResetStep[] = [
      {
        number: 1,
        title: "Accessing Recovery Options",
        description: "Open the Settings app by clicking the Start button and then the gear icon. Navigate to System > Recovery and locate the 'Reset this PC' option. Click the 'Reset this PC' button to begin.",
        imageSrc: "/images/steps/OneRedBlue.png",
        imageAlt: "Windows 11 Settings app showing the Recovery options page with Reset this PC option highlighted in both blue and red"
      }
    ];

    // Steps specific to "Keep my files" option
    const keepFilesSteps: ResetStep[] = [
      {
        number: 2,
        title: "Select 'Keep my files' Option",
        description: "When prompted, choose the 'Keep my files' option to reinstall Windows while preserving your personal data.",
        imageSrc: "/images/steps/TwoBlue.png",
        imageAlt: "Windows 11 reset options screen with 'Keep my files' option highlighted"
      },
      {
        number: 3,
        title: "Choose Reinstall Method",
        description: "Select either 'Cloud download' (downloads a fresh copy of Windows) or 'Local reinstall' (uses files already on your computer). Cloud download is recommended for better results but requires internet access.",
        imageSrc: "/images/steps/ThreeRedBlue.png",
        imageAlt: "Windows 11 reinstall options showing Cloud download and Local reinstall choices"
      },
      {
        number: 4,
        title: "Additional Options",
        description: "You may be presented with additional options for customizing your reset. Choose the settings that best match your needs. For most users, the default options are recommended.",
        imageSrc: "/images/steps/FourBlue.png",
        imageAlt: "Windows 11 additional reset options screen for Keep My Files option"
      },
      {
        number: 5,
        title: "Review Changes",
        description: "Review the list of apps that will be removed. All apps will need to be reinstalled after the reset, but your personal files will be kept.",
        imageSrc: "/images/steps/FiveBlue.png",
        imageAlt: "Windows 11 review changes screen showing apps that will be removed"
      },
      {
        number: 6,
        title: "Ready to Reset",
        description: "Review your choices and click the 'Reset' button to begin the process. Your computer will restart automatically.",
        imageSrc: "/images/steps/SixBlue.png",
        imageAlt: "Windows 11 final confirmation screen with Reset button highlighted"
      },
      {
        number: 7,
        title: "The Reset Process",
        description: "You'll see progress percentages and your computer may restart multiple times. Important: leave your computer plugged in and do not interrupt the process.",
        imageSrc: "/images/steps/SevenBlueRed.png",
        imageAlt: "Windows 11 reset progress screen showing percentage complete for Keep My Files option"
      },
      {
        number: 8,
        title: "Reinstall Your Applications",
        description: "Once the reset is complete, you'll need to reinstall all your applications as they were removed during the reset process.",
        imageSrc: "/images/steps/EightBlueRed.png",
        imageAlt: "Windows 11 desktop after reset showing the need to reinstall applications"
      }
    ];

    // Steps specific to "Remove everything" option
    const removeEverythingSteps: ResetStep[] = [
      {
        number: 2,
        title: "Select 'Remove everything' Option",
        description: "When prompted, choose the 'Remove everything' option to completely wipe your device and start fresh.",
        imageSrc: "/images/steps/TwoRed.png",
        imageAlt: "Windows 11 reset options screen with 'Remove everything' option highlighted"
      },
      {
        number: 3,
        title: "Choose Reinstall Method",
        description: "Select either 'Cloud download' (downloads a fresh copy of Windows) or 'Local reinstall' (uses files already on your computer). Cloud download is recommended for better results but requires internet access.",
        imageSrc: "/images/steps/ThreeRedBlue.png",
        imageAlt: "Windows 11 reinstall options showing Cloud download and Local reinstall choices"
      },
      {
        number: 4,
        title: "Choosing Settings",
        description: "You'll see a 'Change settings' link. Here you can choose 'Clean data' or 'Delete files and clean the drive' for more thorough data removal if you're giving away the computer.",
        imageSrc: "/images/steps/FourRed.png",
        imageAlt: "Windows 11 additional settings screen showing data cleaning options"
      },
      {
        number: 5,
        title: "Additional Settings",
        description: "Click the 'Next' button to proceed with the reset process after reviewing your settings.",
        imageSrc: "/images/steps/FiveRed.png",
        imageAlt: "Windows 11 Additional Settings screen with Next button highlighted"
      },
      {
        number: 6,
        title: "Ready to Reset",
        description: "Review your choices and click the 'Reset' button to begin the process. Your computer will restart automatically.",
        imageSrc: "/images/steps/SixRed.png",
        imageAlt: "Windows 11 final confirmation screen with Reset button highlighted for Remove Everything option"
      },
      {
        number: 7,
        title: "The Reset Process",
        description: "You'll see progress percentages and your computer may restart multiple times. Important: leave your computer plugged in and do not interrupt the process.",
        imageSrc: "/images/steps/SevenBlueRed.png",
        imageAlt: "Windows 11 reset progress screen showing percentage complete for Remove Everything option"
      },
      {
        number: 8,
        title: "Setting Up Windows 11",
        description: "Once the reset is complete, your computer will start with the initial Windows 11 setup screens. Follow the prompts to set up your device as if it were new.",
        imageSrc: "/images/steps/EightBlueRed.png",
        imageAlt: "Windows 11 initial setup screen after reset completion for Remove Everything option"
      }
    ];

    // Return the appropriate steps based on the selected option
    if (selectedOption === "keepFiles") {
      return [...commonSteps, ...keepFilesSteps];
    } else if (selectedOption === "removeEverything") {
      return [...commonSteps, ...removeEverythingSteps];
    }

    // Default to an empty array if no option is selected
    return [];
  }, [selectedOption]);

  const totalSteps = resetSteps.length;

  // We no longer reset the current step when selected option changes
  // Each option now maintains its own step position

  // Steps are only marked as completed when the user clicks the "Mark as Complete" button
  // After the user has clicked "Mark as Complete" at least once, steps will be automatically marked as completed
  // when navigating through the guide

  // Use useEffect to mark the current step as completed when hasMarkedAsComplete is true
  useEffect(() => {
    if (selectedOption === "keepFiles" && keepFilesHasMarkedAsComplete) {
      if (!keepFilesCompletedSteps.includes(currentStep)) {
        setKeepFilesCompletedSteps(prev => [...prev, currentStep]);
      }
    } else if (selectedOption === "removeEverything" && removeEverythingHasMarkedAsComplete) {
      if (!removeEverythingCompletedSteps.includes(currentStep)) {
        setRemoveEverythingCompletedSteps(prev => [...prev, currentStep]);
      }
    }
  }, [currentStep, keepFilesHasMarkedAsComplete, removeEverythingHasMarkedAsComplete, keepFilesCompletedSteps, removeEverythingCompletedSteps, selectedOption]);

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      // Navigate to the next step
      if (selectedOption === "keepFiles") {
        setKeepFilesCurrentStep(currentStep + 1);
      } else {
        setRemoveEverythingCurrentStep(currentStep + 1);
      }
    }
  }, [currentStep, totalSteps, selectedOption, setKeepFilesCurrentStep, setRemoveEverythingCurrentStep]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      // Navigate to the previous step
      if (selectedOption === "keepFiles") {
        setKeepFilesCurrentStep(currentStep - 1);
      } else {
        setRemoveEverythingCurrentStep(currentStep - 1);
      }
    }
  }, [currentStep, selectedOption, setKeepFilesCurrentStep, setRemoveEverythingCurrentStep]);

  const handleStepClick = useCallback((step: number) => {
    if (selectedOption === "keepFiles") {
      if (keepFilesHasMarkedAsComplete) {
        // Add all steps up to the current one to completed steps
        const stepsToAdd: number[] = [];
        for (let i = 0; i <= currentStep; i++) {
          if (!keepFilesCompletedSteps.includes(i)) {
            stepsToAdd.push(i);
          }
        }
        if (stepsToAdd.length > 0) {
          setKeepFilesCompletedSteps(prev => [...prev, ...stepsToAdd]);
        }
      }
      // Navigate to selected step
      setKeepFilesCurrentStep(step);
    } else {
      if (removeEverythingHasMarkedAsComplete) {
        // Add all steps up to the current one to completed steps
        const stepsToAdd: number[] = [];
        for (let i = 0; i <= currentStep; i++) {
          if (!removeEverythingCompletedSteps.includes(i)) {
            stepsToAdd.push(i);
          }
        }
        if (stepsToAdd.length > 0) {
          setRemoveEverythingCompletedSteps(prev => [...prev, ...stepsToAdd]);
        }
      }
      // Navigate to selected step
      setRemoveEverythingCurrentStep(step);
    }
  }, [selectedOption, currentStep, keepFilesHasMarkedAsComplete, removeEverythingHasMarkedAsComplete, keepFilesCompletedSteps, removeEverythingCompletedSteps, setKeepFilesCurrentStep, setRemoveEverythingCurrentStep, setKeepFilesCompletedSteps, setRemoveEverythingCompletedSteps]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Get step icon based on step number and selected option
  const getStepIcon = useMemo(() => (stepNumber: number, size: number = 4) => {
    if (selectedOption === "keepFiles") {
      switch(stepNumber) {
        case 1: return <Settings className={`size-${size}`} />;
        case 2: return <FileCheck className={`size-${size}`} />;
        case 3: return <RefreshCw className={`size-${size}`} />;
        case 4: return <AlertTriangle className={`size-${size}`} />;
        case 5: return <Zap className={`size-${size}`} />;
        case 6: return <RefreshCw className={`size-${size}`} />;
        case 7: return <LaptopIcon className={`size-${size}`} />;
        default: return <Settings className={`size-${size}`} />;
      }
    } else {
      switch(stepNumber) {
        case 1: return <Settings className={`size-${size}`} />;
        case 2: return <Trash2 className={`size-${size}`} />;
        case 3: return <RefreshCw className={`size-${size}`} />;
        case 4: return <Shield className={`size-${size}`} />;
        case 5: return <Zap className={`size-${size}`} />;
        case 6: return <RefreshCw className={`size-${size}`} />;
        case 7: return <CheckCircle className={`size-${size}`} />;
        default: return <Settings className={`size-${size}`} />;
      }
    }
  }, [selectedOption]);

  // If no option is selected, show a message
  if (!selectedOption || resetSteps.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 bg-gray-50 dark:bg-gray-800/30 rounded-xl shadow-sm"
      >
        <AlertTriangle className="size-12 mx-auto text-amber-500 mb-4" />
        <h3 className="text-xl font-medium mb-2">Please Select a Reset Option</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          You need to choose a reset option before viewing the step-by-step guide.
          Please go back and select either "Keep My Files" or "Remove Everything".
        </p>
      </motion.div>
    );
  }

  return (
    <div ref={sectionRef} className="space-y-8 w-full max-w-4xl mx-auto" id="reset-steps">
      {/* Stepper component for progress tracking */}
      <div className="mb-12">
        <Stepper value={currentStep + 1} onValueChange={(step) => setCurrentStep(step - 1)} className="w-full">
          {resetSteps.map((step, index) => (
            <StepperItem
              key={step.number}
              step={index + 1}
              completed={index < currentStep || completedSteps.includes(index) || (index === currentStep && completedSteps.includes(currentStep))}
              className="[&:not(:last-child)]:flex-1"
            >
              <StepperTrigger
                onClick={() => handleStepClick(index)}
                className="group focus-visible:outline-none"
              >
                <div className="relative w-8 h-8 flex-shrink-0">
                  <StepperIndicator
                    className={`absolute inset-0 shadow-md transition-all duration-300 group-hover:shadow-lg flex items-center justify-center data-[state=completed]:bg-gradient-to-br data-[state=completed]:from-green-500 data-[state=completed]:to-emerald-300 ${
                      completedSteps.includes(index)
                        ? "data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-400 data-[state=active]:to-emerald-300"
                        : selectedOption === "keepFiles"
                          ? "data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400"
                          : "data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500 data-[state=active]:to-orange-400"
                    }`}
                  >
                    <span className="flex items-center justify-center w-4 h-4">
                      {completedSteps.includes(index) ?
                        <Check className="h-4 w-4 text-white" />
                        : getStepIcon(step.number)
                      }
                    </span>
                  </StepperIndicator>
                </div>
                {/* Step titles removed */}
              </StepperTrigger>
              {index < resetSteps.length - 1 && (
                <StepperSeparator
                  className={`h-[2px] bg-gradient-to-r from-muted via-muted/80 to-muted transition-all duration-500 ${
                    selectedOption === "keepFiles"
                      ? "data-[state=completed]/step:from-green-500 data-[state=completed]/step:via-green-400 data-[state=completed]/step:to-emerald-400"
                      : "data-[state=completed]/step:from-red-500 data-[state=completed]/step:via-red-400 data-[state=completed]/step:to-orange-400"
                  }`}
                />
              )}
            </StepperItem>
          ))}
        </Stepper>
      </div>

      {/* Current step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -20 }}
          variants={fadeIn}
          className="w-full"
        >
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 shadow-md w-full h-auto">
          <CardHeader className={`pb-6 min-h-[120px] ${
              completedSteps.includes(currentStep)
                ? "bg-gradient-to-r from-green-50/80 to-green-100/30 dark:from-green-950/30 dark:to-green-900/10"
                : selectedOption === "keepFiles"
                  ? "bg-gradient-to-r from-blue-50/80 to-blue-100/30 dark:from-blue-950/30 dark:to-blue-900/10"
                  : "bg-gradient-to-r from-red-50/80 to-red-100/30 dark:from-red-950/30 dark:to-red-900/10"
            }`}>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 flex-shrink-0">
                <motion.div
                  className={`absolute inset-0 flex items-center justify-center rounded-full text-white shadow-md ${
                      completedSteps.includes(currentStep)
                        ? "bg-gradient-to-br from-green-400 to-emerald-300"
                        : selectedOption === "keepFiles"
                          ? "bg-gradient-to-br from-blue-500 to-cyan-400"
                          : "bg-gradient-to-br from-red-500 to-orange-400"
                    }`}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="flex items-center justify-center w-5 h-5">
                    {completedSteps.includes(currentStep) ?
                      <Check className="h-5 w-5 text-white" /> :
                      getStepIcon(resetSteps[currentStep].number, 5)}
                  </span>
                </motion.div>
              </div>
              <div>
                <CardTitle className={`text-xl ${
                    completedSteps.includes(currentStep)
                      ? "bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent"
                      : selectedOption === "keepFiles"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                        : "bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
                  }`}>
                  {resetSteps[currentStep].title}
                </CardTitle>
                <CardDescription className={`mt-2 text-base min-h-[48px] ${completedSteps.includes(currentStep) ? "text-green-600 dark:text-green-300" : "text-gray-600 dark:text-gray-300"}`}>
                  {resetSteps[currentStep].description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0" style={{ height: 'auto' }}>
            <div className="relative w-full overflow-hidden border-t group p-0 m-0" style={{ height: 'auto', aspectRatio: '1325/850' }}>
              <div className="w-full h-full p-0 m-0 transition-transform duration-500 group-hover:scale-105">
                {/* Display the actual image */}
                <Image
                  src={resetSteps[currentStep].imageSrc}
                  alt={resetSteps[currentStep].imageAlt}
                  width={1325}
                  height={850}
                  className="object-fill w-full h-full rounded-md shadow-sm"
                  priority
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center mt-10 w-full">
        <Button
          variant={hasMarkedAsComplete ? "default" : "outline"}
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`w-36 h-11 rounded-full shadow-sm transition-all duration-300 hover:shadow-md ${hasMarkedAsComplete ? "bg-gradient-to-r from-green-400 to-emerald-300 hover:from-green-500 hover:to-emerald-400" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Previous
        </Button>

        <div className="text-center bg-gray-100 dark:bg-gray-800/50 px-4 py-2 rounded-full shadow-inner flex items-center justify-center h-11">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 -mt-0.5">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>

        <Button
          onClick={handleNext}
          disabled={currentStep === totalSteps - 1}
          className={`w-36 h-11 rounded-full shadow-sm transition-all duration-300 hover:shadow-md ${
            hasMarkedAsComplete
              ? "bg-gradient-to-r from-green-400 to-emerald-300 hover:from-green-500 hover:to-emerald-400"
              : selectedOption === "keepFiles"
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
                : "bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500"
          }`}
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      {/* Completion message */}
      {currentStep === totalSteps - 1 && (
        <motion.div
          className="mt-10 rounded-xl shadow-lg overflow-hidden border-green-200 dark:border-green-800/50 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Header with gradient background */}
          <div className="p-6 bg-gradient-to-r from-green-400 to-emerald-300 dark:from-green-500 dark:to-emerald-400">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 flex-shrink-0">
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <CheckCircle className="size-6 text-white" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {selectedOption === "keepFiles"
                    ? "Reset Complete: Files Preserved!"
                    : "Reset Complete: Fresh Start!"
                  }
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  {selectedOption === "keepFiles"
                    ? "You've successfully completed all the steps for resetting your Windows 11 device while keeping your personal files."
                    : "You've successfully completed all the steps for completely resetting your Windows 11 device to factory settings."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="p-6 bg-gradient-to-b from-green-50 to-white dark:from-green-900/10 dark:to-gray-900/0">
            <div className="flex items-center gap-3 mb-4 text-green-700 dark:text-green-400">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-800/30">
                <Zap className="size-4" />
              </div>
              <p className="font-medium">
                {selectedOption === "keepFiles"
                  ? "Next Steps"
                  : "Next Steps"
                }
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 pl-10">
              {selectedOption === "keepFiles"
                ? "Remember to reinstall your applications and reconfigure your settings after the reset process. Your personal files are preserved, but you'll need to set up your software environment again."
                : "Your device will be like new. You'll need to set it up from scratch, including creating user accounts, installing applications, and restoring any backed-up files you wish to keep."
              }
            </p>

          <motion.div
            className="pl-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              className="rounded-full shadow-sm transition-all duration-300 hover:shadow-md bg-gradient-to-r from-green-400 to-emerald-300 hover:from-green-500 hover:to-emerald-400 text-white"
              onClick={() => {
                // Mark the current step as completed when clicked
                // Use the appropriate state setter based on the selected option
                if (selectedOption === "keepFiles") {
                  setKeepFilesCompletedSteps(prev =>
                    prev.includes(currentStep) ? prev : [...prev, currentStep]
                  );
                } else {
                  setRemoveEverythingCompletedSteps(prev =>
                    prev.includes(currentStep) ? prev : [...prev, currentStep]
                  );
                }

                // Set the flag indicating the user has clicked the button at least once for this option
                if (selectedOption === "keepFiles") {
                  setKeepFilesHasMarkedAsComplete(true);
                } else {
                  setRemoveEverythingHasMarkedAsComplete(true);
                }

                setTimeout(() => {
                  balloonsRef.current?.launchAnimation();
                }, 100);
              }}
            >
              <Check className="mr-2 h-4 w-4" />
              {completedSteps.includes(currentStep) ? "Completed!" : "Mark as Complete"}
            </Button>
            <Balloons
              ref={balloonsRef}
              type="text"
              text="🎈✨🎉"
              fontSize={120}
              color="#10b981"
            />
          </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
});
