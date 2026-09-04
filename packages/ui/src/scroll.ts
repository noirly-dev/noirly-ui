/**
 * Scroll layer — everything that needs `lenis`.
 *
 * Also import `lenis/dist/lenis.css` once in the app stylesheet; without it
 * Lenis cannot size the document scroller correctly.
 */

export { SmoothScroll } from "./components/fx/smooth-scroll.js";
export {
  useScrollMode,
  lenisOptions,
  type ScrollMode,
} from "./hooks/use-scroll-mode.js";
