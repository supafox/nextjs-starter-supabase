import React, { ReactNode } from "react";

import {
  directionClasses,
  gapClasses,
  RESPONSIVE_BREAKPOINTS,
} from "@/constants/tailwind";

import { cn } from "@/lib/utils";

export interface StackProps {
  children: ReactNode;
  direction?:
    | "row"
    | "column"
    | {
        sm?: "row" | "column";
        md?: "row" | "column";
        lg?: "row" | "column";
        xl?: "row" | "column";
        "2xl"?: "row" | "column";
      };
  gap?:
    | number
    | {
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        "2xl"?: number;
      };
  className?: string;
}

export function Stack({
  children,
  direction = "column",
  gap,
  className,
}: StackProps) {
  // Build class names dynamically
  const classNames: string[] = ["flex"];

  // Handle direction classes
  if (typeof direction === "string") {
    const directionClass = directionClasses[""][direction];
    if (directionClass) {
      classNames.push(directionClass);
    } else {
      // Fallback to direct Tailwind class if not found in generated classes
      classNames.push(direction === "row" ? "flex-row" : "flex-col");
    }
    if (direction === "row") {
      classNames.push("items-center");
    }
  } else {
    // Handle responsive direction with proper CSS cascade
    const responsiveClasses: string[] = [];

    // Iterate over responsive breakpoints to handle direction classes dynamically
    RESPONSIVE_BREAKPOINTS.forEach((breakpoint) => {
      const directionValue = direction[breakpoint];
      if (directionValue) {
        const directionClass = directionClasses[breakpoint][directionValue];
        if (directionClass) {
          responsiveClasses.push(directionClass);
        } else {
          // Fallback to direct Tailwind class if not found in generated classes
          responsiveClasses.push(
            `${breakpoint}:${directionValue === "row" ? "flex-row" : "flex-col"}`
          );
        }
        if (directionValue === "row") {
          responsiveClasses.push(`${breakpoint}:items-center`);
        }
      }
    });

    classNames.push(...responsiveClasses);
  }

  // Handle gap classes
  if (typeof gap === "number") {
    const gapClass = gapClasses[""][gap];
    if (gapClass) {
      classNames.push(gapClass);
    } else {
      // Fallback to direct Tailwind class if not found in generated classes
      classNames.push(`gap-${gap}`);
    }
  } else if (gap) {
    // Handle responsive gap with proper CSS cascade
    const responsiveGapClasses: string[] = [];

    // Iterate over responsive breakpoints to handle gap classes dynamically
    RESPONSIVE_BREAKPOINTS.forEach((breakpoint) => {
      const gapValue = gap[breakpoint];
      if (gapValue) {
        const gapClass = gapClasses[breakpoint][gapValue];
        if (gapClass) {
          responsiveGapClasses.push(gapClass);
        } else {
          // Fallback to direct Tailwind class if not found in generated classes
          responsiveGapClasses.push(`${breakpoint}:gap-${gapValue}`);
        }
      }
    });

    classNames.push(...responsiveGapClasses);
  }

  // Add custom className
  if (className) {
    classNames.push(className);
  }

  return <div className={cn(...classNames)}>{children}</div>;
}

// Add displayName for reliable component identification in production
Stack.displayName = "Stack";
