"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  /** Accessible name of the tab list. */
  label: string;
  /** If set, advance to the next tab every N ms until the visitor interacts. */
  autoAdvanceMs?: number;
  className?: string;
};

/**
 * Accessible tabs: arrow keys, Home/End, roving tabindex.
 *
 * All panels stay in the DOM (so the static HTML contains the content) and are stacked in a single grid cell, so
 * the container always has the height of the tallest panel and nothing jumps when the tab changes.
 *
 * Auto-advance stops permanently after the first click, key press, or focus, pauses while hovered, and is disabled
 * for visitors who prefer reduced motion.
 */
export function Tabs({ tabs, label, autoAdvanceMs, className = "" }: TabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const autoplay = Boolean(autoAdvanceMs) && !interacted && !hovering && !reduceMotion && tabs.length > 1;

  useEffect(() => {
    if (!autoplay || !autoAdvanceMs) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % tabs.length), autoAdvanceMs);
    return () => window.clearTimeout(t);
  }, [autoplay, autoAdvanceMs, active, tabs.length]);

  const select = useCallback((index: number, focus = false) => {
    setActive(index);
    setInteracted(true);
    if (focus) tabRefs.current[index]?.focus();
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      select(next, true);
    }
  };

  return (
    <div
      className={className}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setInteracted(true)}
    >
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                selected
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-white text-muted hover:border-ink/30 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-1">
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <div
              key={t.id}
              role="tabpanel"
              id={`${baseId}-panel-${t.id}`}
              aria-labelledby={`${baseId}-tab-${t.id}`}
              aria-hidden={!selected}
              className={`col-start-1 row-start-1 min-w-0 transition-opacity duration-300 ${
                selected ? "opacity-100" : "pointer-events-none invisible opacity-0"
              }`}
            >
              {t.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
