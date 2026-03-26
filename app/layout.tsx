import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Turismo Legal - Assinatura + Crédito Consignado",
  description: "Acesso ilimitado ao Aquática American Park + 250 mil hotéis + Crédito consignado com juros baixos. Planos a partir de R$ 165/mês.",
  openGraph: {
    title: "Turismo Legal",
    description: "Assinatura que transforma a diversão em destinos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
