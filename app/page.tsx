"use client";

import styled, { createGlobalStyle } from "styled-components";
import { navItems, socialItems } from "@/lib/site/navigation";

const VIDEO_SRC = "/video/cedric-mantra-iphone-2.mp4";

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
    --font-display: 'Podium Sharp', sans-serif;
    --font-body: 'Podium Sharp', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    min-height: 100%;
    margin: 0;
    background: #000;
    color: #fff;
  }

  body {
    overflow: hidden;
    font-family: var(--font-body);
  }

  button,
  a {
    font: inherit;
  }
`;

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <Shell>
        <BackgroundVideo
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <Film />

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

          <Brand href="#" aria-label="Pospěš si, začínáme snít home">
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

        <MobileTitle>Pospěš si, začínáme snít</MobileTitle>

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
  width: 100vw;
  height: 100svh;
  min-height: 100vh;
  isolation: isolate;
  overflow: hidden;
  background: #000;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  inset: 0;
  z-index: -3;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
  transform-origin: center center;
`;

const Film = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background:
    radial-gradient(
      circle at 50% 45%,
      transparent 0 38%,
      rgba(0, 0, 0, 0.45) 100%
    ),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.38),
      transparent 24%,
      transparent 70%,
      rgba(0, 0, 0, 0.5)
    );

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.12;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }
`;

const TopBar = styled.header`
  position: absolute;
  top: 28px;
  left: 32px;
  right: 32px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  gap: 28px;
  z-index: 2;

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
  font-family: var(--font-display);
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

const Brand = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  max-width: min(58vw, 760px);
  color: #fff;
  text-decoration: none;
  text-align: center;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(4px, 1.5vw, 14px);
  line-height: 0.88;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  text-wrap: balance;
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.14);
`;

const MobileTitle = styled.h1`
  display: none;

  @media (max-width: 900px) {
    position: absolute;
    top: 24px;
    left: 18px;
    right: 18px;
    display: block;
    margin: 0;
    z-index: 2;
    font-family: var(--font-display);
    font-size: clamp(34px, 13vw, 72px);
    line-height: 0.88;
    letter-spacing: -0.08em;
    text-align: center;
    text-transform: uppercase;
  }
`;

const BottomBar = styled.footer`
  position: absolute;
  left: 32px;
  right: 32px;
  bottom: 26px;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 24px;

  @media (max-width: 900px) {
    left: 18px;
    right: 18px;
    bottom: 20px;
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
