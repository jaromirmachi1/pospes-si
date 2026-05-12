import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music | Pospes si zaciname snit",
  description:
    "Release archive for Cedric with Spotify synced discography and streaming links.",
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
      {children}
    </>
  );
}
