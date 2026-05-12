import { getReleases } from "@/lib/music/getReleases";
import MusicClient from "./MusicClient";

export const revalidate = 3600;

export default async function MusicPage() {
  const { releases, source } = await getReleases();

  return <MusicClient releases={releases} source={source} />;
}
