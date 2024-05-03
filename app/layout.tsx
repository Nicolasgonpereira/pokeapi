import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokeAPI",
  description: "PikaChu",
};

export default function RootLayout(props:any) {
  return (
    <html lang="pt-BR" className={openSans.className}>
      <body>
        <AppRouterCacheProvider>
          {props.children}
          </AppRouterCacheProvider>
          </body>
    </html>
  );
}
