"use client";
import React from "react";
import { LogoLarge } from "./brand";
import { Button } from "./ui/button";
import Link from "next/link";
import { links } from "@/data";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MenuIcon, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Container from "@/components/container";

const NavBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [isAnnouncementBannerVisible, setIsAnnouncementBannerVisible] = React.useState(true);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prefetch the most common routes
  React.useEffect(() => {
    const prefetchLinks = async () => {
      const linksToPreload = ['/blog', '/gallery', '/events'];
      linksToPreload.forEach(async (href) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
      });
    };
    prefetchLinks();
  }, []);

  // Sync mobile browser theme color with the announcement banner visibility on home
  React.useEffect(() => {
    const defaultThemeColor = "#6d6cd6";
    const bannerThemeColor = "#6d6cd6";
    const setThemeColor = (color: string) => {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", color);
      // iOS Safari uses the apple-mobile-web-app-status-bar-style in standalone mode
      const appleMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      if (appleMeta) appleMeta.setAttribute("content", color);
    };

    const shouldUseBannerColor = pathname === "/" && isAnnouncementBannerVisible;
    setThemeColor(shouldUseBannerColor ? bannerThemeColor : defaultThemeColor);
  }, [pathname, isAnnouncementBannerVisible]);

  return (
    <>
      {/* Hackfest 2024 Banner */}

      {isAnnouncementBannerVisible && pathname === "/" && (
        <>
          <div
            aria-hidden
            className="fixed inset-x-0 top-0 z-50 pointer-events-none bg-white sm:bg-[#6d6cd6]"
            style={{ height: "env(safe-area-inset-top)" }}
          />
          <div className="w-full bg-white sm:bg-[#6d6cd6] text-base">
            <Container className="relative">
              <Link
                href="https://www.codespaces.org/donate"
                className="w-full py-3.5 text-black sm:text-white block hover:opacity-90 transition-opacity text-left sm:text-center pr-8"
                style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}
              >
                Celebrating 5 Years of Impact: Help Us Reach Our Goal!
              </Link>
              <button
                type="button"
                aria-label="Close banner"
                onClick={() => setIsAnnouncementBannerVisible(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 hover:text-black sm:text-white/90 sm:hover:text-white"
              >
                <X size={16} />
              </button>
            </Container>
          </div>
        </>
      )}

      {/* NavBar */}
      <Container className="container flex items-center justify-between py-8 md:pb-8 md:pt-4">
        <Link href={"/"}>
          <LogoLarge />
        </Link>

        <ul className="lg:flex flex-row items-center gap-x-5 hidden font-duplicateSans">
          {links.map((link) => (
            <li
              key={link.name}
              className={cn({
                "text-primary": pathname.startsWith(link.href),
              })}
            >
              <Link className="hover:text-primary" href={link.href}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <Button size={"sm"} className="hidden lg:block">
          <a href="https://forms.gle/hhuLVupnm2F1AGa96" target="_blank" rel="noopener noreferrer">
            Join the Community
          </a>
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <VisuallyHidden.Root>
            <SheetTitle>Menu</SheetTitle>
          </VisuallyHidden.Root>
          <SheetTrigger asChild onClick={() => setOpen(true)}>
            <Button
              size="icon-sm"
              variant="ghost"
              className="lg:hidden bg-primary hover:bg-primary/95 hover:text-white text-white"
            >
              <MenuIcon size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full h-[100dvh] border-0 p-0">
            <div className="flex flex-col h-full bg-white">
              <div className="flex justify-between items-center p-4">
                <Link href="/" onClick={() => setOpen(false)}>
                  <LogoLarge />
                </Link>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="bg-primary hover:bg-primary/95 hover:text-white text-white"
                >
                  <X size={24} />
                </Button>
              </div>
              <div className="flex flex-col px-4">
                <nav className="space-y-6">
                  {links.map((link) => (
                    <div key={link.name}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block text-2xl hover:text-primary transition-colors",
                          pathname.startsWith(link.href)
                            ? "text-primary"
                            : "text-black"
                        )}
                      >
                        {link.name}
                      </Link>
                    </div>
                  ))}
                </nav>
                <Button size="lg" className="w-full rounded-xl mt-8">
                  <a href="https://forms.gle/hhuLVupnm2F1AGa96" target="_blank" rel="noopener noreferrer">
                    Join the Community
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </>
  );
};

export default NavBar;