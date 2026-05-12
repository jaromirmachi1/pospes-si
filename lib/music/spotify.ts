import type { Release, Track } from "./types";

const DEFAULT_ARTIST_ID = "3iq9MPsGGVkjVqihYEGoIC";
const MARKET = "CZ";
const ALBUMS_PAGE_SIZE = 10;

type SpotifyImage = {
  url: string;
};

type SpotifyArtist = {
  name: string;
};

type SpotifyTrack = {
  name: string;
  duration_ms: number;
  artists: SpotifyArtist[];
};

type SpotifyAlbumSummary = {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  total_tracks: number;
  images: SpotifyImage[];
  external_urls: {
    spotify?: string;
  };
};

type SpotifyAlbumsResponse = {
  items: SpotifyAlbumSummary[];
  next: string | null;
};

type SpotifyAlbumDetails = {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  total_tracks: number;
  images: SpotifyImage[];
  external_urls: {
    spotify?: string;
  };
  artists: SpotifyArtist[];
  tracks: {
    items: SpotifyTrack[];
    next: string | null;
  };
};

type SpotifyTokenResponse = {
  access_token: string;
  expires_in: number;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

function withoutDiacritics(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "");
}

function formatDuration(durationMs: number): string {
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function getReleaseYear(releaseDate: string): string {
  return releaseDate.slice(0, 4);
}

function mapAlbumType(
  albumType: string,
  totalTracks: number,
  title: string,
): string {
  if (albumType === "single") return "Single";
  if (title.toLowerCase().includes("ep") || totalTracks <= 6) return "EP";
  if (albumType === "compilation") return "Compilation";
  return "Album";
}

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return null;
  }

  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
    next: { revalidate: 3000 },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as SpotifyTokenResponse;
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000 - 60_000,
  };

  return data.access_token;
}

async function spotifyRequest<T>(path: string, token: string): Promise<T | null> {
  const response = await fetch(`https://api.spotify.com/v1${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

async function fetchArtistAlbums(
  artistId: string,
  token: string,
): Promise<SpotifyAlbumSummary[]> {
  const albums: SpotifyAlbumSummary[] = [];
  let nextPath: string | null =
    `/artists/${artistId}/albums?include_groups=album,single,compilation&market=${MARKET}&limit=${ALBUMS_PAGE_SIZE}`;

  while (nextPath) {
    const page: SpotifyAlbumsResponse | null = await spotifyRequest<SpotifyAlbumsResponse>(
      nextPath,
      token,
    );
    if (!page) break;

    albums.push(...page.items);
    nextPath = page.next ? page.next.replace("https://api.spotify.com/v1", "") : null;
  }

  const unique = new Map<string, SpotifyAlbumSummary>();
  for (const album of albums) {
    unique.set(album.id, album);
  }

  return [...unique.values()];
}

async function fetchAlbumTracks(
  albumId: string,
  token: string,
): Promise<SpotifyTrack[]> {
  const album = await spotifyRequest<SpotifyAlbumDetails>(
    `/albums/${albumId}?market=${MARKET}`,
    token,
  );

  if (!album) {
    return [];
  }

  const tracks = [...album.tracks.items];
  let nextPath = album.tracks.next
    ? album.tracks.next.replace("https://api.spotify.com/v1", "")
    : null;

  while (nextPath) {
    const page = await spotifyRequest<{
      items: SpotifyTrack[];
      next: string | null;
    }>(nextPath, token);

    if (!page) break;

    tracks.push(...page.items);
    nextPath = page.next ? page.next.replace("https://api.spotify.com/v1", "") : null;
  }

  return tracks;
}

function mapTracks(tracks: SpotifyTrack[]): Track[] {
  return tracks.map((track) => ({
    title: withoutDiacritics(track.name),
    artist: withoutDiacritics(
      track.artists.map((artist) => artist.name).join(" "),
    ),
    duration: formatDuration(track.duration_ms),
  }));
}

export async function fetchSpotifyReleases(): Promise<Release[] | null> {
  const token = await getAccessToken();
  if (!token) {
    return null;
  }

  const artistId = process.env.SPOTIFY_ARTIST_ID ?? DEFAULT_ARTIST_ID;
  const albums = await fetchArtistAlbums(artistId, token);

  if (!albums.length) {
    return null;
  }

  const sortedAlbums = [...albums].sort((left, right) =>
    right.release_date.localeCompare(left.release_date),
  );

  const releases = await Promise.all(
    sortedAlbums.map(async (album, index) => {
      const tracks = await fetchAlbumTracks(album.id, token);
      const title = withoutDiacritics(album.name);

      return {
        id: album.id,
        title,
        type: mapAlbumType(album.album_type, album.total_tracks, title),
        year: getReleaseYear(album.release_date),
        artist: "Cedric",
        shade: index % 5,
        coverUrl: album.images[0]?.url,
        spotifyUrl: album.external_urls.spotify,
        tracks: mapTracks(tracks),
      } satisfies Release;
    }),
  );

  return releases.filter((release) => release.tracks.length > 0);
}
