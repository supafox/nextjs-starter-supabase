import Link from "next/link";

import { allLegals } from "contentlayer/generated";
import { compareDesc } from "date-fns";

import { formatDate } from "@/lib/utils";

import { MdxHeader } from "@/components/mdx/header";

export const metadata = {
  title: "Legal",
  description: "This section includes legal documents for the app.",
};

export default function LegalsPage() {
  const legals = allLegals
    .filter((legal) => legal.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <div className="container mx-auto w-full min-h-screen pt-32 pb-16">
      <MdxHeader
        heading="Legal"
        text="This section includes legal documents for the app."
      />
      {legals?.length ? (
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {legals.map((legal) => (
            <article
              key={legal._id}
              className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-medium tracking-tight">
                    {legal.title}
                  </h2>
                  {legal.description && (
                    <p className="text-muted-foreground">{legal.description}</p>
                  )}
                </div>
                {legal.date && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(legal.date)}
                  </p>
                )}
              </div>
              <Link href={legal.slug} className="absolute inset-0">
                <span className="sr-only">View</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No legal documents published.</p>
      )}
    </div>
  );
}
