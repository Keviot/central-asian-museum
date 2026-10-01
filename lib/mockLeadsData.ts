export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  intent: string;
  status: "unread" | "read";
  date: string;
  message: string;
  createdAt?: string;
}
