import { ILayout } from '@/types/common';
import './globals.css'
import { Inter } from 'next/font/google'
import SessionProvider from '@/components/SessionProvider/SessionProvider';
import QueryClientProvider from '../components/QueryClientProvider/QueryClientProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Instagram',
  description: '',
}

export default function RootLayout({ children }: ILayout) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <QueryClientProvider>
            {children}
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
