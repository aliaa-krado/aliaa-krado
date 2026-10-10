import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description = profile.valueProp;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: `${profile.name} — ${profile.role}`,
  description,
  keywords: [
    "QA Engineer",
    "Quality Assurance",
    "Manual Testing",
    "Functional Testing",
    "Regression Testing",
    "API Testing",
    "Mobile Testing",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

// Runs before paint: applies the saved theme and flags motion support so the
// hero can start hidden without flashing (and stays visible if JS is off).
const bootScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.dataset.theme='light';}catch(e){}if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-ok');})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-screen overflow-x-clip">{children}</body>
    </html>
  );
}
