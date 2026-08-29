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
    title: "Museum Membership",
    kicker: "Annual Patron Program",
    icon: "landmark",
    description:
      "Enjoy unlimited museum admission, exclusive curator-led previews, private symposium access, and subscription to the Central Asian Art Journal.",
    ctaLabel: "Inquire About Membership",
  },
  {
    id: "patron",
    intentKey: "patron",
    title: "Philanthropy & Conservation",
    kicker: "Heritage Stewardship",
    icon: "sparkles",
    description:
      "Directly fund non-destructive laser conservation, rare artifact acquisitions, and digital archiving for fragile Pamiri textiles and ancient manuscripts.",
    ctaLabel: "Support Conservation",
  },
  {
    id: "visits",
    intentKey: "visits",
    title: "Group & School Visits",
    kicker: "Educational Expeditions",
    icon: "compass",
    description:
      "Book customized guided tours, student hands-on tile workshops, and private after-hours gallery walkthroughs tailored for groups of 10 or more.",
    ctaLabel: "Book Group Visit",
  },
  {
    id: "research",
    intentKey: "research",
    title: "Research & Archival Access",
    kicker: "Scholarly Inquiries",
    icon: "book-open",
    description:
      "Request high-resolution digital scans, archaeological excavation journals, and appointments with senior manuscript epigraphists.",
    ctaLabel: "Request Archive Access",
  },
  {
    id: "partnership",
    intentKey: "partnership",
    title: "Cultural Partnerships",
    kicker: "Global Collaborations",
    icon: "map-pin",
    description:
      "Collaborate on international traveling exhibitions, UNESCO heritage documentation, and joint academic publications across Central Asia.",
    ctaLabel: "Propose Partnership",
  },
  {
    id: "sponsorship",
    intentKey: "sponsorship",
    title: "Artifact Sponsorship",
    kicker: "Dedicated Relic Naming",
    icon: "check",
    description:
      "Sponsor the restoration and display case of a specific ancient artifact, receiving permanent curatorial plaque recognition.",
    ctaLabel: "Sponsor An Artifact",
  },
];
