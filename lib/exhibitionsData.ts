export type ExhibitionItem = {
  id: string;
  slug?: string;
  status: string;
  title: string;
  dates: string;
  where: string;
  curator?: string | null;
  image: string;
  alt: string;
  excerpt: string;
  body: string[];
  now?: boolean;
};

export type ExhibitionsPageData = {
  heading: string;
  page_lead: string;
  items: ExhibitionItem[];
};
