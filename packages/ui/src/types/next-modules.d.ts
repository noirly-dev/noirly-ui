declare module "next/link" {
  import type { AnchorHTMLAttributes, ReactNode } from "react";

  export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children?: ReactNode;
  };

  export default function Link(props: LinkProps): React.ReactElement;
}

declare module "next/navigation" {
  export function usePathname(): string;
}

declare module "next/font/google" {
  type NextFont = { variable: string; className: string };

  export function Fraunces(options: Record<string, unknown>): NextFont;
  export function Hanken_Grotesk(options: Record<string, unknown>): NextFont;
  export function JetBrains_Mono(options: Record<string, unknown>): NextFont;
}