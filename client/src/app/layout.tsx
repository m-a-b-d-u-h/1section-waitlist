import type { Metadata } from "next";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "1section — Master How the World Works",
  description:
    "A thinking library of mental models, audio lessons, and knowledge graphs. Learn through interactive maps, connected nodes, short lessons, audio, quizzes, and actions.",
  keywords: [
    "mental models",
    "learning",
    "knowledge graph",
    "cognitive frameworks",
    "interactive learning",
    "thinking library",
  ],
  metadataBase: new URL("https://1section.com"),
  icons: {
    icon: "/favicon.svg",
    apple: "/icon-512x512.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "1section — Master How the World Works",
    description:
      "A thinking library of mental models, audio lessons, and knowledge graphs. Join the waitlist.",
    url: "https://1section.com",
    siteName: "1section",
    type: "website",
    images: [{ url: "/icon-512x512.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "1section — Master How the World Works",
    description:
      "A thinking library of mental models, audio lessons, and knowledge graphs.",
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
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
