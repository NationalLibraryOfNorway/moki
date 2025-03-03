import './globals.css';
import {ReactNode} from 'react';
import {ThemeProvider} from "@/components/features/theme-provider";
import Header from "@/components/features/header";
import {Metadata} from "next";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Moki',
  description: 'Sjekk status på objekter i produksjonsløyper',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex-flex-col">
              <Header/>
              <main className="grow w-10/12 mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}