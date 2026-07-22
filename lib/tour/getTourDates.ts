import type { TourDate, TourDateStatus } from "./types";
import localTourDates from "@/data/tour-dates.json";

export type TourSource = "google_sheet" | "local";

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell.trim());
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell.trim());
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell.trim());
  if (row.some((value) => value.length > 0)) rows.push(row);

  return rows;
}

function normalizeHeader(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
}

function normalizeStatus(value: string): TourDateStatus | null {
  const key = value.trim().toLowerCase().replace(/[\s-]+/g, "_");

  if (key === "available" || key === "avail") return "available";
  if (key === "sold_out" || key === "soldout") return "sold_out";
  if (key === "over" || key === "past" || key === "ended") return "over";

  return null;
}

function mapSheetRows(rows: string[][]): TourDate[] {
  if (rows.length < 2) return [];

  const headers = rows[0].map(normalizeHeader);
  const indexOf = (names: string[]) =>
    headers.findIndex((header) => names.includes(header));

  const dateIndex = indexOf(["date", "datum"]);
  const venueIndex = indexOf(["venue", "place", "misto", "místo"]);
  const cityIndex = indexOf(["city", "location", "mesto", "město"]);
  const ticketIndex = indexOf([
    "ticketurl",
    "tickets",
    "ticket",
    "url",
    "link",
  ]);
  const statusIndex = indexOf(["status", "stav"]);
  const idIndex = indexOf(["id"]);

  if (dateIndex < 0 || venueIndex < 0 || cityIndex < 0 || statusIndex < 0) {
    return [];
  }

  const shows: TourDate[] = [];

  for (const [index, cells] of rows.slice(1).entries()) {
    const date = cells[dateIndex]?.trim() ?? "";
    const venue = cells[venueIndex]?.trim() ?? "";
    const city = cells[cityIndex]?.trim() ?? "";
    const status = normalizeStatus(cells[statusIndex] ?? "");
    const ticketUrl = ticketIndex >= 0 ? cells[ticketIndex]?.trim() : "";
    const customId = idIndex >= 0 ? cells[idIndex]?.trim() : "";

    if (!date || !venue || !city || !status) continue;

    shows.push({
      id: customId || `${slugify(`${date}-${venue}-${city}`)}-${index + 1}`,
      date,
      venue,
      city,
      ticketUrl: ticketUrl || undefined,
      status,
    });
  }

  return shows;
}

async function fetchGoogleSheetDates(): Promise<TourDate[] | null> {
  const sheetUrl = process.env.TOUR_GOOGLE_SHEET_CSV_URL?.trim();
  if (!sheetUrl) return null;

  const response = await fetch(sheetUrl, {
    next: { revalidate: 300 },
  });

  if (!response.ok) return null;

  const csv = await response.text();
  const shows = mapSheetRows(parseCsv(csv));
  return shows.length ? shows : null;
}

export async function getTourDates(): Promise<{
  dates: TourDate[];
  source: TourSource;
}> {
  try {
    const sheetDates = await fetchGoogleSheetDates();
    if (sheetDates?.length) {
      return { dates: sheetDates, source: "google_sheet" };
    }
  } catch {
    // Fall back to local JSON when the sheet is unavailable.
  }

  return {
    dates: localTourDates as TourDate[],
    source: "local",
  };
}
