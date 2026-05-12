export type Track = {
  title: string;
  artist: string;
  duration: string;
};

export type Release = {
  id: string;
  title: string;
  type: string;
  year: string;
  artist: string;
  shade: number;
  coverUrl?: string;
  spotifyUrl?: string;
  tracks: Track[];
};

export type ReleaseSource = "spotify" | "fallback";
