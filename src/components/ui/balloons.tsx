"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { balloons, textBalloons } from "balloons-js"

export interface BalloonsProps {
  type?: "default" | "text"
  text?: string
  fontSize?: number
  color?: string
  className?: string
  onLaunch?: () => void
}

// Define a custom type that includes our custom methods and HTMLDivElement properties
type BalloonsRef = HTMLDivElement & {
  launchAnimation: () => void
}

const Balloons = React.forwardRef<BalloonsRef, BalloonsProps>(
  ({ type = "default", text, fontSize = 120, color = "#000000", className, onLaunch }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null)

    const launchAnimation = React.useCallback(() => {
      if (type === "default") {
        balloons()
      } else if (type === "text" && text) {
        textBalloons([
          {
            text,
            fontSize,
            color,
          },
        ])
      }

      if (onLaunch) {
        onLaunch()
      }
    }, [type, text, fontSize, color, onLaunch])

    // Export the animation launch method
    React.useImperativeHandle(ref, () => {
      // Create a ref object that combines our custom method with the div element
      return Object.assign(
        containerRef.current || document.createElement('div'),
        { launchAnimation }
      ) as BalloonsRef
    }, [launchAnimation])

    return <div ref={containerRef} className={cn("balloons-container fixed inset-0 pointer-events-none z-50", className)} />
  }
)
Balloons.displayName = "Balloons"

export { Balloons }
