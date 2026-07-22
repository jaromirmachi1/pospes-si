import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour | Cédric",
  description:
    "Official Cédric tour dates, concert announcements, ticket information, and booking contact.",
  openGraph: {
    title: "Tour | Cédric",
    description:
      "Official Cédric tour dates, concert announcements, ticket information, and booking contact.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour | Cédric",
    description:
      "Official Cédric tour dates, concert announcements, ticket information, and booking contact.",
  },
};

export default function TourLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link
        href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,900&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
