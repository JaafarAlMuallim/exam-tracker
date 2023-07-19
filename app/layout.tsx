import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exam Tracker",
  description: "KFUPM Exam Tracker for students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"font-serif"} style={{ backgroundColor: "#121826" }}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

//#20293A
