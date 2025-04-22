import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

function ButtonColorful({
    className,
    label = "Explore Components",
    ...props
}: ButtonColorfulProps) {
    return (
        <Button
            className={cn(
                "relative h-10 px-6 overflow-hidden rounded-full",
                "bg-blue-500 dark:bg-blue-500",
                "transition-all duration-200",
                "group",
                className
            )}
            {...props}
        >
            {/* Gradient background effect */}
            <div
                className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300",
                    "opacity-40 group-hover:opacity-80",
                    "blur transition-opacity duration-500"
                )}
            />

            {/* Content */}
            <div className="relative flex items-center justify-center gap-2">
                {label === "Selected" && <Check className="h-4 w-4 text-white/90 dark:text-white/90 mr-1" />}
                <span className="text-white dark:text-white">{label}</span>
                {label !== "Selected" && <ArrowRight className="w-4 h-4 text-white/90 dark:text-white/90 transition-transform group-hover:translate-x-1" />}
            </div>
        </Button>
    );
}

export { ButtonColorful }
