import type { ReactNode } from "react";

import { Footer } from "@/features/core/components/Footer";
import { FloatingActions } from "@/features/core/components/FloatingActions";
import { Header } from "@/features/core/components/Header";

type MainLayoutProps = Readonly<{ children: ReactNode }>;

/** Shared shell for all public-facing website routes. */
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      {/* Main document content is supplied by the active route. */}
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
