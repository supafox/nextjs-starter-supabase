import Link from "next/link";
import { notFound } from "next/navigation";

import { allLegals } from "contentlayer/generated";

import { publicUrl } from "@/lib/utils";

import { Mdx } from "@/components/mdx/components";
import { MdxHeader } from "@/components/mdx/header";

import "@/assets/styles/mdx.css";

import { Metadata, ResolvingMetadata } from "next";

import { ChevronRight } from "@supafox/icons";

import { absoluteUrl, cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getLegalFromParams(params: Awaited<Props["params"]>) {
  const slug = params?.slug?.join("/");
  const legal = allLegals.find(
    (legal) => legal.slugAsParams === slug && legal.published
  );

  if (!legal) {
    return null;
  }

  return legal;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const legal = await getLegalFromParams(resolvedParams);

  if (!legal) {
    return {};
  }

  const url = publicUrl();
  const previousImages = (await parent).openGraph?.images || [];

  const ogUrl = new URL("/api/og", url);
  ogUrl.searchParams.set("heading", legal.title);
  ogUrl.searchParams.set("type", "Legal");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: legal.title,
    description: legal.description,
    openGraph: {
      title: legal.title,
      description: legal.description,
      type: "article",
      url: absoluteUrl(legal.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: legal.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: legal.title,
      description: legal.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams(): Promise<
  Awaited<Props["params"]>[]
> {
  return allLegals
    .filter((legal) => legal.published)
    .map((legal) => ({
      slug: legal.slugAsParams.split("/"),
    }));
}

export default async function LegalPage({ params }: Props) {
  const resolvedParams = await params;
  const legal = await getLegalFromParams(resolvedParams);

  if (!legal) {
    notFound();
  }

  return (
    <main className="container mx-auto w-full min-h-screen pt-32 pb-16">
      <div>
        <MdxHeader heading={legal.title} text={legal.description} />
        <Mdx code={legal.body.code} />
        <hr className="my-4" />
        <h1 className="text-heading-24">Legal Documents</h1>
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href="/legal"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <ChevronRight height={16} className="mr-2" />
            See all legal docs
          </Link>
        </div>
      </div>
    </main>
  );
}
