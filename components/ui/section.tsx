import React, { ReactNode } from "react";

import { gapClasses, RESPONSIVE_BREAKPOINTS } from "@/constants/tailwind";

import { cn } from "@/lib/utils";

export interface SectionProps {
  children: ReactNode;
  id: string;
  fullWidth?: boolean;
  hero?: boolean;
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

/**
 * Builds gap-related class names for flex containers
 */
function buildGapClasses(gap: SectionProps["gap"]): string[] {
  if (!gap) return [];

  const flexClassNames: string[] = ["flex", "flex-col"];

  if (typeof gap === "number") {
    const gapClass = gapClasses[""]?.[gap];
    if (gapClass) {
      flexClassNames.push(gapClass);
    } else {
      // Fallback to direct Tailwind class if not found in generated classes
      flexClassNames.push(`gap-${gap}`);
    }
  } else {
    // Handle responsive gap with proper CSS cascade
    const responsiveGapClasses: string[] = [];

    // Iterate over responsive breakpoints to handle gap classes dynamically
    RESPONSIVE_BREAKPOINTS.forEach((breakpoint) => {
      const gapValue = gap[breakpoint];
      if (gapValue) {
        const gapClass = gapClasses[breakpoint]?.[gapValue];
        if (gapClass) {
          responsiveGapClasses.push(gapClass);
        } else {
          // Fallback to direct Tailwind class if not found in generated classes
          responsiveGapClasses.push(`${breakpoint}:gap-${gapValue}`);
        }
      }
    });

    flexClassNames.push(...responsiveGapClasses);
  }

  return flexClassNames;
}

export function Section({
  children,
  id,
  fullWidth = false,
  hero = false,
  gap,
  className,
}: SectionProps) {
  // Build base padding class
  const basePaddingClass = hero ? "py-25" : "py-12";

  // Build section content with appropriate padding
  const sectionContent = (
    <section id={id} className={cn(basePaddingClass, !gap && className)}>
      {gap ? (
        <div className={cn(...buildGapClasses(gap), className)}>{children}</div>
      ) : (
        children
      )}
    </section>
  );

  // Full-width breakout technique: negative margins to escape container constraints
  if (fullWidth) {
    return (
      <div
        className={cn(
          "relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",
          gap && className
        )}
      >
        <div className="container">{sectionContent}</div>
      </div>
    );
  }

  return sectionContent;
}

// Add displayName for reliable component identification in production
Section.displayName = "Section";
