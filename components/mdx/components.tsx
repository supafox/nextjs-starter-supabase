import * as React from "react";
import Image from "next/image";

import { useMDXComponent } from "next-contentlayer2/hooks";

import { cn } from "@/lib/utils";

type ComponentProps = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

const components = {
  h1: ({ className, ...props }: ComponentProps) => (
    <h1 className={cn("text-heading-48", className)} {...props} />
  ),
  h2: ({ className, ...props }: ComponentProps) => (
    <h2
      className={cn("text-heading-32 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentProps) => (
    <h3
      className={cn("text-heading-24 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: ComponentProps) => (
    <h4
      className={cn("text-heading-20 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  h5: ({ className, ...props }: ComponentProps) => (
    <h5
      className={cn("text-heading-18 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  h6: ({ className, ...props }: ComponentProps) => (
    <h6
      className={cn("text-heading-16 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  a: ({ className, ...props }: ComponentProps) => (
    <a
      className={cn("text-copy-16 underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentProps) => (
    <p
      className={cn("text-copy-16 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentProps) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentProps) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentProps) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentProps) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    src,
    width,
    height,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      className={cn("rounded-md border", className)}
      alt={alt || ""}
      src={typeof src === "string" ? src : ""}
      width={width ? parseInt(width.toString()) : 800}
      height={height ? parseInt(height.toString()) : 600}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("border-t even:bg-muted", className)} {...props} />
  ),
  th: ({ className, ...props }: ComponentProps) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentProps) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentProps) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentProps) => (
    <code
      className={cn(
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  Image,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
