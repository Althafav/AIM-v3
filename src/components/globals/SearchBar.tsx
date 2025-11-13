"use client";

import React, {
  useState,
  useEffect,
  FormEvent,
  useCallback,
  useRef,
} from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchBarProps {
  placeholder?: string;
  className?: string; // for the trigger button wrapper
}

export default function SearchBar({
  placeholder = "What’s on your mind?",
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (pathname === "/search") {
      const q = searchParams?.get("query") ?? "";
      setQuery(q);
    }
  }, [searchParams, pathname]);

  useEffect(() => {
    if (open && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Close on ESC
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  // Submit search
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setOpen(false);
    router.push(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 hover:border-white/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${className}`}
        aria-label="Open search"
      >
        <FiSearch className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-999 flex items-start justify-center bg-black/40 backdrop-blur-md px-4 pt-24 sm:pt-32"
          onClick={() => setOpen(false)}
        >
          {/* Card */}
          <div
            className="w-full max-w-2xl rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl shadow-black/40 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5 text-white/80">
                <FiSearch className="h-4 w-4" />
              </span>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder:text-white/40 border-none outline-none focus:ring-0"
              />

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
                aria-label="Close search"
              >
                <FiX className="h-4 w-4" />
              </button>
            </form>

            <div className="flex items-center justify-between px-4 sm:px-6 pb-3 sm:pb-4 text-[11px] sm:text-xs text-white/40">
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline">
                  Press <kbd className="rounded bg-white/10 px-1.5">Enter</kbd>{" "}
                </span>
                <span className="sm:hidden">
                  Type your search and hit Enter.
                </span>
              </div>
              <span className="hidden sm:inline">
                Press <kbd className="rounded bg-white/10 px-1.5">Esc</kbd> to
                close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
