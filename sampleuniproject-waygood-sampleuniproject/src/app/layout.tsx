import './globals.css';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/context/AppContext';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <AppProvider>
            <Header />
            <main>{children}</main>
            <Toaster />
          </AppProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}