/**
 * Motion layer — everything that needs `framer-motion`.
 *
 * Kept out of the root entry so apps that never animate do not pull
 * framer-motion into their bundle just by importing a Button.
 */

export {
  EASE_OUT,
  EASE_IN_OUT,
  EASE_SOFT,
  DURATION,
  SPRING,
  SPRING_SOFT,
  SPRING_SCROLL,
  TRAVEL,
  fadeIn,
  fadeUp,
  fadeDown,
  blurUp,
  scaleIn,
  cardIn,
  maskUp,
  stagger,
  VIEWPORT,
  pageTransition,
  TAP,
  HOVER_LIFT,
} from "./lib/motion.js";

export { MotionProvider } from "./components/motion/motion-provider.js";
export { Reveal, StaggerGroup, RevealItem } from "./components/motion/reveal.js";
export { TextReveal } from "./components/motion/text-reveal.js";
export { SpotlightCard } from "./components/motion/spotlight-card.js";
export { Marquee } from "./components/motion/marquee.js";
export { Magnetic } from "./components/motion/magnetic.js";
export { Counter } from "./components/motion/counter.js";
export { ScrollProgress } from "./components/motion/scroll-progress.js";
export { TiltCard } from "./components/motion/tilt-card.js";
