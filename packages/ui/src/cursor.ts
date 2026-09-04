/**
 * Cursor entry point.
 *
 * The pieces are re-exported from the root barrel too; this narrow path exists
 * so an app can `dynamic(() => import("@noirly-dev/ui/cursor"))` and get a
 * chunk holding only the cursor, rather than everything the barrel reaches.
 */

export { CustomCursor } from "./components/fx/custom-cursor.js";
export { useCursor, type Cursor, type CursorVariant } from "./hooks/use-cursor.js";
