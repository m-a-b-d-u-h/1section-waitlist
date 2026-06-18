import type { Metadata } from "next";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/lib/auth-context";
import VisitTracker from "@/components/visit-tracker";

export const metadata: Metadata = {
  title: "1section",
  description:
    "A thinking library of mental models, audio lessons, and knowledge graphs.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "1section",
    description:
      "A thinking library of mental models, audio lessons, and knowledge graphs.",
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
            <VisitTracker />
            {children}
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
