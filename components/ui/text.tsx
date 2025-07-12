import React from "react";

import { copySizeClasses, headerSizeClasses } from "@/constants/tailwind";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";

// Utility type for responsive props
type ResponsiveSize<T extends string> =
  | T
  | {
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      "2xl"?: T;
    };

// Utility function to handle responsive size props
function getResponsiveSizeValues<T extends string>(
  size: ResponsiveSize<T> | undefined
) {
  if (typeof size === "string") {
    return {
      defaultSize: size,
      smSize: undefined,
      mdSize: undefined,
      lgSize: undefined,
      xlSize: undefined,
      "2xlSize": undefined,
    };
  }

  return {
    defaultSize: undefined,
    smSize: size?.sm,
    mdSize: size?.md,
    lgSize: size?.lg,
    xlSize: size?.xl,
    "2xlSize": size?.["2xl"],
  };
}

// Utility function to build responsive class names
function buildResponsiveClassNames<T extends string>(
  sizes: {
    defaultSize?: T;
    smSize?: T;
    mdSize?: T;
    lgSize?: T;
    xlSize?: T;
    "2xlSize"?: T;
  },
  classMap: Record<string, Record<string, string>>,
  classPrefix: string
): string[] {
  const classNames: string[] = [];

  // Handle default size
  if (sizes.defaultSize) {
    const sizeClass = classMap[""]?.[sizes.defaultSize];
    if (sizeClass) {
      classNames.push(sizeClass);
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        `Size class not found for ${classPrefix}-${sizes.defaultSize}`
      );
      classNames.push(`${classPrefix}-${sizes.defaultSize}`);
    }
  }

  // Handle responsive sizes
  const responsiveSizes = [
    { key: "sm" as const, size: sizes.smSize },
    { key: "md" as const, size: sizes.mdSize },
    { key: "lg" as const, size: sizes.lgSize },
    { key: "xl" as const, size: sizes.xlSize },
    { key: "2xl" as const, size: sizes["2xlSize"] },
  ];

  for (const { key, size } of responsiveSizes) {
    if (size) {
      const sizeClass = classMap[key]?.[size];
      if (sizeClass) {
        classNames.push(sizeClass);
      } else {
        classNames.push(`${key}:${classPrefix}-${size}`);
      }
    }
  }

  return classNames;
}

function Copy({
  className,
  size,
  asChild = false,
  children,
  ...props
}: {
  size?: ResponsiveSize<"24" | "20" | "18" | "16" | "14" | "13">;
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
} & React.ComponentPropsWithoutRef<"p">) {
  const Comp = asChild ? Slot : "p";

  const {
    defaultSize,
    smSize,
    mdSize,
    lgSize,
    xlSize,
    "2xlSize": twoXlSize,
  } = getResponsiveSizeValues(size);

  // Build class names using utility function
  const responsiveClasses = buildResponsiveClassNames(
    { defaultSize, smSize, mdSize, lgSize, xlSize, "2xlSize": twoXlSize },
    copySizeClasses,
    "text-copy"
  );

  // Only use responsive and custom classes
  const finalClassName = clsx(
    responsiveClasses,
    className || "text-foreground"
  );

  return (
    <Comp className={finalClassName} {...props}>
      {children}
    </Comp>
  );
}

function Header({
  className,
  size,
  asChild = false,
  as = "h1",
  children,
  ...props
}: {
  size?: ResponsiveSize<
    "72" | "64" | "56" | "48" | "40" | "32" | "24" | "20" | "16" | "14"
  >;
  children: React.ReactNode;
  asChild?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
} & React.ComponentPropsWithoutRef<"h1">) {
  const Comp = asChild ? Slot : as;

  const {
    defaultSize,
    smSize,
    mdSize,
    lgSize,
    xlSize,
    "2xlSize": twoXlSize,
  } = getResponsiveSizeValues(size);

  // Build class names using utility function
  const responsiveClasses = buildResponsiveClassNames(
    { defaultSize, smSize, mdSize, lgSize, xlSize, "2xlSize": twoXlSize },
    headerSizeClasses,
    "text-heading"
  );

  // Only use responsive and custom classes
  const finalClassName = clsx(
    responsiveClasses,
    className || "text-foreground"
  );

  return (
    <Comp className={finalClassName} {...props}>
      {children}
    </Comp>
  );
}

export { Copy, Header };

// Add displayName for reliable component identification in production
Copy.displayName = "Copy";
Header.displayName = "Header";
