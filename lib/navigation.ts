export type NavItem = {
  label: string;
  href: string;
};

export const mainNavItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "The Building", href: "/about/building" },
  { label: "Collections", href: "/collections" },
  { label: "Exhibitions", href: "/exhibitions" },
  { label: "News & Events", href: "/news-events" },
  { label: "Contact", href: "/contact" },
];

export const footerNavItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "The Building", href: "/about/building" },
  { label: "Collections", href: "/collections" },
  { label: "News & Events", href: "/news-events" },
  { label: "Exhibitions", href: "/exhibitions" },
  { label: "Contact", href: "/contact" },
  { label: "Support the Museum", href: "/contact#donate" },
];

