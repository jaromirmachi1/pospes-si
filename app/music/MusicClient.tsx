"use client";

import { useMemo, useState } from "react";
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

const YEAR_ANCHORS: Array<{ top: number; left: number }> = [
  { top: 7, left: 5 },
  { top: 32, left: 42 },
  { top: 12, left: 76 },
  { top: 58, left: 9 },
  { top: 50, left: 64 },
  { top: 74, left: 36 },
];

function hashId(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function pinPercentForRelease(
  release: Release,
  anchor: { top: number; left: number },
  indexInYear: number,
  countInYear: number,
): { top: number; left: number } {
  const h = hashId(release.id);
  const safeCount = Math.max(countInYear, 1);
  const angle = (indexInYear / safeCount) * Math.PI * 2 + (h % 360) * 0.017;
  const spread = 5 + (h % 9);
  const dx = Math.cos(angle) * spread;
  const dy = Math.sin(angle) * spread;
  const jitterX = (h % 17) * 0.35 - 2.5;
  const jitterY = ((h >> 4) % 13) * 0.35 - 2;

  let left = anchor.left + dx + jitterX;
  let top = anchor.top + dy + jitterY;
  left = Math.min(86, Math.max(4, left));
  top = Math.min(86, Math.max(8, top));
  return { top, left };
}

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
    --font-minimap: 'Silkscreen', ui-monospace, monospace;
    --ink: #ece8ff;
    --ink-soft: rgba(236, 232, 255, 0.62);
    --ink-muted: rgba(236, 232, 255, 0.42);
    --line: rgba(167, 139, 250, 0.22);
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    min-height: 100%;
    margin: 0;
    background: #05040c;
    color: var(--ink);
  }

  body {
    overflow-x: auto;
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

function groupByYear(items: Release[]): Map<string, Release[]> {
  const map = new Map<string, Release[]>();
  for (const r of items) {
    const y = r.year.slice(0, 4);
    const list = map.get(y) ?? [];
    list.push(r);
    map.set(y, list);
  }
  return map;
}

export default function MusicClient({ releases, source }: MusicClientProps) {
  const [activeReleaseId, setActiveReleaseId] = useState(releases[0]?.id);

  const activeRelease =
    releases.find((r) => r.id === activeReleaseId) ?? releases[0];

  const { pins, yearLabels } = useMemo(() => {
    const byYear = groupByYear(releases);
    const yearsSorted = [...byYear.keys()].sort((a, b) => b.localeCompare(a));

    const yearAnchors: Record<string, { top: number; left: number }> = {};
    yearsSorted.forEach((y, i) => {
      yearAnchors[y] = YEAR_ANCHORS[i % YEAR_ANCHORS.length];
    });

    const labels = yearsSorted.map((year) => ({
      year,
      top: yearAnchors[year].top - 6,
      left: yearAnchors[year].left - 2,
    }));

    const pinList: Array<{
      release: Release;
      top: number;
      left: number;
    }> = [];

    for (const year of yearsSorted) {
      const list = byYear.get(year) ?? [];
      const anchor = yearAnchors[year];
      list.forEach((release, indexInYear) => {
        const { top, left } = pinPercentForRelease(
          release,
          anchor,
          indexInYear,
          list.length,
        );
        pinList.push({ release, top, left });
      });
    }

    return { pins: pinList, yearLabels: labels };
  }, [releases]);

  return (
    <>
      <GlobalStyle />
      <Shell>
        <Ambient aria-hidden />
        <HalftoneMass aria-hidden />
        <Scanlines aria-hidden />

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
          <MapToolbar>
            <HeroTitle>Discography</HeroTitle>
            <HeroCopy>
              {source === "spotify"
                ? "Scroll the map. Hover a cover to preview tracks."
                : "Scroll the map. Hover a release for details."}
            </HeroCopy>
          </MapToolbar>

          <MinimapViewport aria-label="Discography minimap">
            {yearLabels.map(({ year, top, left }) => (
              <YearMarker key={year} style={{ top: `${top}%`, left: `${left}%` }}>
                {year}
              </YearMarker>
            ))}

            {pins.map(({ release, top, left }) => {
              const active = release.id === activeRelease?.id;
              return (
                <MapPin
                  key={release.id}
                  tabIndex={0}
                  style={{ top: `${top}%`, left: `${left}%` }}
                  $active={active}
                  onMouseEnter={() => setActiveReleaseId(release.id)}
                  onFocus={() => setActiveReleaseId(release.id)}
                >
                  <PinCover
                    $gradient={
                      coverGradients[release.shade % coverGradients.length]
                    }
                    $coverUrl={release.coverUrl}
                    aria-hidden
                  />
                  <PinCopy>
                    <PinTitle>{release.title}</PinTitle>
                    <PinKind>{release.type}</PinKind>
                  </PinCopy>
                  {release.spotifyUrl ? (
                    <PinSpotify
                      href={release.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${release.title} on Spotify`}
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={() => setActiveReleaseId(release.id)}
                    >
                      <SiSpotify aria-hidden />
                    </PinSpotify>
                  ) : null}
                </MapPin>
              );
            })}
          </MinimapViewport>
        </Content>

        {activeRelease ? (
          <FloatingDeck aria-live="polite">
            <DeckHeader>
              <DeckTitleLine>
                <span>Now playing</span>
                {activeRelease.spotifyUrl ? (
                  <DeckMiniLink
                    href={activeRelease.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Spotify
                  </DeckMiniLink>
                ) : null}
              </DeckTitleLine>
            </DeckHeader>
            <DeckTrackList>
              {activeRelease.tracks.slice(0, 6).map((track, i) => (
                <DeckTrack key={`${activeRelease.id}-${track.title}`}>
                  <DeckThumb
                    $gradient={
                      coverGradients[activeRelease.shade % coverGradients.length]
                    }
                    $coverUrl={activeRelease.coverUrl}
                  />
                  <DeckTrackName>{track.title}</DeckTrackName>
                  <DeckDuration>{track.duration}</DeckDuration>
                </DeckTrack>
              ))}
            </DeckTrackList>
            <DeckNow>
              <DeckNowTitle>{activeRelease.title}</DeckNowTitle>
              <DeckNowArtist>{activeRelease.artist}</DeckNowArtist>
              <DeckTransport aria-hidden>
                <span>◀</span>
                <span>■</span>
                <span>▶</span>
              </DeckTransport>
            </DeckNow>
          </FloatingDeck>
        ) : null}

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
    radial-gradient(circle at 15% 25%, rgba(60, 80, 140, 0.35), transparent 42%),
    radial-gradient(circle at 85% 20%, rgba(90, 40, 120, 0.25), transparent 38%),
    radial-gradient(circle at 50% 100%, rgba(20, 15, 40, 0.9), #05040c 55%);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.14;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }
`;

const HalftoneMass = styled.div`
  position: fixed;
  right: -8vw;
  top: 8%;
  width: min(68vw, 920px);
  height: min(88vh, 980px);
  z-index: 0;
  pointer-events: none;
  border-radius: 46% 54% 48% 52%;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 1.1px,
    transparent 1.4px
  );
  background-size: 4px 4px;
  opacity: 0.4;
  mask-image: radial-gradient(
    ellipse 65% 75% at 55% 48%,
    #000 38%,
    transparent 72%
  );
  transform: rotate(-6deg);
`;

const Scanlines = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.07;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.5) 2px,
    rgba(0, 0, 0, 0.5) 3px
  );
`;

const TopBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 30;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  gap: 28px;
  padding: 28px 32px 18px;
  background: linear-gradient(
    180deg,
    rgba(5, 4, 12, 0.94) 0%,
    rgba(5, 4, 12, 0.7) 65%,
    rgba(5, 4, 12, 0) 100%
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
    z-index: 25;
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
  z-index: 5;
  width: 100%;
  padding: 0 32px 140px;

  @media (max-width: 900px) {
    padding: 0 18px 200px;
  }
`;

const MapToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0 28px;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(40px, 8vw, 88px);
  font-weight: 500;
  line-height: 0.92;
  letter-spacing: -0.07em;
  text-transform: uppercase;
`;

const HeroCopy = styled.p`
  margin: 0;
  max-width: 320px;
  color: var(--ink-soft);
  font-size: 13px;
  line-height: 1.45;
`;

const MinimapViewport = styled.section`
  position: relative;
  width: 100%;
  min-width: 320px;
  min-height: clamp(2000px, 220vh, 3200px);
  margin-top: 8px;
`;

const YearMarker = styled.div`
  position: absolute;
  z-index: 1;
  font-family: var(--font-minimap);
  font-size: clamp(64px, 14vw, 160px);
  font-weight: 400;
  line-height: 0.85;
  letter-spacing: -0.04em;
  color: rgba(255, 255, 255, 0.52);
  text-shadow:
    0 0 1px rgba(255, 255, 255, 0.35),
    3px 3px 0 rgba(0, 0, 0, 0.35);
  pointer-events: none;
  user-select: none;
`;

const MapPin = styled.article<{ $active?: boolean }>`
  position: absolute;
  z-index: 4;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  max-width: min(340px, 42vw);
  padding: 8px 10px 8px 8px;
  outline: none;
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(255, 255, 255, 0.65)" : "rgba(255, 255, 255, 0.18)"};
  background: ${({ $active }) =>
    $active
      ? "rgba(12, 10, 28, 0.82)"
      : "rgba(8, 7, 20, 0.55)"};
  backdrop-filter: blur(12px);
  box-shadow: ${({ $active }) =>
    $active
      ? "0 18px 40px rgba(0, 0, 0, 0.45)"
      : "0 10px 24px rgba(0, 0, 0, 0.25)"};
  transform: ${({ $active }) => ($active ? "scale(1.03)" : "scale(1)")};
  transform-origin: center left;
  transition:
    border-color 160ms ease,
    background 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(255, 255, 255, 0.55);
    background: rgba(12, 10, 28, 0.78);
    z-index: 8;
  }

  @media (max-width: 640px) {
    max-width: 78vw;
    gap: 8px;
    padding: 6px 8px;
  }
`;

const PinCover = styled.div<{ $gradient: string; $coverUrl?: string }>`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  background: ${({ $gradient, $coverUrl }) =>
    $coverUrl ? `url(${$coverUrl}) center / cover no-repeat` : $gradient};

  @media (max-width: 640px) {
    width: 48px;
    height: 48px;
  }
`;

const PinCopy = styled.div`
  min-width: 0;
  flex: 1;
`;

const PinTitle = styled.h2`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(14px, 2.1vw, 20px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #fff;
`;

const PinKind = styled.p`
  margin: 4px 0 0;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-muted);
`;

const PinSpotify = styled.a`
  flex-shrink: 0;
  display: inline-flex;
  color: rgba(255, 255, 255, 0.85);
  font-size: 18px;
  opacity: 0.85;
  transition: opacity 160ms ease;

  &:hover {
    opacity: 1;
  }
`;

const FloatingDeck = styled.aside`
  position: fixed;
  right: 24px;
  bottom: 96px;
  width: min(320px, calc(100vw - 36px));
  z-index: 40;
  background: #e6e6e6;
  color: #111;
  border: 2px solid #0a0a0a;
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.35);
  font-family: var(--font-display);

  @media (max-width: 900px) {
    right: 14px;
    left: 14px;
    width: auto;
    bottom: 88px;
  }
`;

const DeckHeader = styled.div`
  padding: 10px 12px 0;
  border-bottom: 2px solid #111;
`;

const DeckTitleLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-minimap);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const DeckMiniLink = styled.a`
  color: #111;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

const DeckTrackList = styled.div`
  padding: 8px 8px 0;
  max-height: 220px;
  overflow-y: auto;
`;

const DeckTrack = styled.div`
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
  padding: 6px 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 11px;

  &:last-child {
    border-bottom: none;
  }
`;

const DeckThumb = styled.span<{ $gradient: string; $coverUrl?: string }>`
  width: 26px;
  height: 26px;
  display: inline-block;
  background: ${({ $gradient, $coverUrl }) =>
    $coverUrl ? `url(${$coverUrl}) center / cover no-repeat` : $gradient};
`;

const DeckTrackName = styled.span`
  font-weight: 600;
  line-height: 1.2;
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DeckDuration = styled.span`
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
`;

const DeckNow = styled.div`
  padding: 10px 12px 12px;
  border-top: 2px solid #111;
  background: #f0f0f0;
`;

const DeckNowTitle = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
`;

const DeckNowArtist = styled.p`
  margin: 4px 0 10px;
  font-size: 11px;
  opacity: 0.75;
`;

const DeckTransport = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  font-family: var(--font-minimap);
  font-size: 14px;
  letter-spacing: 0.2em;
  opacity: 0.55;
  user-select: none;
`;

const BottomBar = styled.footer`
  position: relative;
  z-index: 25;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 24px;
  padding: 0 32px 26px;

  @media (max-width: 900px) {
    padding: 0 18px 20px;
    margin-top: 0;
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
