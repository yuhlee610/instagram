import { ILayout } from '@/types/common';
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Instagram',
  description: '',
}

export default function RootLayout({ children }: ILayout) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
