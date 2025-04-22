import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";

interface ButtonColorfulRedProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

function ButtonColorfulRed({
    className,
    label = "Explore Components",
    ...props
}: ButtonColorfulRedProps) {
    return (
        <Button
            className={cn(
                "relative h-10 px-6 overflow-hidden rounded-full",
                "bg-red-500 dark:bg-red-500",
                "transition-all duration-200",
                "hover:bg-red-600 dark:hover:bg-red-600",
                "group",
                className
            )}
            {...props}
        >
            {/* Gradient background effect */}
            <div
                className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-r from-red-600 via-red-500 to-orange-500",
                    "opacity-40 group-hover:opacity-80",
                    "group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:via-red-500 group-hover:to-orange-500",
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

export { ButtonColorfulRed }
