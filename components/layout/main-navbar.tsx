import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/assets/icons";
import { siteConfig } from "@/data/site";
import { Cross, Menu } from "@supafox/icons";

import { ThemeToggle } from "@/components/theme-toggle";

export default function MainNavbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <div className="flex justify-between container items-center">
        <div className="flex space-x-23 h-16 items-center">
          <Link
            href="/"
            className="hover:cursor-pointer hover:text-muted-foreground"
          >
            <div className="flex space-x-1.5 items-center">
              <Icons.logo className="size-6 text-primary" />
              <span className="text-heading-20">{siteConfig.name}</span>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 text-button-14">
              {siteConfig.mainNav.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`hover:text-muted-foreground transition-colors ${
                        isActive ? "text-primary" : ""
                      }`}
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 hover:bg-muted rounded-md transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <Cross className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4">
            <ul className="space-y-2">
              {siteConfig.mainNav.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`block py-3 px-4 rounded-md transition-colors hover:text-muted-foreground ${
                        isActive ? "text-primary" : ""
                      }`}
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
