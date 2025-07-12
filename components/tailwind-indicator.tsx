export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  const breakpoints = [
    { label: "xs", className: "block sm:hidden" },
    { label: "sm", className: "hidden sm:block md:hidden" },
    { label: "md", className: "hidden md:block lg:hidden" },
    { label: "lg", className: "hidden lg:block xl:hidden" },
    { label: "xl", className: "hidden xl:block 2xl:hidden" },
    { label: "2xl", className: "hidden 2xl:block" },
  ];

  return (
    <div
      className="fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white"
      aria-label="Current screen size indicator for responsive design debugging"
    >
      {breakpoints.map(({ label, className }) => (
        <div key={label} className={className}>
          {label}
        </div>
      ))}
    </div>
  );
}
