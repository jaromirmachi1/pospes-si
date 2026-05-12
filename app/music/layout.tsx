import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discography | Pospes si zaciname snit",
  description:
    "Discography for Cedric with Spotify synced releases, cover art, and track details.",
};

export default function MusicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link
        href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,700,900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
