"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/animations/useLenis";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Footer } from "@/components/footer/Footer";
import { Loader } from "@/components/loader/Loader";
import { Navigation } from "@/components/navigation/Navigation";
import { setSection, type SceneSection } from "@/three/interactions/sceneStore";

const CanvasRoot = dynamic(
  () => import("@/three/scene/CanvasRoot").then((m) => m.CanvasRoot),
  { ssr: false },
);

const PAGE_SECTION: Record<string, SceneSection> = {
  "/": "hero",
  "/services": "services",
  "/services/": "services",
  "/about": "about",
  "/about/": "about",
  "/contact": "contact",
  "/contact/": "contact",
};

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [booted, setBooted] = useState(false);
  const onLoaderDone = useCallback(() => {
    setBooted(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bayhan-booted", "1");
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("bayhan-booted") === "1") {
      setBooted(true);
    }
  }, []);

  useEffect(() => {
    setSection(PAGE_SECTION[pathname] ?? "hero");
  }, [pathname]);

  useLenis(booted);

  return (
    <>
      {!booted && <Loader onDone={onLoaderDone} />}
      <CanvasRoot />
      <div className="grain" aria-hidden="true" />
      <div className="atmosphere-edge" aria-hidden="true" />
      <CustomCursor />
      <Navigation />
      <main className={`site-shell ${booted ? "is-ready" : ""}`}>{children}</main>
      <Footer />
    </>
  );
}
