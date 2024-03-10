import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar";
import Provider from "../common/Provider"
import { CookiesProvider } from 'next-client-cookies/server';
import toast, { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CAMPAIGN-KART",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">


      <body className={"3xl:px-[20%] 2xl:px-0"}>
        <Provider>

         <Navbar />

          {children}

        </Provider>
        <Toaster position="top-center" toastOptions={{duration: 5000}}
 />



      </body>
    </html>
  );
}
