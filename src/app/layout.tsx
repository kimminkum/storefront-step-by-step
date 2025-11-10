// src/app/layout.tsx
import "./globals.css";
import Providers from "./providers";
import { Header } from "@/components/Header";
import { ToastContainer } from "@/components/ui/ToastContainer";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" translate="no" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <footer className="border-t mt-16 py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Storefront
          </footer>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
