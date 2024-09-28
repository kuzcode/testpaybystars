import { dir } from "i18next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { i18nConfig } from "@/i18nConfig";
import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import { ReactQueryProvider } from "./_providers/ReactQueryProvider";
import TranslationsProvider from "./_providers/TranslationProvider";
import { Telegram } from "@twa-dev/types";
import initTranslations from "../i18n";
import "./globals.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { TonConnectUiProvider } from "./_providers/TonConnectUiProvider";

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Match",
  description: "Match Telegram Mini App",
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  const i18nNamespaces = ["common"];

  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={inter.className}>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />

        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <TonConnectUiProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </TonConnectUiProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
