import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FaqItem = ({ question, answer, isOpen, onToggle, index }: FaqItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "border rounded-lg overflow-hidden mb-4",
        isOpen
          ? "border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/10"
          : "border-slate-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-800"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between font-medium focus:outline-none focus:ring-0 rounded-lg transition-all duration-200"
      >
        <span className="flex items-center">
          {isOpen ? (
            <HelpCircle className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
          ) : (
            <HelpCircle className="h-5 w-5 text-slate-400 dark:text-slate-500 mr-3 flex-shrink-0" />
          )}
          <span className={isOpen ? "text-primary-700 dark:text-primary-300" : ""}>{question}</span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "h-5 w-5 flex items-center justify-center rounded-full",
            isOpen
              ? "bg-primary-100 dark:bg-primary-900/30 text-primary-500"
              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 pt-0 text-slate-600 dark:text-slate-300">
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-1">
                {answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Will I lose my personal files during a Windows 11 reset?",
      answer: "It depends on which reset option you choose. If you select 'Keep my files,' Windows will preserve your personal files while removing apps and settings. If you choose 'Remove everything,' all your personal files, apps, and settings will be deleted. In either case, we strongly recommend backing up important files before proceeding with a reset."
    },
    {
      question: "How long does the Windows 11 reset process take?",
      answer: "The reset process typically takes between 30 minutes to 2 hours, depending on your computer's specifications, the reset option you choose, and whether you select cloud download or local reinstall. Older computers or those with many files may take longer. Make sure your device is plugged in throughout the process to avoid interruptions."
    },
    {
      question: "Will I need to reinstall my applications after a reset?",
      answer: "Yes, regardless of which reset option you choose, you'll need to reinstall all your applications after the reset is complete. Windows Store apps can be reinstalled from the Microsoft Store, while other programs will need to be reinstalled from their original installation files or downloaded again."
    },
    {
      question: "Can I cancel a Windows 11 reset once it's started?",
      answer: "Once the actual reset process begins (after the preparation phase), it's not recommended to interrupt it as this could leave your system in an unstable state. However, during the initial preparation phase before your computer restarts for the first time, you can usually cancel the process by clicking the cancel button if available."
    },
    {
      question: "Will resetting Windows 11 remove viruses and malware?",
      answer: "A full reset that removes everything will typically remove most viruses and malware since it reinstalls Windows from scratch. However, some sophisticated malware that infects the boot sector or firmware might survive. If you're resetting specifically to remove malware, choose the 'Remove everything' option with the 'Clean data' setting for the most thorough cleaning."
    }
  ];

  return (
    <div id="faq" className="py-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            id="common-questions"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-4"
          >
            <div className="h-2 w-2 rounded-full bg-primary-500" />
            <span className="text-sm text-primary-700 dark:text-primary-300 font-medium">Common Questions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Get answers to the most common questions about resetting Windows 11.
            If you don't see your question here, feel free to contact our support team.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFaq(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
