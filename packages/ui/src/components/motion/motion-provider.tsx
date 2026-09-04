"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { DURATION, EASE_OUT } from "../../lib/motion.js";
import { useSpotlight } from "../../hooks/use-spotlight.js";

/**
 * App-wide motion defaults.
 *
 * `reducedMotion="user"` makes every framer-motion component in the tree
 * honour prefers-reduced-motion automatically: transform and layout animations
 * are dropped, opacity is kept. That means individual components never have to
 * branch on the media query themselves.
 *
 * Also the host for `useSpotlight()`: it is the one client component that
 * wraps every route, and the hook returns void and holds no state, so calling
 * it here costs no render — not even when the pointer moves. Pass
 * `spotlight={false}` to leave the pointer light out.
 */
export function MotionProvider({
  children,
  spotlight = true,
}: {
  children: ReactNode;
  spotlight?: boolean;
}) {
  useSpotlight(spotlight);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DURATION.slow, ease: EASE_OUT }}
    >
      {children}
    </MotionConfig>
  );
}
