"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1180px] items-center gap-6 px-5">
        {/* <Link to="/" className="flex items-center gap-2"> */}
          <span className="grid size-6 place-items-center rounded-[5px] bg-primary text-[13px] font-bold leading-none text-primary-foreground">
            A
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Aakar</span>
        {/* </Link> */}
        <nav className="ml-4 hidden items-center gap-5 md:flex">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {/* <Link */}
            to="/app"
            className="hidden rounded-md px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground sm:block"
          {/* > */}
            Log in
          {/* </Link> */}
          {/* <Link */}
            to="/app"
            className="rounded-md bg-primary px-3 py-1.5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          {/* > */}
            Get started
          {/* </Link> */}
        </div>
      </div>
    </header>
  );
}

const footerCols: { title: string; items: { label: string; to?: string }[] }[] = [
  {
    title: "Product",
    items: [
      { label: "Studio", to: "/app" },
      { label: "Recording", to: "/app/record" },
      { label: "Video", to: "/app/video" },
      { label: "Image", to: "/app/image" },
      { label: "Screenshots", to: "/app/screenshots" },
      { label: "Code", to: "/app/code" },
      { label: "Templates", to: "/app/templates" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Documentation", to: "/app/help" },
      { label: "Tutorials", to: "/app/help" },
      { label: "Keyboard shortcuts", to: "/app/help" },
      { label: "Changelog", to: "/app/help" },
    ],
  },
  {
    title: "Company",
    items: [{ label: "About" }, { label: "Blog" }, { label: "Contact" }],
  },
  {
    title: "Legal",
    items: [{ label: "Privacy" }, { label: "Terms" }],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-12 md:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-[5px] bg-primary text-[13px] font-bold leading-none text-primary-foreground">
              A
            </span>
            <span className="text-[15px] font-semibold tracking-tight">Aakar</span>
          </div>
          <p className="mt-3 max-w-[240px] text-[12.5px] leading-relaxed text-muted-foreground">
            One creative workspace — from first recording to final post.
          </p>
        </div>
        {footerCols.map((c) => (
          <div key={c.title}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
              {c.title}
            </p>
            {/* <ul className="mt-3 space-y-2">
              {c.items.map((i) => (
                <li key={i.label}>
                  {i.to ? (
                    <Link
                      to={i.to}
                      className="text-[12.5px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {i.label}
                    </Link>
                  ) : (
                    <span className="text-[12.5px] text-muted-foreground">
                      {i.label}
                    </span>
                  )}
                </li>
              ))}
            </ul> */}
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-2 px-5 py-4 text-[11.5px] text-muted-foreground">
          <span>© 2026 Aakar. All rights reserved.</span>
          <span className="num">Built for people who make things.</span>
        </div>
      </div>
    </footer>
  );
}
