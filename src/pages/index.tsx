"use client";

import { useState, useEffect, lazy, Suspense, memo, useRef } from 'react';
import { isMobile } from '@/lib/isMobile';
import { Meta } from '@/components/layout/Meta';
import { Section } from '@/components/layout/Section';
import { AppConfig } from '@/utils/AppConfig';
import { Button } from '@/components/ui/button';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Logo } from '@/components/layout/Logo';
import { WindowsResetHero } from '@/components/layout/HeroSection';
import { TestimonialSection } from '@/components/layout/TestimonialSection';
import { FaqSection } from '@/components/layout/FaqSection';
import { EnhancedResetOptions, ResetOptionType } from '@/components/reset-guide/EnhancedResetOptions';
import { InteractiveResetGuide } from '@/components/reset-guide/InteractiveResetGuide';
import { EnhancedAfterResetInfo } from '@/components/reset-guide/EnhancedAfterResetInfo';
import { AlertTriangle, ArrowDown, ChevronDown, ExternalLink, HelpCircle, Laptop, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { LoadingScreen } from '@/components/layout/LoadingScreen';

const Index = memo(() => {
  // Create refs for sections that need optimization
  const resetOptionsRef = useRef(null);
  const resetOptionsInView = useInView(resetOptionsRef, { once: true, amount: 0.1 });

  const resetStepsRef = useRef(null);
  const resetStepsInView = useInView(resetStepsRef, { once: true, amount: 0.1 });

  const afterResetRef = useRef(null);
  const afterResetInView = useInView(afterResetRef, { once: true, amount: 0.1 });

  const helpSectionRef = useRef(null);
  const helpSectionInView = useInView(helpSectionRef, { once: true, amount: 0.1 });
  // State to track the selected reset option
  const [selectedOption, setSelectedOption] = useState<ResetOptionType>(null);

  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Check if user is on a mobile device
  useEffect(() => {
    // Check if the user is on a mobile device
    setIsMobileDevice(isMobile());
  }, []);

  // Handle loading complete
  const handleLoadingComplete = () => {
    // Only complete loading if not on a mobile device
    if (!isMobileDevice) {
      setIsLoading(false);
      // Enable animations after a short delay
      setTimeout(() => setAnimationsEnabled(true), 100);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />

      {/* Loading Screen */}
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />

      {/* Main Content - Only shown after loading is complete */}
      {!isLoading && (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-between w-full">
        <Logo />
        <Header />

        <main className="flex-grow flex flex-col">
          {/* Modern Hero Section */}
          <WindowsResetHero
            badge="Welcome to Our Guide"
            title="Factory Reset Your Windows 11"
            description="Follow our step-by-step guide to safely reset your Windows 11 device and get it running smoothly again."
            primaryCta={{
              text: "View Reset Options",
              href: "#guide-start"
            }}
            animationsEnabled={animationsEnabled}
          />

          {/* Reset Options Section */}
          <Section id="guide-start">
            <motion.div
              className="max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >

              <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950/30">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="md:col-span-3 p-8">
                      <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div>
                          <h3 className="text-2xl font-semibold mb-3 flex items-center">
                            <motion.div
                              className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mr-3"
                              whileHover={{ rotate: 10 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </motion.div>
                            Why Reset Your Windows 11 Device?
                          </h3>
                          <p className="text-muted-foreground">
                            Factory resetting your Windows 11 device can resolve persistent issues like slow performance,
                            software conflicts, or malware infections that regular troubleshooting can't fix.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-2xl font-semibold mb-3 flex items-center">
                            <motion.div
                              className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mr-3"
                              whileHover={{ rotate: 10 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <Laptop className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </motion.div>
                            When Should You Reset?
                          </h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <motion.li
                              className="flex items-center"
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                              When preparing to sell your computer
                            </motion.li>
                            <motion.li
                              className="flex items-center"
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                              When experiencing serious technical issues
                            </motion.li>
                            <motion.li
                              className="flex items-center"
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                              When you want a fresh start with your device
                            </motion.li>
                          </ul>
                        </div>
                      </motion.div>

                      <motion.div
                        className="mt-8 flex items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <ArrowDown className="h-5 w-5 text-primary mr-2 animate-bounce" />
                        <p className="font-medium text-primary">Windows 11 offers two main reset options, which we'll cover in detail below</p>
                      </motion.div>
                    </div>

                    <div className="md:col-span-2 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center p-8 text-white">
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className="mb-6 inline-block p-4 bg-white/10 rounded-full backdrop-blur-sm">
                          <motion.div
                            animate={{
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          >
                            <RefreshCw className="h-16 w-16" />
                          </motion.div>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Step-by-Step Guide</h3>
                        <p className="text-white/80 mb-6">Follow our detailed instructions to safely reset your Windows 11 device with confidence.</p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <ButtonColorful
                            label="Explore Reset Options"
                            onClick={() => document.getElementById('reset-options')?.scrollIntoView({ behavior: 'smooth' })}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Section>

          {/* Reset Options */}
          <Section id="reset-options" className="pt-20" ref={resetOptionsRef}>
            <motion.div
              className="max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <EnhancedResetOptions
                selectedOption={selectedOption}
                onOptionSelect={setSelectedOption}
              />
            </motion.div>
          </Section>

          {/* Important Disclaimer */}
          <Section>
            <motion.div
              className="max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <Card className="border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/50 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-amber-800 dark:text-amber-300">
                    <motion.div
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 3 }}
                    >
                      <AlertTriangle className="mr-2 h-5 w-5" />
                    </motion.div>
                    Important: Back Up Your Data First
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-800 dark:text-amber-300">
                    <strong>Even if you choose "Keep my files"</strong>, we strongly recommend backing up all important
                    files before proceeding. While the reset process attempts to preserve personal files, there's always
                    a small risk of data loss during any major system change.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </Section>

          {/* Interactive Reset Guide */}
          <AnimatePresence>
            {selectedOption && (
              <Section id="reset-steps" className="w-full" ref={resetStepsRef}>
                <motion.div
                  className="w-full max-w-4xl mx-auto"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-2">Resetting Windows 11</h2>
                  <p className="text-muted-foreground mb-8">Follow these steps carefully to reset your Windows 11 device</p>

                  <InteractiveResetGuide selectedOption={selectedOption} />
                </motion.div>
              </Section>
            )}
          </AnimatePresence>

          {/* After Reset */}
          <AnimatePresence>
            {selectedOption && (
              <Section id="after-reset" ref={afterResetRef}>
                <motion.div
                  className="max-w-5xl mx-auto"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold mb-2">After Completing the Reset</h2>
                  <p className="text-muted-foreground mb-8 max-w-2xl">Once your Windows 11 reset is complete, follow these steps to get your system back up and running.</p>
                  <EnhancedAfterResetInfo selectedOption={selectedOption} />
                </motion.div>
              </Section>
            )}
          </AnimatePresence>

          {/* Testimonials */}
          <TestimonialSection />

          {/* FAQ Section */}
          <FaqSection />

          {/* Help & Support */}
          <Section className="py-16" ref={helpSectionRef}>
            <motion.div
              className="max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-blue-100/30 dark:bg-blue-700/5 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 rounded-full bg-purple-100/30 dark:bg-purple-700/5 blur-3xl"></div>

                <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  {/* Left content */}
                  <div className="flex-1 text-center md:text-left">
                    <motion.div
                      variants={fadeIn}
                      className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100/70 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-sm font-medium"
                    >
                      24/7 Support Available
                    </motion.div>

                    <motion.h2
                      className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
                      variants={fadeIn}
                    >
                      Need Additional Help?
                    </motion.h2>

                    <motion.p
                      className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl"
                      variants={fadeIn}
                    >
                      If you encountered any issues during the reset process or need further assistance,
                      our expert support team is available to help you resolve any problems quickly and efficiently.
                    </motion.p>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center"
                      variants={fadeIn}
                    >
                      <Button
                        variant="outline"
                        className="group rounded-full border-blue-100 dark:border-blue-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6"
                        onClick={() => document.getElementById('common-questions')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                      >
                        <HelpCircle className="mr-2 h-4 w-4 text-blue-500 group-hover:animate-pulse" />
                        Browse FAQ
                      </Button>
                      <Button
                        className="group rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all px-6"
                      >
                        <span>Contact Support</span>
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Right illustration */}
                  <motion.div
                    className="flex-shrink-0 w-48 h-48 md:w-72 md:h-72"
                    variants={fadeIn}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="w-full h-full relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-300/30 to-purple-300/30 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-xl"></div>
                      <div className="absolute inset-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
                        <img src="/images/chat-icon.svg" alt="Support" className="w-1/2 h-1/2" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Section>
        </main>

        <Footer />
      </div>
      )}
    </>
  );
});

export default Index;
