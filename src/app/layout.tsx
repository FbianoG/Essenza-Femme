import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, } from "next/font/google";
import { MyProvider } from "@/context/myProducts";



const montserrat = Montserrat({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Essenza Femme",
  description: "Descubra a beleza refinada com Essenza Femme: uma linha exclusiva de cosméticos femininos, oferecendo produtos de alta qualidade para realçar a sua essência e elegância.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MyProvider>
      <html lang="pt-br">
        <body
          className={montserrat.className}
        >
          {children}
        </body>
      </html>
    </MyProvider>
  );
}
