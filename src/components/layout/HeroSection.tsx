"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Monitor, ArrowRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";

// Mockup Component
const mockupVariants = cva(
  "flex relative z-10 overflow-hidden shadow-2xl border border-border/5 border-t-border/15",
  {
    variants: {
      mockupType: {
        mobile: "rounded-[48px] max-w-[350px]",
        responsive: "rounded-md",
        laptop: "rounded-md max-w-[800px]",
      },
    },
    defaultVariants: {
      mockupType: "responsive",
    },
  }
);

interface MockupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mockupVariants> {
  mockupType?: "mobile" | "responsive" | "laptop";
}

const Mockup = React.forwardRef<HTMLDivElement, MockupProps>(
  ({ className, mockupType, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(mockupVariants({ mockupType, className }))}
      {...props}
    />
  )
);
Mockup.displayName = "Mockup";

// Elegant Shape Component
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  animationsEnabled = true,
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  animationsEnabled?: boolean;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: animationsEnabled ? 1 : 0,
        y: animationsEnabled ? 0 : -150,
        rotate: animationsEnabled ? rotate : rotate - 15,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

// Glow Component
const glowVariants = cva("absolute w-full", {
  variants: {
    variant: {
      top: "top-0",
      above: "-top-[128px]",
      bottom: "bottom-0",
      below: "-bottom-[128px]",
      center: "top-[50%]",
    },
  },
  defaultVariants: {
    variant: "top",
  },
});

const Glow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof glowVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(glowVariants({ variant }), className)}
    {...props}
  >
    <div
      className={cn(
        "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--primary)/.5)_10%,_hsla(var(--primary)/0)_60%)] sm:h-[512px]",
        variant === "center" && "-translate-y-1/2"
      )}
    />
    <div
      className={cn(
        "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--primary)/.3)_10%,_hsla(var(--primary)/0)_60%)] sm:h-[256px]",
        variant === "center" && "-translate-y-1/2"
      )}
    />
  </div>
));
Glow.displayName = "Glow";

// 3D Device Component
const Device3D = ({ animationsEnabled = true }: { animationsEnabled?: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: animationsEnabled ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="relative w-full max-w-[800px] mx-auto mt-8 will-change-transform"
    >
      <Mockup
        mockupType="laptop"
        className="shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] border-primary/10 dark:border-primary/5"
      >
        <div className="relative bg-background p-2 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-8 bg-muted flex items-center px-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>
          <div className="pt-8 px-4 pb-4">
            <div className="w-full h-[400px] bg-card rounded-md p-4 overflow-hidden">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-primary" />
                  </div>
                  <div className="h-6 w-40 bg-muted rounded-md" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 bg-muted rounded-md" />
                  <div className="h-24 bg-muted rounded-md" />
                  <div className="h-24 bg-muted rounded-md" />
                </div>
                <div className="h-8 w-full bg-muted rounded-md" />
                <div className="h-32 w-full bg-muted rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </Mockup>
    </motion.div>
  );
};

// Main Hero Component
interface HeroProps {
  badge?: string;
  title: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  animationsEnabled?: boolean;
}

export function WindowsResetHero({
  badge = "Windows 11 Guide",
  title = "Reset Your Windows 11 Device With Confidence",
  description = "Follow our step-by-step guide to safely reset your Windows 11 device while preserving your important files and settings.",
  primaryCta = {
    text: "Start Guide",
    href: "#guide-start",
  },
  secondaryCta,
  animationsEnabled = true,
}: HeroProps) {
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.15,
        ease: "easeOut"
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          animationsEnabled={animationsEnabled}
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          animationsEnabled={animationsEnabled}
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          animationsEnabled={animationsEnabled}
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          animationsEnabled={animationsEnabled}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center min-h-[500px] flex flex-col items-center justify-center">
          <motion.div
            custom={0}
            variants={fadeInVariants}
            initial="hidden"
            animate={animationsEnabled ? "visible" : "hidden"}
            className="mb-8 md:mb-12 will-change-transform"
          >
            <h1 className="text-sm text-gray-600 dark:text-gray-400 group font-medium mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/20 via-gray-400/20 to-transparent dark:from-zinc-300/5 dark:via-gray-400/5 border-[2px] border-black/5 dark:border-white/5 rounded-3xl w-fit">
              {badge}
              <ArrowRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
            </h1>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeInVariants}
            initial="hidden"
            animate={animationsEnabled ? "visible" : "hidden"}
            className="will-change-transform"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
              {title.includes("Windows 11") ? (
                <>
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                    {title.split("Windows 11")[0]}
                  </span>
                  <span className="bg-clip-text text-transparent animate-gradient-text bg-[length:200%_auto] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500">
                    Windows 11 Device
                  </span>
                </>
              ) : (
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                  {title}
                </span>
              )}
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeInVariants}
            initial="hidden"
            animate={animationsEnabled ? "visible" : "hidden"}
            className="will-change-transform"
          >
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
              {description}
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeInVariants}
            initial="hidden"
            animate={animationsEnabled ? "visible" : "hidden"}
            className="flex flex-wrap justify-center will-change-transform"
          >
            <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4FC3F7_0%,#03A9F4_50%,#4FC3F7_100%)]" />
              <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950 text-xs font-medium backdrop-blur-3xl">
                <button
                  onClick={() => document.getElementById('reset-options')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-blue-300/20 via-cyan-400/30 to-transparent dark:from-blue-300/5 dark:via-cyan-400/20 text-gray-900 dark:text-white border-input border-[1px] hover:bg-gradient-to-tr hover:from-blue-300/30 hover:via-cyan-400/40 hover:to-transparent dark:hover:from-blue-300/10 dark:hover:via-cyan-400/30 transition-all sm:w-auto py-4 px-10"
                >
                  {primaryCta.text}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </span>
          </motion.div>

          <Device3D animationsEnabled={animationsEnabled} />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <Glow
          variant="center"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 pointer-events-none" />
    </div>
  );
}
