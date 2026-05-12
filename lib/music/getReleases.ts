import { fallbackReleases } from "./fallbackReleases";
import { fetchSpotifyReleases } from "./spotify";
import type { Release, ReleaseSource } from "./types";

export async function getReleases(): Promise<{
  releases: Release[];
  source: ReleaseSource;
}> {
  try {
    const spotifyReleases = await fetchSpotifyReleases();

    if (spotifyReleases?.length) {
      return {
        releases: spotifyReleases,
        source: "spotify",
      };
    }
  } catch {
    // Fall back to local mock data when Spotify is unavailable.
  }

  return {
    releases: fallbackReleases,
    source: "fallback",
  };
}
