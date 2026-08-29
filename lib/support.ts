import type { IconName } from "@/components/ui/Icon";

export type SupportIntentKey =
  | "membership"
  | "patron"
  | "visits"
  | "research"
  | "partnership"
  | "sponsorship";

export type SupportIntentItem = {
  id: string;
  intentKey: SupportIntentKey;
  title: string;
  kicker: string;
  icon: IconName;
  description: string;
  ctaLabel: string;
};

export const supportIntentsData: SupportIntentItem[] = [
  {
    id: "membership",
    intentKey: "membership",
    title: "Museum Membership & Patronage",
    kicker: "Join",
    icon: "landmark",
    description:
      "Enjoy unlimited museum admission, curator previews, and subscription to the Central Asian Art Journal.",
    ctaLabel: "Inquire About Membership",
  },
  {
    id: "patron",
    intentKey: "patron",
    title: "Philanthropy & Relic Conservation",
    kicker: "Give",
    icon: "sparkles",
    description:
      "Fund non-destructive laser ceramic conservation, rare artifact acquisitions, and digital archiving.",
    ctaLabel: "Support Conservation",
  },
  {
    id: "partnership",
    intentKey: "partnership",
    title: "Cultural Partnerships & CSR",
    kicker: "Partner",
    icon: "map-pin",
    description:
      "Collaborate on international traveling exhibitions, UNESCO documentation, and joint academic projects.",
    ctaLabel: "Propose Partnership",
  },
  {
    id: "visits",
    intentKey: "visits",
    title: "Group, School & Guided Visits",
    kicker: "Collaborate",
    icon: "compass",
    description:
      "Book customized guided tours, hands-on tile workshops, and private after-hours gallery walkthroughs.",
    ctaLabel: "Book Group Visit",
  },
  {
    id: "research",
    intentKey: "research",
    title: "Research & Archival Access",
    kicker: "Research",
    icon: "book-open",
    description:
      "Request high-resolution manuscript scans, excavation journals, and curator epigraphist appointments.",
    ctaLabel: "Request Archive Access",
  },
  {
    id: "sponsorship",
    intentKey: "sponsorship",
    title: "Artifact & Gallery Sponsorship",
    kicker: "Fund",
    icon: "check",
    description:
      "Sponsor a workshop, exhibition gallery, or ancient artifact restoration with permanent plaque recognition.",
    ctaLabel: "Sponsor An Artifact",
  },
];
