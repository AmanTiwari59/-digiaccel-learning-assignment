import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'To-Do List App | Digiaccel Assignment',
  description: 'Manage What To Do - SDE-1 Assignment for Digiaccel Learning',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#5B36F4',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex justify-center bg-gray-100 sm:py-6">
        {/* Centered Mobile Frame container matching Figma mobile viewport */}
        <main className="w-full max-w-md min-h-screen sm:min-h-[844px] bg-white sm:rounded-[36px] sm:shadow-2xl sm:border border-gray-200 overflow-hidden flex flex-col relative">
          {children}
        </main>
      </body>
    </html>
  );
}
