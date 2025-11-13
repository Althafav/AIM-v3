"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import ButtonComponent from "@/components/UI/ButtonComponent";
import PromotionBannerCarousel from "../PromotionBannerCarousel";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";
import SearchBar from "../SearchBar";

/* ---------------- Types ---------------- */
type MenuItem = {
  system: { id: string };
  name?: { value?: string };
  title?: { value?: string };
  link?: { value?: string };
  url?: { value?: string };
  subitems?: { value?: MenuItem[] };
};

/* ---------------- Utils ---------------- */
const getLabel = (n: any) => n?.elements.name?.value ?? "";
const getHref = (n: any) => n?.elements.link?.value ?? "#";
const getKids = (n: any) => (n?.elements.subitems?.linkedItems ?? []) as any[];
const isSameOrChild = (pathname: string, href?: string) =>
  !!href &&
  href !== "#" &&
  (pathname === href || pathname.startsWith(href + "/"));

/* ---------------- Icons ---------------- */
function Chevron({
  open,
  className = "",
}: {
  open?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition-transform ${
        open ? "rotate-180" : ""
      } ${className}`}
      fill="white"
    >
      <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.17l3.71-2.94a.75.75 0 1 1 .94 1.16l-4.24 3.36a.75.75 0 0 1-.94 0L5.25 8.39a.75.75 0 0 1-.02-1.18z" />
    </svg>
  );
}
function ArrowRight({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

/* ========================================================================== */
/* Desktop Nav: flyout with side panel (great for multi-level)                 */
/* ========================================================================== */
function DesktopNav({
  items,
  ctabuttons,
  pathname,
  openMenus,
  onToggle,
}: {
  items: any[];
  ctabuttons: any[];
  pathname: string;
  openMenus: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const [activeChildByParent, setActiveChildByParent] = useState<
    Record<string, string>
  >({});

  return (
    <div className="flex justify-end sm:justify-between py-1">
      <ul className="hidden md:flex md:items-center md:gap-2" role="menubar">
        {items.map((item, index) => {
          const id = item.system.id;
          const label = getLabel(item);
          const href = getHref(item);
          const kids = getKids(item);
          const hasSub = kids.length > 0;
          const isActive = isSameOrChild(pathname, href);

          const isHoverOpen = index === 0; // top index 0 -> hover open
          const isClickControlled = index !== 0; // others -> click open

          // IMPORTANT: visibility classes — default hidden; only show on hover (idx 0) or state (others)
          const flyoutVisible = isHoverOpen
            ? "md:group-hover:block"
            : openMenus[id]
            ? "md:block"
            : "md:hidden";

          return (
            <li
              key={id}
              className={`relative group last:border-primary last:border-2 rounded-full px-2`}
              role="none"
            >
              <div className="flex items-center gap-0" role="menuitem">
                <Link
                  href={href}
                  className={[
                    " py-2 rounded-md text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                    "text-white",
                    isActive ? "text-sky-700" : "",
                  ].join(" ")}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    if (href === "#") {
                      e.preventDefault();
                      e.stopPropagation();
                      onToggle(id);
                    }
                  }}
                  onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
                    if (href === "#" && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      e.stopPropagation();
                      onToggle(id);
                    }
                  }}
                >
                  {label}
                </Link>

                {hasSub &&
                  (isClickControlled ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggle(id);
                      }}
                      aria-expanded={!!openMenus[id]}
                      aria-controls={`flyout-${id}`}
                      className="hidden md:inline-flex rounded-md text-slate-400 hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      <Chevron open={openMenus[id]} />
                    </button>
                  ) : (
                    <span className="hidden md:inline-flex text-slate-400">
                      <Chevron />
                    </span>
                  ))}
              </div>

              {hasSub && (
                <div
                  id={`flyout-${id}`}
                  className={[
                    // base position & card wrapper
                    "absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] z-50",
                    // DEFAULT HIDDEN; toggle with flyoutVisible
                    "hidden",
                    flyoutVisible,
                  ].join(" ")}
                  aria-hidden={!(isHoverOpen || openMenus[id])}
                >
                  {/* pointer */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-0 w-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white drop-shadow" />
                  {/* Card */}
                  <div className="bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden">
                    <div className="flex">
                      {/* LEFT column */}
                      <ul className=" max-w-[320px] min-w-60 p-2">
                        {kids.map((child) => {
                          const cid = child.system.id;
                          const clabel = getLabel(child);
                          const chref = getHref(child);
                          const ckids = getKids(child);
                          const hasGrand = ckids.length > 0;

                          return (
                            <li key={cid}>
                              <div
                                className="flex items-center justify-between"
                                onMouseEnter={() =>
                                  setActiveChildByParent((s) => ({
                                    ...s,
                                    [id]: cid,
                                  }))
                                }
                                onFocus={() =>
                                  setActiveChildByParent((s) => ({
                                    ...s,
                                    [id]: cid,
                                  }))
                                }
                              >
                                <Link
                                  href={chref}
                                  className="block w-full rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                                  onClick={(
                                    e: React.MouseEvent<HTMLAnchorElement>
                                  ) => {
                                    if (chref === "#") {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setActiveChildByParent((s) => ({
                                        ...s,
                                        [id]: cid,
                                      }));
                                    }
                                  }}
                                  onKeyDown={(
                                    e: React.KeyboardEvent<HTMLAnchorElement>
                                  ) => {
                                    if (
                                      chref === "#" &&
                                      (e.key === "Enter" || e.key === " ")
                                    ) {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setActiveChildByParent((s) => ({
                                        ...s,
                                        [id]: cid,
                                      }));
                                    }
                                  }}
                                >
                                  {clabel}
                                </Link>
                                {hasGrand && (
                                  <ArrowRight className="mr-2 text-slate-300" />
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>

                      {/* RIGHT panel (grand-children) */}
                      {(() => {
                        const activeChildId =
                          activeChildByParent[id] || (kids[0]?.system.id ?? "");
                        const rightNode =
                          kids.find((k) => k.system.id === activeChildId) ||
                          kids[0];
                        const rightKids = rightNode ? getKids(rightNode) : [];
                        if (!rightNode || rightKids.length === 0) return null;

                        return (
                          <div className="min-w-[260px] max-w-[360px] border-l border-slate-100 p-2">
                            <div className="px-3 pt-2 pb-1 text-xs uppercase tracking-wide text-slate-400">
                              {getLabel(rightNode)}
                            </div>
                            <ul>
                              {rightKids.map((leaf) => {
                                const lid = leaf.system.id;
                                const llabel = getLabel(leaf);
                                const lhref = getHref(leaf);
                                const leafKids = getKids(leaf);

                                return (
                                  <li key={lid}>
                                    <Link
                                      href={lhref}
                                      className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                                    >
                                      <span>{llabel}</span>
                                      {leafKids.length > 0 && (
                                        <ArrowRight className="text-slate-300" />
                                      )}
                                    </Link>

                                    {leafKids.length > 0 && (
                                      <ul className="ml-3 mb-2">
                                        {leafKids.map((n4) => (
                                          <li key={n4.system.id}>
                                            <Link
                                              href={getHref(n4)}
                                              className="block rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
                                            >
                                              {getLabel(n4)}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex gap-2">
        <SearchBar />
        {ctabuttons.length > 0 && (
          <div className="sm:block hidden">
            {ctabuttons.map((item: any) => {
              return (
                <div key={item.system.id}>
                  <ButtonComponent
                    variant="primary"
                    name={item.elements.name.value}
                    link={item.elements.link.value}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ========================================================================== */
/* Mobile Nav: drill-down (slide)                                             */
/* ========================================================================== */
/* ========================================================================== */
/* Mobile Nav: nested accordion (all levels work)                              */
/* ========================================================================== */

function Collapse({
  open,
  children,
  className = "",
  id,
}: {
  open: boolean;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<string | number>(0);
  const animRef = React.useRef<number | null>(null);

  // ResizeObserver to track inner content changes (e.g., deeper accordion toggles)
  React.useLayoutEffect(() => {
    const content = contentRef.current;
    const wrapper = wrapperRef.current;
    if (!content || !wrapper) return;

    const ro = new ResizeObserver(() => {
      if (!open) return; // only adjust dynamically while open
      // If wrapper is in 'auto' height, temporarily lock to pixel height so transition can animate future changes
      const currentStyleHeight = getComputedStyle(wrapper).height;
      const pixelNow = content.scrollHeight;
      if (currentStyleHeight === "auto") {
        wrapper.style.height = `${pixelNow}px`;
      }
      setHeight(pixelNow);
    });
    ro.observe(content);
    return () => ro.disconnect();
  }, [open]);

  // Open / close transition logic
  React.useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    // cancel pending raf
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }

    if (open) {
      // from 0 -> measured -> after transition end -> auto
      const measured = content.scrollHeight;
      // set explicit height to allow CSS transition
      setHeight(measured);

      const onEnd = () => {
        // after expand finishes, switch to auto so nested changes don’t get clipped
        wrapper.style.height = "auto";
        wrapper.removeEventListener("transitionend", onEnd);
      };
      wrapper.addEventListener("transitionend", onEnd);
    } else {
      // from auto/measured -> 0
      // If height is auto, lock to current pixel height first, then go to 0 next frame
      const current = wrapper.getBoundingClientRect().height;
      wrapper.style.height = `${current}px`;

      animRef.current = requestAnimationFrame(() => {
        setHeight(0);
      });
    }
  }, [open]);

  // Keep the inline style height in sync with state (string 'auto' is set in transitionend)
  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (typeof height === "number") {
      wrapper.style.height = `${height}px`;
    }
  }, [height]);

  return (
    <div
      ref={wrapperRef}
      className={`overflow-hidden transition-[height] duration-300 will-change-[height] ${className}`}
      aria-hidden={!open}
      id={id}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

/** Recursive accordion item */
function AccordionItem({
  node,
  level,
  pathname,
  defaultOpen = false,
}: {
  node: MenuItem;
  level: number;
  pathname: string;
  defaultOpen?: boolean;
}) {
  const kids = getKids(node);
  const hasSub = kids.length > 0;
  const href = getHref(node);
  const label = getLabel(node);
  const active = isSameOrChild(pathname, href);

  const [open, setOpen] = React.useState<boolean>(defaultOpen);

  return (
    <li className="border-b border-slate-100" role="none">
      <div className="flex items-center">
        {/* Link */}
        <Link
          href={href}
          className={`block grow px-4 py-3 text-sm tracking-tight `}
          role="menuitem"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            if (href === "#") {
              e.preventDefault();
              e.stopPropagation();
              setOpen((v) => !v);
            }
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
            if (href === "#" && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              e.stopPropagation();
              setOpen((v) => !v);
            }
          }}
        >
          <span className="inline-flex items-center gap-2">{label}</span>
        </Link>

        {/* Toggle chevron */}
        {hasSub && (
          <button
            type="button"
            className="p-3 text-slate-400 hover:text-slate-700"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`sect-${node.system.id}`}
            aria-label={open ? `Collapse ${label}` : `Expand ${label}`}
          >
            <Chevron open={open} className="fill-none stroke-current" />
          </button>
        )}
      </div>

      {/* Children */}
      {hasSub && (
        <Collapse
          open={open}
          className="bg-slate-50"
          id={`sect-${node.system.id}`}
        >
          <ul className="py-1" role="menu" aria-label={`${label} submenu`}>
            {kids.map((child) => (
              <AccordionItem
                key={`${node.system.id}-${child.system.id}-${level}`}
                node={child}
                level={level + 1}
                pathname={pathname}
                // auto-open branch if it contains the active path
                defaultOpen={isSameOrChild(pathname, getHref(child))}
              />
            ))}
          </ul>
        </Collapse>
      )}
    </li>
  );
}

function MobileNav({
  items,
  pathname,
}: {
  items: MenuItem[];
  pathname: string;
}) {
  return (
    <nav
      className="md:hidden relative"
      role="menu"
      aria-label="Mobile Navigation"
    >
      <ul className="" role="menu">
        {items.map((node) => (
          <AccordionItem
            key={node.system.id}
            node={node}
            level={0}
            pathname={pathname}
            defaultOpen={isSameOrChild(pathname, getHref(node))}
          />
        ))}
      </ul>
    </nav>
  );
}

/* ========================================================================== */
/* Main Component                                                             */
/* ========================================================================== */
export default function MenuComponent() {
  const pathname = usePathname() || "/";
  const [pageData, setPageData] = useState<any | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/global", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch global data");
        return res.json();
      })
      .then(setPageData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenus({});
  }, [pathname]);

  const toggleMenu = (id: string) =>
    setOpenMenus((s) => ({ ...s, [id]: !s[id] }));

  if (!pageData) return null;

  return (
    <header className=" bg-black ">
      <div className="container mx-auto px-4">
        {/* Top Row */}
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-6">
            {/* AIM Logo */}
            <Link href="/" className="shrink-0">
              <img
                src={pageData.aimlogowithwhitetext?.value?.[0]?.url}
                alt="AIM Logo"
                className="h-20 w-auto object-contain"
              />
            </Link>

            {/* Divider */}
            <div className="block h-12 w-px bg-gray-300"></div>

            {/* Partner Logos */}
            <div className="flex items-center gap-6">
              {pageData.ministrylogos.linkedItems
                .slice(0, 4)
                .map((item: any) => {
                  const id =
                    item?.system?.id ??
                    item?.elemets.image?.value?.[0]?.url ??
                    Math.random().toString(36);
                  return (
                    <div
                      key={id}
                      className="h-20 w-20 flex items-center justify-center overflow-hidden"
                      title="Partner"
                    >
                      <img
                        src={item?.elements.image?.value?.[0]?.url}
                        alt="Partner Logo"
                        className="max-h-20 max-w-20 object-contain"
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="promo-banner-swiper hidden sm:block max-w-sm">
            <PromotionBannerCarousel
              promoBanners={pageData.promobanneritems.linkedItems}
            />
          </div>
          <button
            className="md:hidden inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white "
            onClick={() => setMobileOpen((s) => !s)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            type="button"
          >
            <IoMenu size={24} />
          </button>
        </div>

        {/* NAV */}
        <nav className="relative">
          {/* Desktop */}
          <DesktopNav
            items={pageData.menuitems?.linkedItems ?? []}
            ctabuttons={pageData.ctabutton.linkedItems}
            pathname={pathname}
            openMenus={openMenus}
            onToggle={toggleMenu}
          />

          {/* Mobile */}
        </nav>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="md:hidden fixed inset-0 z-50 bg-white overflow-y-auto"
        >
          <div className="min-h-screen flex flex-col">
            <div className="bg-white mb-3 px-4 py-3">
              <div className="flex justify-end">
                <IoMdClose size={24} onClick={() => setMobileOpen((s) => !s)} />
              </div>
              <MobileNav
                items={pageData.menuitems?.linkedItems ?? []}
                pathname={pathname}
              />
            </div>

            {pageData.ctabutton.linkedItems.length > 0 && (
              <div className="mt-auto px-4 pb-6">
                {pageData.ctabutton.linkedItems.map((item: any) => (
                  <ButtonComponent
                    variant="primary"
                    className="w-full text-center"
                    key={item.system.id}
                    name={item.elements.name.value}
                    link={item.elements.link.value}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
