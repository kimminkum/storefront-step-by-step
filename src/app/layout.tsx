// src/app/layout.tsx
import "./globals.css";
import Providers from "./providers";
import Link from "next/link";

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
              <Link
                href="/products"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                /products
              </Link>
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
