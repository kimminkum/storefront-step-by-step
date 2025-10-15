import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Storefront – Step by Step",
  description: "Incrementally built storefront UI"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" translate="no" suppressHydrationWarning>
      <body>
        <Providers>
          <header className="border-b bg-white">
            <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold">Storefront</h1>
              <nav className="text-sm text-gray-600">/products</nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <footer className="border-t mt-16 py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Storefront
          </footer>
        </Providers>
      </body>
    </html>
  );
}
