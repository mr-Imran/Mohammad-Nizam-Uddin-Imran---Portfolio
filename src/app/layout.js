import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { keyframes } from "@emotion/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mohammad Nizam Uddin Imran - Portfolio",
  description: "Explore technology, web development, programming, gaming, and innovation with Mohammad Nizam Uddin Imran. Read articles and learn something new today.",
  keywords: "Mohammad Nizam Uddin Imran, Imran, Portfolio, Web Development, Programming, Gaming, Innovation, Technology, Nizam Uddin Imran",
  author: "Mohammad Nizam Uddin Imran",
  url: "https://imrann.my.id",  // Replace with your actual URL
  image: "/path/to/image.jpg", // Replace with a relevant image URL
  siteName: "Mohammad Nizam Uddin Imran",
  type: "website",
  robots: "index, follow",
  // Add more SEO configurations as needed
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Mohammad Nizam Uddin Imran - Portfolio</title>
        <meta name="description" content="Explore Mohammad Nizam Uddin Imran's portfolio. Discover articles on technology, web development, programming, gaming, and innovation." />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
