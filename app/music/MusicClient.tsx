"use client";

import styled, { createGlobalStyle } from "styled-components";
import { SiSpotify } from "react-icons/si";
import { navItems, socialItems } from "@/lib/site/navigation";
import type { Release, ReleaseSource } from "@/lib/music/types";

const coverGradients = [
  "linear-gradient(135deg, #2e1065 0%, #4338ca 52%, #2563eb 100%)",
  "linear-gradient(135deg, #3b0764 0%, #5b21b6 48%, #1d4ed8 100%)",
  "linear-gradient(135deg, #4c1d95 0%, #6366f1 50%, #1e40af 100%)",
  "linear-gradient(135deg, #312e81 0%, #7c3aed 46%, #2563eb 100%)",
  "linear-gradient(135deg, #1e1b4b 0%, #6d28d9 54%, #3b82f6 100%)",
];

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Podium Sharp';
    src: url('/Demo_Fonts%202/Fontspring-DEMO-podiumsharp-5.5.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Podium Sharp';
    src: url('/Demo_Fonts%202/Fontspring-DEMO-podiumsharp-7.10.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  :root {
    --font-display: 'Switzer', sans-serif;
    --font-body: 'Switzer', sans-serif;
    --font-nav: 'Podium Sharp', sans-serif;
    --ink: #ece8ff;
    --ink-soft: rgba(236, 232, 255, 0.62);
    --ink-muted: rgba(236, 232, 255, 0.42);
    --line: rgba(167, 139, 250, 0.22);
    --surface: rgba(76, 29, 149, 0.14);
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    min-height: 100%;
    margin: 0;
    background: #07031a;
    color: var(--ink);
  }

  body {
    overflow-x: hidden;
    font-family: var(--font-body);
  }

  button,
  a {
    font: inherit;
  }
`;

type MusicClientProps = {
  releases: Release[];
  source: ReleaseSource;
};

export default function MusicClient({ releases, source }: MusicClientProps) {
  const yearRange =
    releases.length > 0
      ? `${releases[releases.length - 1]?.year} ${releases[0]?.year}`
      : "2024 2026";

  return (
    <>
      <GlobalStyle />
      <Shell>
        <Ambient aria-hidden />

        <TopBar aria-label="Primary navigation">
          <NavGroup>
            {navItems.map(({ label, href }) => (
              <NavLink
                href={href}
                key={label}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {label}
              </NavLink>
            ))}
          </NavGroup>

          <Brand href="/" aria-label="Pospes si zaciname snit home">
            Pospes si, zaciname snit
          </Brand>

          <NavGroup $align="right">
            {socialItems.map(({ label, href, Icon }) => (
              <SocialIconLink href={href} key={label} aria-label={label}>
                <Icon aria-hidden />
              </SocialIconLink>
            ))}
          </NavGroup>
        </TopBar>

        <MobileTitle>Pospes si, zaciname snit</MobileTitle>

        <Content>
          <Hero>
            <HeroKicker>Release archive {yearRange}</HeroKicker>
            <HeroTitle>Music</HeroTitle>
            <HeroCopy>
              {source === "spotify"
                ? "Discography synced from Spotify with cover art and track lengths."
                : "Release archive for Cedric."}
            </HeroCopy>
          </Hero>

          <ReleaseGrid aria-label="Cedric releases">
            {releases.map((release, index) => (
              <ReleaseCard key={release.id} $featured={index === 0}>
                <Cover
                  $gradient={coverGradients[release.shade % coverGradients.length]}
                  $coverUrl={release.coverUrl}
                >
                  <CoverYear>{release.year}</CoverYear>
                  <CoverType>{release.type}</CoverType>
                </Cover>

                <ReleaseInfo>
                  <ReleaseEyebrow>
                    {release.type} {release.year}
                  </ReleaseEyebrow>
                  <ReleaseTitle>{release.title}</ReleaseTitle>
                  <Artist>{release.artist}</Artist>

                  <TrackList>
                    {release.tracks.map((track, trackIndex) => (
                      <TrackRow key={`${release.id}-${track.title}`}>
                        <TrackNumber>
                          {String(trackIndex + 1).padStart(2, "0")}
                        </TrackNumber>
                        <TrackText>
                          <TrackName>{track.title}</TrackName>
                          <TrackArtist>{track.artist}</TrackArtist>
                        </TrackText>
                        <Duration>{track.duration}</Duration>
                      </TrackRow>
                    ))}
                  </TrackList>

                  {release.spotifyUrl ? (
                    <PlatformRow aria-label={`${release.title} on Spotify`}>
                      <PlatformLink
                        href={release.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${release.title} on Spotify`}
                      >
                        <SiSpotify aria-hidden />
                      </PlatformLink>
                    </PlatformRow>
                  ) : null}
                </ReleaseInfo>
              </ReleaseCard>
            ))}
          </ReleaseGrid>
        </Content>

        <BottomBar>
          <FooterGroup>
            <FooterLink href="#">PRIVACY</FooterLink>
            <FooterLink href="#">TERMS</FooterLink>
            <FooterLink href="#">CONTACT</FooterLink>
          </FooterGroup>

          <Copyright>©2026 CEDRIC</Copyright>

          <FooterGroup $align="right">
            <FooterLink href="#">STREAM</FooterLink>
            <FooterLink href="#">VIDEO</FooterLink>
            <FooterLink href="#">EP</FooterLink>
          </FooterGroup>
        </BottomBar>
      </Shell>
    </>
  );
}

