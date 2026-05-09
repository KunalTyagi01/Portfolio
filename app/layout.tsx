import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kunal-tyagi-dev.netlify.app"),
  title: "Kunal Tyagi | Full Stack Developer",
  description:
    "Premium developer portfolio for Kunal Tyagi, a Full Stack Developer specializing in React, TypeScript, Node.js, Golang, cloud-native SaaS, and multi-cloud network analytics.",
  keywords: [
    "Kunal Tyagi",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Golang Developer",
    "Cloud Native SaaS",
    "Multi Cloud Network Analytics",
  ],
  authors: [{ name: "Kunal Tyagi" }],
  creator: "Kunal Tyagi",
  openGraph: {
    title: "Kunal Tyagi | Full Stack Developer",
    description:
      "React, Node.js and Golang developer building cloud-native SaaS, analytics dashboards, and high-performance APIs.",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    try {
      if (globalThis.localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
      }
    } catch (_) {}
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
