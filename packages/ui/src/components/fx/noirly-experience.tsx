"use client";

import type { ReactNode } from "react";
import { MotionProvider } from "../motion/motion-provider.js";
import { SiteBackground } from "./site-background.js";
import { CustomCursor } from "./custom-cursor.js";
import { PageTransition } from "./page-transition.js";
import { SmoothScroll } from "./smooth-scroll.js";

export interface NoirlyExperienceProps {
  children: ReactNode;
  /** Wordmark shown on the shutter during a route change. */
  mark?: string;
  /** Ambient lit background behind every route. */
  background?: boolean;
  /** Branded two-part cursor. Fine pointers only; touch keeps the system cursor. */
  cursor?: boolean;
  /** Cursor-following ambient light on <main>. */
  spotlight?: boolean;
  /** Accent shutter wipe on route change. */
  pageTransition?: boolean;
  /**
   * Lenis smooth scroll. Takes over the document scroller, so turn it off
   * around a virtualised list that measures `window.scrollY` itself.
   */
  smoothScroll?: boolean;
}

/**
 * The whole Noirly presentation layer in one wrapper.
 *
 * Order matters and is the reason this exists rather than each app assembling
 * the parts itself:
 *
 *  - <SmoothScroll> is outermost. It owns the document scroller, and everything
 *    below reads scroll position from it. It renders no element of its own, so
 *    it cannot affect layout.
 *  - <SiteBackground> and <CustomCursor> are siblings of the content, not
 *    ancestors: both are `position: fixed`, so they never shift layout and can
 *    mount late.
 *  - <MotionProvider> must wrap anything using framer-motion, and it hosts
 *    `useSpotlight()`.
 *  - <PageTransition> wraps only `children`, so a persistent header or sidebar
 *    rendered outside it survives the route change. The shutter is fixed, so it
 *    covers them regardless.
 *
 * Requires `@noirly-dev/ui/styles.css`, `/effects.css` and `/transitions.css`.
 */
export function NoirlyExperience({
  children,
  mark = "Noirly",
  background = true,
  cursor = true,
  spotlight = true,
  pageTransition = true,
  smoothScroll = true,
}: NoirlyExperienceProps) {
  const content = pageTransition ? (
    <PageTransition mark={mark}>{children}</PageTransition>
  ) : (
    children
  );

  const inner = (
    <>
      {background ? <SiteBackground /> : null}
      {cursor ? <CustomCursor /> : null}
      <MotionProvider spotlight={spotlight}>{content}</MotionProvider>
    </>
  );

  return smoothScroll ? <SmoothScroll>{inner}</SmoothScroll> : inner;
}