const Shell = styled.main`
  position: relative;
  width: 100%;
  min-height: 100svh;
  isolation: isolate;
`;

const Ambient = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 14% 12%, rgba(124, 58, 237, 0.28), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(37, 99, 235, 0.22), transparent 24%),
    linear-gradient(180deg, #07031a 0%, #12062e 48%, #050818 100%);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.08;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }
`;

const TopBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 3;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  gap: 28px;
  padding: 28px 32px 18px;
  background: linear-gradient(
    180deg,
    rgba(7, 3, 26, 0.92) 0%,
    rgba(7, 3, 26, 0.72) 72%,
    rgba(7, 3, 26, 0) 100%
  );
  backdrop-filter: blur(10px);

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavGroup = styled.nav<{ $align?: "right" }>`
  display: flex;
  justify-content: ${({ $align }) =>
    $align === "right" ? "flex-end" : "flex-start"};
  align-items: center;
  gap: 22px;
`;

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  font-family: var(--font-nav);
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.12em;
  transition: opacity 180ms ease;

  &:hover {
    opacity: 0.6;
  }
`;

const SocialIconLink = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  font-size: 18px;
  line-height: 1;
  transition: opacity 180ms ease;

  &:hover {
    opacity: 0.6;
  }
`;

const Brand = styled.a`
  max-width: min(58vw, 760px);
  color: #fff;
  text-decoration: none;
  text-align: center;
  font-family: var(--font-nav);
  font-weight: 600;
  font-size: clamp(4px, 1.5vw, 14px);
  line-height: 0.88;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  text-wrap: balance;
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.14);
`;

const MobileTitle = styled.p`
  display: none;

  @media (max-width: 900px) {
    position: relative;
    z-index: 2;
    display: block;
    margin: 0;
    padding: 24px 18px 0;
    font-family: var(--font-nav);
    font-size: clamp(34px, 13vw, 72px);
    line-height: 0.88;
    letter-spacing: -0.08em;
    text-align: center;
    text-transform: uppercase;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0 32px 120px;

  @media (max-width: 900px) {
    padding: 0 18px 110px;
  }
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.4fr) minmax(0, 0.8fr);
  align-items: end;
  gap: 24px;
  min-height: 34vh;
  padding: 24px 0 40px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 12px 0 32px;
  }
`;

const HeroKicker = styled.p`
  margin: 0;
  color: rgba(167, 139, 250, 0.42);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(56px, 11vw, 148px);
  font-weight: 400;
  line-height: 0.82;
  letter-spacing: -0.08em;
  text-transform: uppercase;
