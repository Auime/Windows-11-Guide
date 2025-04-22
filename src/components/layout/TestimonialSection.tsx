import React, { memo } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  rating?: number;
  imageSrc?: string;
}

const Testimonial = memo(({ quote, author, role, rating = 5, imageSrc }: TestimonialProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 h-full flex flex-col"
    >
      <div className="mb-4 flex-shrink-0">
        <Quote className="h-8 w-8 text-primary-500 opacity-50" />
      </div>

      <p className="text-slate-700 dark:text-slate-300 mb-6 flex-grow italic">"{quote}"</p>

      <div className="flex items-center mt-auto">
        {imageSrc ? (
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary-100 dark:border-primary-900">
            <img src={imageSrc} alt={author} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4 text-primary-700 dark:text-primary-300 font-bold text-lg">
            {author.charAt(0)}
          </div>
        )}

        <div>
          <div className="font-medium text-slate-900 dark:text-white">{author}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400">{role}</div>
        </div>

        <div className="ml-auto flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < rating ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"
              )}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
});

export const TestimonialSection = memo(function TestimonialSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const testimonials = [
    {
      quote: "This guide saved me hours of frustration. The step-by-step instructions were clear and easy to follow, even for someone not very tech-savvy like me.",
      author: "Sarah Johnson",
      role: "Small Business Owner",
      rating: 5
    },
    {
      quote: "My laptop was running incredibly slow until I followed this reset guide. Now it's like I have a brand new computer! The process was much simpler than I expected.",
      author: "Michael Chen",
      role: "Graphic Designer",
      rating: 5
    },
    {
      quote: "I was worried about losing my files during the reset, but the guide clearly explained how to keep my important data. Everything went smoothly and my PC is running great now.",
      author: "Emma Rodriguez",
      role: "College Student",
      rating: 4
    }
  ];

  return (
    <div ref={sectionRef} className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-4"
          >
            <div className="h-2 w-2 rounded-full bg-primary-500" />
            <span className="text-sm text-primary-700 dark:text-primary-300 font-medium">User Experiences</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What Our Users Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Thousands of users have successfully reset their Windows 11 devices using our guide.
            Here's what some of them have to say about their experience.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
});
