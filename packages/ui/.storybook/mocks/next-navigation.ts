let pathname = "/settings";

export function usePathname() {
  return pathname;
}

export function setStorybookPathname(next: string) {
  pathname = next;
}