`;

const HeroCopy = styled.p`
  max-width: 320px;
  margin: 0 0 8px auto;
  color: var(--ink-soft);
  font-size: 13px;
  line-height: 1.45;
  letter-spacing: 0.02em;

  @media (max-width: 960px) {
    margin: 0;
  }
`;

const ReleaseGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 18px;
`;

const ReleaseCard = styled.article<{ $featured?: boolean }>`
  grid-column: span ${({ $featured }) => ($featured ? 7 : 5)};
  display: grid;
  grid-template-columns: ${({ $featured }) => ($featured ? "0.95fr 1.05fr" : "1fr")};
  min-height: ${({ $featured }) => ($featured ? "500px" : "420px")};
  border: 1px solid var(--line);
  background: var(--surface);
  backdrop-filter: blur(14px);

  &:nth-child(3n) {
    transform: translateY(18px);
  }

  @media (max-width: 1160px) {
    grid-column: span 6;
    grid-template-columns: 1fr;
    min-height: auto;
  }

  @media (max-width: 760px) {
    grid-column: 1 / -1;
    transform: none !important;
  }
`;

const Cover = styled.div<{ $gradient: string; $coverUrl?: string }>`
  position: relative;
  min-height: 320px;
  padding: 22px;
  overflow: hidden;
  background: ${({ $gradient, $coverUrl }) =>
    $coverUrl
      ? `linear-gradient(180deg, rgba(7, 3, 26, 0.08) 0%, rgba(7, 3, 26, 0.68) 100%), url(${$coverUrl}) center / cover no-repeat`
      : $gradient};
`;

const CoverYear = styled.span`
  position: relative;
  z-index: 1;
  display: block;
  font-size: 12px;
  letter-spacing: 0.14em;
`;

const CoverType = styled.span`
  position: absolute;
  right: 20px;
  bottom: 18px;
  z-index: 1;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const ReleaseInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 22px;
`;

const ReleaseEyebrow = styled.p`
  margin: 0 0 10px;
  color: var(--ink-muted);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const ReleaseTitle = styled.h2`
  margin: 0;
  font-size: clamp(28px, 4vw, 52px);
  font-weight: 400;
  line-height: 0.86;
  letter-spacing: -0.06em;
  text-transform: uppercase;
`;

const Artist = styled.p`
  margin: 10px 0 24px;
  color: var(--ink-soft);
  font-size: 13px;
`;

const TrackList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const TrackRow = styled.li`
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: start;
  padding: 11px 0;
  border-top: 1px solid var(--line);
`;

const TrackNumber = styled.span`
  color: var(--ink-muted);
  font-size: 11px;
`;

const TrackText = styled.div`
  min-width: 0;
`;

const TrackName = styled.strong`
  display: block;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.15;
`;

const TrackArtist = styled.span`
  display: block;
  margin-top: 4px;
  color: var(--ink-muted);
  font-size: 11px;
`;

const Duration = styled.span`
  color: var(--ink-soft);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
`;

const PlatformRow = styled.nav`
  display: flex;
  gap: 14px;
  margin-top: auto;
  padding-top: 22px;
`;

const PlatformLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--ink);
  font-size: 16px;
  text-decoration: none;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background 180ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(167, 139, 250, 0.5);
    background: rgba(99, 102, 241, 0.14);
  }
`;

const BottomBar = styled.footer`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 24px;
  padding: 0 32px 26px;

  @media (max-width: 900px) {
    padding: 0 18px 20px;
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 14px;
  }
`;

const FooterGroup = styled.nav<{ $align?: "right" }>`
  display: flex;
  justify-content: ${({ $align }) =>
    $align === "right" ? "flex-end" : "flex-start"};
  gap: 18px;

  @media (max-width: 900px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 14px;
  }
`;

const FooterLink = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.14em;

  &:hover {
    opacity: 0.6;
  }
`;

const Copyright = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.14em;
  white-space: nowrap;
`;
