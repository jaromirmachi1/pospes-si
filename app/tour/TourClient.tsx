"use client";

import styled, { createGlobalStyle } from "styled-components";
import { navItems, socialItems } from "@/lib/site/navigation";
import { tourStatusLabel, type TourDate } from "@/lib/tour/types";

const VIDEO_SRC = "/video/cedric-mantra-iphone-2.mp4";

function TourAction({ show }: { show: TourDate }) {
  if (show.status === "available" && show.ticketUrl) {
    return (
      <TicketLink
        href={show.ticketUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        TICKETS
      </TicketLink>
    );
  }

  return <StatusBadge $status={show.status}>{tourStatusLabel[show.status]}</StatusBadge>;
}

type TourClientProps = {
  dates: TourDate[];
};

export default function TourClient({ dates }: TourClientProps) {
  return (
    <>
      <GlobalStyle />
      <Page>
        <TopBar aria-label="Primary navigation">
          <NavGroup>
            {navItems.map(({ label, href }) => (
              <NavLink
                href={href}
                key={label}
                aria-current={href === "/tour" ? "page" : undefined}
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

        <Main>
          <Hero aria-labelledby="tour-title">
            <HeroVideo
              src={VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <HeroShade aria-hidden />
            <HeroContent>
              <HeroLabel>LIVE / 2026</HeroLabel>
              <Title id="tour-title">CÉDRIC</Title>
              <Campaign>POSPES SI, ZACINAME SNIT</Campaign>
              <TourLabel>TOUR</TourLabel>
            </HeroContent>
          </Hero>

          <TourSection aria-labelledby="dates-title">
            <SectionHeader>
              <SectionTitle id="dates-title">TOUR</SectionTitle>
              <SectionMeta>UPCOMING DATES</SectionMeta>
            </SectionHeader>

            {dates.length > 0 ? (
              <DateList>
                {dates.map((show) => (
                  <DateRow key={show.id} $muted={show.status === "over"}>
                    <DateText>{show.date}</DateText>
                    <Venue>{show.venue}</Venue>
                    <City>{show.city}</City>
                    <TourAction show={show} />
                  </DateRow>
                ))}
              </DateList>
            ) : (
              <EmptyState>
                <EmptyTitle>NO UPCOMING EVENTS</EmptyTitle>
                <EmptyCopy>
                  New live dates will be announced here.
                </EmptyCopy>
                <EmptyBooking href="mailto:booking@rychlikluci.cz">
                  BOOK CÉDRIC
                </EmptyBooking>
              </EmptyState>
            )}
          </TourSection>
        </Main>

        <Footer>
          <FooterBrand>©2026 CÉDRIC</FooterBrand>
          <FooterEmail href="mailto:booking@rychlikluci.cz">
            BOOKING@RYCHLIKLUCI.CZ
          </FooterEmail>
        </Footer>
      </Page>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Podium Sharp";
    src: url("/Demo_Fonts%202/Fontspring-DEMO-podiumsharp-5.5.otf") format("opentype");
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: "Podium Sharp";
    src: url("/Demo_Fonts%202/Fontspring-DEMO-podiumsharp-7.10.otf") format("opentype");
    font-weight: 700;
    font-display: swap;
  }

  * {
    box-sizing: border-box;
  }

  html {
    background: #050505;
  }

  body {
    min-width: 320px;
    min-height: 100%;
    margin: 0;
    background: #050505;
    color: #f2f0ed;
    font-family: "Switzer", "Helvetica Neue", Arial, sans-serif;
  }

  a {
    color: inherit;
  }
`;

const Page = styled.div`
  min-height: 100svh;
  background:
    radial-gradient(circle at 50% 16%, rgba(72, 42, 110, 0.18), transparent 30%),
    #050505;
`;

const TopBar = styled.header`
  position: relative;
  z-index: 4;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  gap: 28px;
  padding: 28px 32px 18px;

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
  font-family: "Podium Sharp", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.12em;
  transition: opacity 180ms ease;

  &:hover,
  &[aria-current="page"] {
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
  font-family: "Podium Sharp", sans-serif;
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
    display: block;
    margin: 0;
    padding: 24px 18px 0;
    font-family: "Podium Sharp", sans-serif;
    font-size: clamp(34px, 13vw, 72px);
    line-height: 0.88;
    letter-spacing: -0.08em;
    text-align: center;
    text-transform: uppercase;
  }
`;

const Main = styled.main`
  padding: 0 4vw;

  @media (max-width: 760px) {
    padding: 0 16px;
  }
`;

const Hero = styled.section`
  position: relative;
  min-height: clamp(420px, 64vw, 760px);
  max-height: calc(100svh - 110px);
  overflow: hidden;
  isolation: isolate;
  background: #100d18;
`;

const HeroVideo = styled.video`
  position: absolute;
  z-index: -3;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.72) contrast(1.08);
`;

const HeroShade = styled.div`
  position: absolute;
  z-index: -2;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(4, 3, 8, 0.8), rgba(4, 3, 8, 0.12) 60%),
    linear-gradient(0deg, rgba(4, 3, 8, 0.58), transparent 55%),
    radial-gradient(circle at 68% 34%, transparent, rgba(4, 3, 8, 0.32));

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.12;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
  }
`;

const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: clamp(24px, 7vw, 110px);
  width: min(640px, 80%);
  transform: translateY(-50%);
  text-transform: uppercase;
`;

const HeroLabel = styled.p`
  margin: 0 0 10px;
  font-size: clamp(10px, 1vw, 13px);
  letter-spacing: 0.24em;
  opacity: 0.7;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(74px, 13vw, 190px);
  font-weight: 900;
  line-height: 0.72;
  letter-spacing: -0.08em;
`;

const Campaign = styled.p`
  margin: 26px 0 0;
  font-size: clamp(18px, 3vw, 44px);
  line-height: 0.9;
  letter-spacing: -0.035em;
`;

const TourLabel = styled.p`
  margin: 10px 0 0;
  color: rgba(230, 220, 255, 0.74);
  font-size: clamp(13px, 1.6vw, 22px);
  letter-spacing: 0.46em;
`;

const TourSection = styled.section`
  padding: clamp(64px, 9vw, 130px) 0;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(242, 240, 237, 0.42);
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: clamp(50px, 9vw, 128px);
  font-weight: 400;
  line-height: 0.75;
  letter-spacing: -0.06em;
`;

const SectionMeta = styled.p`
  margin: 0;
  color: rgba(242, 240, 237, 0.5);
  font-size: 10px;
  letter-spacing: 0.16em;
`;

const DateList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const DateRow = styled.li<{ $muted?: boolean }>`
  display: grid;
  grid-template-columns: 0.8fr 1.8fr 1.4fr auto;
  align-items: center;
  gap: 24px;
  min-height: 86px;
  border-bottom: 1px solid rgba(242, 240, 237, 0.25);
  opacity: ${({ $muted }) => ($muted ? 0.42 : 1)};

  @media (max-width: 700px) {
    grid-template-columns: 1fr auto;
    gap: 6px 18px;
    padding: 18px 0;
  }
`;

const DateText = styled.time`
  font-size: clamp(16px, 2vw, 26px);
`;

const Venue = styled.strong`
  font-size: clamp(18px, 2.3vw, 34px);
  font-weight: 700;
  text-transform: uppercase;
`;

const City = styled.span`
  font-size: clamp(18px, 2.3vw, 34px);
  text-transform: uppercase;
`;

const TicketLink = styled.a`
  padding-bottom: 3px;
  border-bottom: 1px solid currentColor;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-decoration: none;
`;

const StatusBadge = styled.span<{ $status: TourDate["status"] }>`
  font-size: 12px;
  letter-spacing: 0.1em;
  color: ${({ $status }) =>
    $status === "sold_out"
      ? "rgba(255, 170, 170, 0.9)"
      : "rgba(242, 240, 237, 0.55)"};
`;

const EmptyState = styled.div`
  display: grid;
  min-height: 300px;
  grid-template-columns: 1fr auto;
  align-content: center;
  align-items: end;
  gap: 10px 24px;
  border-bottom: 1px solid rgba(242, 240, 237, 0.42);

  @media (max-width: 640px) {
    min-height: 260px;
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

const EmptyTitle = styled.p`
  margin: 0;
  font-size: clamp(28px, 5vw, 72px);
  line-height: 0.9;
  letter-spacing: -0.04em;
`;

const EmptyCopy = styled.p`
  grid-column: 1;
  margin: 0;
  color: rgba(242, 240, 237, 0.56);
  font-size: 13px;
`;

const EmptyBooking = styled.a`
  grid-row: 1 / span 2;
  grid-column: 2;
  padding: 14px 20px;
  border: 1px solid rgba(242, 240, 237, 0.72);
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 0.1em;
  transition:
    color 160ms ease,
    background 160ms ease;

  &:hover {
    background: #f2f0ed;
    color: #050505;
  }

  @media (max-width: 640px) {
    grid-row: auto;
    grid-column: 1;
    width: max-content;
    margin-top: 24px;
  }
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 28px 4vw;
  border-top: 1px solid rgba(242, 240, 237, 0.2);
  color: rgba(242, 240, 237, 0.62);
  font-size: 10px;
  letter-spacing: 0.1em;

  @media (max-width: 700px) {
    flex-direction: column;
    padding: 28px 16px;
  }
`;

const FooterBrand = styled.span``;

const FooterEmail = styled.a`
  text-decoration: none;
`;
