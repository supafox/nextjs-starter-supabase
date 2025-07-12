import { cn } from "@/lib/utils";

interface MdxHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  text?: string;
}

export function MdxHeader({
  heading,
  text,
  className,
  ...props
}: MdxHeaderProps) {
  return (
    <>
      <div className={cn("space-y-4", className)} {...props}>
        <h1 className="text-heading-48">{heading}</h1>
        {text && <p className="text-copy-16">{text}</p>}
      </div>
      <hr className="my-4" />
    </>
  );
}
