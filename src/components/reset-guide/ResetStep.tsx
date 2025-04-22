import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

interface ResetStepProps {
  number: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function ResetStep({ number, title, description, imageSrc, imageAlt }: ResetStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader className="bg-muted/50 pb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium text-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {number}
            </motion.div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          <CardDescription className="mt-2 text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-72 w-full overflow-hidden border-t group">
            <div className="absolute inset-0 flex items-center justify-center bg-muted/20 text-muted-foreground transition-transform duration-500 group-hover:scale-105">
              {/* In a real implementation, replace with actual images */}
              <motion.div 
                className="bg-black/50 backdrop-blur-sm p-6 rounded-lg text-white"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                <p className="text-center font-medium">{imageAlt}</p>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
