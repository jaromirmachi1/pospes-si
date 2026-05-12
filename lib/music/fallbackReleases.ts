import type { Release } from "./types";

export const fallbackReleases: Release[] = [
  {
    id: "fallback-pospes-si",
    title: "Pospes si",
    type: "EP",
    year: "2026",
    artist: "Cedric",
    shade: 0,
    tracks: [
      { title: "Dik za pokec", artist: "Cedric", duration: "2:36" },
      { title: "Pospes si", artist: "Cedric", duration: "2:12" },
      { title: "Zaciname snit", artist: "Cedric", duration: "3:01" },
      { title: "Mantra", artist: "Cedric", duration: "2:44" },
      { title: "Outro rychle domu", artist: "Cedric", duration: "1:58" },
    ],
  },
  {
    id: "fallback-nerusit",
    title: "Nerusit",
    type: "Single",
    year: "2025",
    artist: "Cedric",
    shade: 1,
    tracks: [{ title: "Nerusit", artist: "Cedric", duration: "2:27" }],
  },
  {
    id: "fallback-nepozna-se-sama",
    title: "Nepozna se sama",
    type: "Single",
    year: "2025",
    artist: "Cedric",
    shade: 2,
    tracks: [{ title: "Nepozna se sama", artist: "Cedric", duration: "2:58" }],
  },
  {
    id: "fallback-anymoneymoe",
    title: "ANYMONEYMOE",
    type: "Single",
    year: "2024",
    artist: "Cedric",
    shade: 3,
    tracks: [{ title: "ANYMONEYMOE", artist: "Cedric", duration: "2:21" }],
  },
  {
    id: "fallback-perpetua-tapes",
    title: "Perpetua Tapes",
    type: "Album",
    year: "2024",
    artist: "Cedric",
    shade: 4,
    tracks: [
      { title: "Lovesong", artist: "Cedric feat metyou", duration: "3:10" },
      { title: "Private room", artist: "Cedric", duration: "2:46" },
      { title: "Slow call", artist: "Cedric", duration: "2:18" },
    ],
  },
];
