import React, { ReactNode } from "react";

import {
  colSpanClasses,
  gapClasses,
  gridColsClasses,
  gridRowsClasses,
  RESPONSIVE_BREAKPOINTS,
  rowSpanClasses,
} from "@/constants/tailwind";

import { buildResponsiveGridClasses, cn } from "@/lib/utils";

/**
 * Valid gap values that are guaranteed to exist in Tailwind CSS.
 * These values correspond to the spacing scale: 1=0.25rem, 2=0.5rem, etc.
 * Only these values should be used to prevent class purging in production builds.
 */
const VALID_GAP_VALUES: readonly number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20, 24, 28, 32, 36, 40,
  44, 48, 52, 56, 60, 64, 72, 80, 96,
] as const;

// Validation function to check if a gap value is valid
function isValidGapValue(
  value: number
): value is (typeof VALID_GAP_VALUES)[number] {
  return VALID_GAP_VALUES.includes(value as (typeof VALID_GAP_VALUES)[number]);
}

export interface GridProps {
  children: ReactNode;
  columns?:
    | number
    | {
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        "2xl"?: number;
      };
  rows?:
    | number
    | {
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        "2xl"?: number;
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
  showGuides?: boolean;
  className?: string;
}

/**
 * Grid component for creating responsive grid layouts.
 *
 * @param children - Grid content
 * @param columns - Number of columns or responsive object (e.g., { sm: 1, md: 2, lg: 3 })
 * @param rows - Number of rows or responsive object
 * @param gap - Gap between grid items. Valid values: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
 * @param showGuides - Show grid guide borders for debugging
 * @param className - Additional CSS classes
 */
export function Grid({
  children,
  columns = 1,
  rows,
  gap,
  showGuides,
  className,
}: GridProps) {
  // Build class names dynamically
  const classNames: string[] = ["grid"];

  // Handle columns classes using utility function
  const columnClasses = buildResponsiveGridClasses(columns, gridColsClasses);
  classNames.push(...columnClasses);

  // Handle rows classes using utility function
  const rowClasses = buildResponsiveGridClasses(rows, gridRowsClasses);
  classNames.push(...rowClasses);

  // Handle gap classes with validation
  if (typeof gap === "number") {
    if (isValidGapValue(gap)) {
      const gapClass = gapClasses[""][gap];
      if (gapClass) {
        classNames.push(gapClass);
      }
    }
    // Silently ignore invalid gap values in production
  } else if (gap) {
    // Handle responsive gap with proper validation
    RESPONSIVE_BREAKPOINTS.forEach((breakpoint) => {
      const gapValue = gap[breakpoint];
      if (gapValue && isValidGapValue(gapValue)) {
        const gapClass = gapClasses[breakpoint][gapValue];
        if (gapClass) {
          classNames.push(gapClass);
        }
      }
      // Silently ignore invalid gap values in production
    });
  }

  // Add guide borders if showGuides is enabled
  if (showGuides) {
    classNames.push("border-border border-t border-l");
  }

  // Add custom className
  if (className) {
    classNames.push(className);
  }

  // Clone children and pass showGuides prop to GridCell components
  const childrenWithGuides = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === GridCell) {
      return React.cloneElement(child as React.ReactElement<GridCellProps>, {
        showGuides,
      });
    }
    return child;
  });

  return <div className={cn(...classNames)}>{childrenWithGuides}</div>;
}

// Add displayName for reliable component identification in production
Grid.displayName = "Grid";

export interface GridCellProps {
  children?: ReactNode;
  column?:
    | number
    | {
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        "2xl"?: number;
      };
  rows?:
    | number
    | {
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        "2xl"?: number;
      };
  showGuides?: boolean;
  className?: string;
}

/**
 * GridCell component for individual grid items.
 *
 * @param children - Cell content
 * @param column - Column span or responsive object
 * @param rows - Row span or responsive object
 * @param showGuides - Show cell guide borders for debugging
 * @param className - Additional CSS classes
 */
export function GridCell({
  children,
  column,
  rows,
  showGuides,
  className,
}: GridCellProps) {
  // Build class names dynamically
  const classNames: string[] = [];

  // Handle column classes using utility function
  const columnClasses = buildResponsiveGridClasses(column, colSpanClasses);
  classNames.push(...columnClasses);

  // Handle rows classes using utility function
  const rowClasses = buildResponsiveGridClasses(rows, rowSpanClasses);
  classNames.push(...rowClasses);

  // Add guide borders and padding if showGuides is enabled
  if (showGuides) {
    classNames.push("border-border border-b border-r p-16");
  }

  // Add custom className
  if (className) {
    classNames.push(className);
  }

  return <div className={cn(...classNames)}>{children}</div>;
}

// Add displayName for reliable component identification in production
GridCell.displayName = "GridCell";
