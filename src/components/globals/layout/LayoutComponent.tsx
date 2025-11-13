"use client";

import { usePathname } from "next/navigation";
import MenuComponent from "./MenuComponent";
import FooterComponent from "./FooterComponent";
import ScrollToTop from "../ScrollToTop";

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hiddenRoutes = ["/register-interest", "/forms"];
  const hideLayout = hiddenRoutes.some((route) => pathname?.startsWith(route));

  return (
    <>
      {!hideLayout && <MenuComponent />}
      {children}
      <ScrollToTop />
      {!hideLayout && <FooterComponent />}
    </>
  );
}
