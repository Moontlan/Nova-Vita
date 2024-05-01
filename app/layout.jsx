'use client';
import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "./nav";
import React from 'react';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className='h-full'>
      {(usePathname() !== '/Login' && usePathname() !== '/NursingHome') && <Nav />}
        <div className="h-full">{children}</div>
      </body>
    </html>
  );
}
