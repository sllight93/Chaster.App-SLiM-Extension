// app/layout.tsx
import './styles/globals.sass';
import { ReactNode } from 'react';

export const metadata = {
  title: 'CEF - Chaster Extension Framework',
  description: 'Frontend für Chaster in Next.js',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de">
      <head>
        {/* Chaster default font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* FontAwesome Regular */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/regular.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
