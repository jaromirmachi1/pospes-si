import { getTourDates } from "@/lib/tour/getTourDates";
import TourClient from "./TourClient";

export const revalidate = 300;

export default async function TourPage() {
  const { dates } = await getTourDates();
  return <TourClient dates={dates} />;
}
