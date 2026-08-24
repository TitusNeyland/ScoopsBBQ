import type { Metadata } from "next";
import { Oswald, Source_Serif_4, Special_Elite } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { withBasePath } from "@/lib/paths";
import "./globals.css";

const display = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const menu = Special_Elite({
  variable: "--font-menu",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "Scoop's BBQ & Catering | Starkville, MS",
    template: "%s | Scoop's BBQ",
  },
  description:
    "Scoop's BBQ & Catering in Starkville, MS — plates, by the pound, fresh off the grill, and catering. Call or text 662-694-0933.",
  icons: {
    icon: withBasePath("/logo.png"),
    apple: withBasePath("/logo.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${menu.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
