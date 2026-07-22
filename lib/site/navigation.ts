import type { IconType } from "react-icons";
import {
  SiApplemusic,
  SiInstagram,
  SiSpotify,
  SiTiktok,
  SiYoutube,
} from "react-icons/si";

export const navItems = [
  { label: "DISCOGRAPHY", href: "/music" },
  { label: "BOOKING", href: "mailto:booking@rychlikluci.cz" },
  { label: "TOUR", href: "/tour" },
  { label: "STORE", href: "https://laflareclub.com/" },
] as const;

export const socialItems: Array<{
  label: string;
  href: string;
  Icon: IconType;
}> = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/intl-es/artist/3iq9MPsGGVkjVqihYEGoIC?si=cGuwT1mzTrukt9ue2MpBvA",
    Icon: SiSpotify,
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/cz/artist/c%C3%A9dric/1507812103",
    Icon: SiApplemusic,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/cedriceffe/",
    Icon: SiInstagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@cedriceffe",
    Icon: SiTiktok,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@rychlikluci",
    Icon: SiYoutube,
  },
];
