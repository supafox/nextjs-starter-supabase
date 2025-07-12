import Link from "next/link";

import { providers } from "@/data/providers";
import * as AllIcons from "@supafox/icons";

import { buttonVariants } from "@/components/ui/button";
import { Grid, GridCell } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Copy, Header } from "@/components/ui/text";

// Type guard to safely check if an icon exists in AllIcons
function isValidIcon(iconName: string): iconName is keyof typeof AllIcons {
  return iconName in AllIcons;
}

// Helper function to safely get an icon component
function getIconComponent(
  iconName: string
): React.ComponentType<React.SVGProps<SVGSVGElement>> | null {
  if (!isValidIcon(iconName)) {
    // eslint-disable-next-line no-console
    console.warn(`Icon "${iconName}" not found in AllIcons`);
    return null;
  }

  const IconComponent = AllIcons[iconName];

  // Additional runtime check to ensure it's a valid React component
  if (
    typeof IconComponent === "function" ||
    typeof IconComponent === "object"
  ) {
    return IconComponent as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }

  // eslint-disable-next-line no-console
  console.warn(`Icon "${iconName}" is not a valid React component`);
  return null;
}

export default function Home() {
  return (
    <>
      <Section id="hero" gap={8} fullWidth hero className="bg-card">
        <Stack gap={2} className="max-w-[900px]">
          <Header
            as="h1"
            size="56"
            className="max-w-[900px] text-card-foreground"
          >
            Kickstart Your Next.js Project
          </Header>
          <Copy className="max-w-[700px] text-card-foreground">
            Everything you need to build fast, accessible web apps with Next.js.
            No setup required. Open Source. Developer Approved.
          </Copy>
        </Stack>
        <Stack gap={2} direction="row">
          <Link
            className={buttonVariants()}
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsupafox%2Fsupafox-starter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AllIcons.LogoVercel />
            Deploy now
          </Link>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </Link>
        </Stack>
      </Section>
      <Section id="built-with" gap={8}>
        <Stack gap={2}>
          <Header as="h2" size="48" className="max-w-[900px]">
            Built with the Best.
          </Header>
          <Copy className="max-w-[700px]">
            Supafox gives you the modern stack your project deserves.
            Preconfigured, performant, production-ready.
          </Copy>
        </Stack>
        <Grid columns={{ sm: 1, md: 3 }} showGuides>
          {providers.map((provider) => (
            <GridCell key={provider.name}>
              <Stack gap={4} className="items-center text-center">
                {(() => {
                  const IconComponent = getIconComponent(provider.logo);
                  return IconComponent ? (
                    <IconComponent className="size-6" />
                  ) : null;
                })()}
                <Stack>
                  <Header as="h2" size="16">
                    {provider.name}
                  </Header>

                  <Link
                    href={provider.url}
                    className="text-label-14 text-muted-foreground hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit website
                  </Link>
                </Stack>
              </Stack>
            </GridCell>
          ))}
        </Grid>
      </Section>
    </>
  );
}
