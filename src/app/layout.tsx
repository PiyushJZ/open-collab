import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import ConvexClientProvider from '@/providers/ConvexClientProvider';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'OpenCollab',
  description: 'Build better products by collaborating',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ConvexClientProvider>
          <Toaster
            richColors
            theme='light'
          />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
