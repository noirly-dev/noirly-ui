"use client";

import { useSyncExternalStore } from "react";
import type { LenisOptions } from "lenis";

/**
 * Lenis configuration, split by environment.
 *
 * `autoRaf: false` everywhere: the caller owns the frame loop, so Lenis and
 * whatever else animates on the page advance in the same frame rather than as
 * two independent rAF loops — which is what stops tilt cards and parallax from
 * lagging half a frame behind the scroll position that produced them.
 */

/** Expo-out. Heavy and decelerating; deliberately not a spring — no bounce. */
const expoOut = (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/** Clears the sticky header when Lenis lands on an anchor target. */
const ANCHOR_OFFSET = -104;

export type ScrollMode = "default" | "touch" | "reduced";

/**
 * Frozen module constants rather than objects built in render: consumers key
 * their Lenis instance off the options object, so a fresh literal every render
 * would thrash the instance.
 */
const OPTIONS: Record<ScrollMode, LenisOptions> = {
  default: {
    duration: 1.4,
    easing: expoOut,
    smoothWheel: true,
    // Native momentum on trackpads/touch is better than anything we synthesise.
    syncTouch: false,
    anchors: { offset: ANCHOR_OFFSET },
    autoRaf: false,
  },
  touch: {
    duration: 0.8,
    easing: expoOut,
    // No wheel override on touch — the platform's own momentum is the point.
    smoothWheel: false,
    syncTouch: false,
    anchors: { offset: ANCHOR_OFFSET },
    autoRaf: false,
  },
  reduced: {
    // Lenis stays installed and keeps owning scroll, but with duration and lerp
    // both falsy its animator takes the `value = target` branch: every scroll
    // lands on the same frame it was requested. No smoothing, no easing.
    duration: 0,
    lerp: 0,
    smoothWheel: false,
    syncTouch: false,
    anchors: { offset: ANCHOR_OFFSET },
    autoRaf: false,
  },
};

function mediaSubscriber(query: string): (onStoreChange: () => void) => () => void {
  return (onStoreChange) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onStoreChange);
    return () => mql.removeEventListener("change", onStoreChange);
  };
}

const COARSE = "(pointer: coarse)";
const REDUCED = "(prefers-reduced-motion: reduce)";

const subscribeCoarse = mediaSubscriber(COARSE);
const subscribeReduced = mediaSubscriber(REDUCED);
const getCoarse = (): boolean => window.matchMedia(COARSE).matches;
const getReduced = (): boolean => window.matchMedia(REDUCED).matches;
const getServerSnapshot = (): boolean => false;

/** Live scroll mode. Re-evaluates when a mouse is plugged in or the OS setting flips. */
export function useScrollMode(): ScrollMode {
  const coarse = useSyncExternalStore(subscribeCoarse, getCoarse, getServerSnapshot);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getServerSnapshot);
  if (reduced) return "reduced";
  return coarse ? "touch" : "default";
}

export function lenisOptions(mode: ScrollMode): LenisOptions {
  return OPTIONS[mode];
}
