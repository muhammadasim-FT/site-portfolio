import type { Metadata } from "next";
import { Inter, Oswald, Poppins, Syne } from "next/font/google";
import "./globals.css";
import { brandName } from "@/constants/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${brandName} — Software Engineer`,
  description:
    `Personal portfolio of ${brandName}, a software engineer specializing in full-stack development, cloud infrastructure, and API design.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${oswald.variable} ${syne.variable} h-full antialiased`}
    >
      <head>
        {/* hide the intro before first paint for repeat visits / reduced motion */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("lumenis-intro")==="1"||window.matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-skip")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-black">{children}</body>
    </html>
  );
}
