export type TourDateStatus = "available" | "sold_out" | "over";

export type TourDate = {
  id: string;
  date: string;
  venue: string;
  city: string;
  /** Use for available shows. Optional when sold_out or over. */
  ticketUrl?: string;
  status: TourDateStatus;
};

export const tourStatusLabel: Record<TourDateStatus, string> = {
  available: "AVAILABLE",
  sold_out: "SOLD OUT",
  over: "OVER",
};
