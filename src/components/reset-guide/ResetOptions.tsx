import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

export function ResetOptions() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
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

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.div
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardVariants}
      >
        <Card className="border-blue-200 dark:border-blue-900 h-full transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
          <CardHeader className="bg-blue-50 dark:bg-blue-950/50">
            <CardTitle className="text-blue-700 dark:text-blue-300 flex items-center">
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05 }}
              >
                Keep My Files
              </motion.span>
            </CardTitle>
            <CardDescription>Reinstall Windows while preserving your personal data</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {[
                "Keeps all personal files (documents, photos, music)",
                "Preserves some personalization settings",
                "Removes all installed applications",
                "Removes system customizations and settings"
              ].map((text, index) => (
                <motion.li 
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={listItemVariants}
                  className="flex items-start gap-2"
                >
                  {index < 2 ? (
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardVariants}
      >
        <Card className="border-red-200 dark:border-red-900 h-full transition-all duration-300 hover:shadow-lg hover:border-red-300 dark:hover:border-red-700">
          <CardHeader className="bg-red-50 dark:bg-red-950/50">
            <CardTitle className="text-red-700 dark:text-red-300 flex items-center">
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05 }}
              >
                Remove Everything
              </motion.span>
            </CardTitle>
            <CardDescription>Complete reset to factory defaults</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {[
                "Completely fresh Windows installation",
                "Removes all potential system issues",
                "Deletes ALL personal files and data",
                "Removes all applications and user accounts"
              ].map((text, index) => (
                <motion.li 
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={listItemVariants}
                  className="flex items-start gap-2"
                >
                  {index < 2 ? (
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
