"use client";

import * as React from "react";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface UseDialogA11yOptions {
  open: boolean;
  onClose: () => void;
  /** Element that wraps the dialog content. */
  containerRef: React.RefObject<HTMLElement | null>;
}

/**
 * Shared modal/drawer behaviour: initial focus, focus trap, Escape to close,
 * body scroll lock, and focus restoration on close.
 */
export function useDialogA11y({
  open,
  onClose,
  containerRef,
}: UseDialogA11yOptions) {
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  React.useEffect(() => {
    if (!open) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const getFocusable = () =>
      containerRef.current
        ? Array.from(containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
        : [];

    const focusInitial = () => {
      if (containerRef.current?.contains(document.activeElement)) return;
      const [first] = getFocusable();
      (first ?? containerRef.current)?.focus();
    };

    // Focus immediately so the dialog works even in throttled/background tabs,
    // then retry on the next frame in case the content mounted lazily.
    focusInitial();
    const focusFrame = requestAnimationFrame(focusInitial);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        containerRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!focusable.includes(active as HTMLElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, containerRef]);
}
