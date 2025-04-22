import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Download, Settings } from "lucide-react";
import { motion } from "framer-motion";

export function AfterResetInfo() {
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
    <div className="space-y-8">
      <motion.div
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardVariants}
      >
        <Card className="transition-all duration-300 hover:shadow-lg border-blue-100 dark:border-blue-900/50">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20">
            <CardTitle className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="h-5 w-5 text-green-500" />
              </motion.div>
              <span>What to Do After Reset (If Keeping Files)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {[
                {
                  icon: <Download className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />,
                  title: "Reinstall Your Applications",
                  description: "All your applications will need to be reinstalled as they were removed during the reset process."
                },
                {
                  icon: <Settings className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />,
                  title: "Reconfigure Settings",
                  description: "While some personalization settings are preserved, you'll need to reconfigure many system settings to your preferences."
                },
                {
                  icon: <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />,
                  title: "Verify Your Files",
                  description: "Although your personal files should be preserved, it's good practice to verify that all important files are still accessible."
                }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={listItemVariants}
                  className="flex items-start gap-3"
                >
                  <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    {item.icon}
                  </motion.div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
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
        <Card className="transition-all duration-300 hover:shadow-lg border-blue-100 dark:border-blue-900/50">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20">
            <CardTitle className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="h-5 w-5 text-green-500" />
              </motion.div>
              <span>What to Do After Reset (If Removing Everything)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {[
                {
                  icon: <Settings className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />,
                  title: "Complete Initial Setup",
                  description: "Your computer will be like new, requiring you to go through the initial Windows setup process."
                },
                {
                  icon: <Download className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />,
                  title: "Install Essential Applications",
                  description: "Install your preferred web browser, antivirus, productivity tools, and other essential applications."
                },
                {
                  icon: <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />,
                  title: "Restore Your Backups",
                  description: "If you created backups before the reset, now is the time to restore your important files from those backups."
                }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={listItemVariants}
                  className="flex items-start gap-3"
                >
                  <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    {item.icon}
                  </motion.div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
