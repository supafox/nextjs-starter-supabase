export interface Provider {
  name: string;
  logo: string;
  url: string;
}

export const providers: Provider[] = [
  {
    name: "Supafox",
    logo: "LogoSupafox",
    url: "https://supafox.dev",
  },
  {
    name: "Next.js",
    logo: "LogoNext",
    url: "https://nextjs.org",
  },
  {
    name: "Tailwind CSS",
    logo: "LogoTailwindcss",
    url: "https://tailwindcss.com",
  },
];
