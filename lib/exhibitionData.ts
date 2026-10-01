import type { IconName } from "@/components/ui/Icon";
import type { ButtonVariant } from "@/components/ui/Button";

export type ExhibitionDetail = {
  icon: IconName;
  label: string;
  value: string;
};

export type ExhibitionButton = {
  label: string;
  href: string;
  style: ButtonVariant;
};

export type CurrentExhibition = {
  id?: string;
  eyebrow: string;
  status: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  level: number;
  paragraphs: string[];
  details: ExhibitionDetail[];
  buttons: ExhibitionButton[];
};

export const currentExhibitionData: CurrentExhibition = {
  eyebrow: "Current Exhibition",
  status: "Now on",
  title: "Archive in Focus",
  subtitle: "Manuscripts and archival records from the museum's collection",
  image: "/images/gallery-floor3-archive.webp",
  alt: "The top-floor gallery: display cases of manuscripts and framed historic photographs around the lantern opening",
  level: 4,
  paragraphs: [
    "On the top floor of the tower, the museum's gallery for temporary and changing exhibitions currently draws on its own archive: manuscripts and archival records that document Ladakh's social, cultural and historical past.",
    "Seen after the objects on the floors below, they add the people, places and events behind the collection, and record how life in Leh and the wider region has changed.",
  ],
  details: [
    {
      icon: "calendar",
      label: "Dates",
      value: "Ongoing",
    },
    {
      icon: "pin",
      label: "Where",
      value: "Level Four · Floor 3",
    },
    {
      icon: "users",
      label: "Curated by",
      value: "The museum team",
    },
    {
      icon: "ticket",
      label: "Entry",
      value: "Included in the museum ticket",
    },
    {
      icon: "clock",
      label: "Hours",
      value: "Summer 10 am to 6 pm · Winter 10 am to 5 pm",
    },
  ],
  buttons: [
    {
      label: "Previous Exhibitions",
      href: "/exhibitions",
      style: "primary",
    },
  ],
  id: "current",
};
