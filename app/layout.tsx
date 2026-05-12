import type { Metadata } from 'next'
import StyledComponentsRegistry from './registry'

export const metadata: Metadata = {
  title: 'Pospěš si, začínáme snít',
  description: 'Experimental EP landing experience.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
