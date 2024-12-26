/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import { Telegram } from "@twa-dev/types";
import { dir } from "i18next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import React from "react";

import { i18nConfig } from "@/i18nConfig";
import { TonClientProvider } from "@/shared/context/tonClientContext";
import { InitWebAppParams } from "@/shared/ui/InitWebAppParams";

import initTranslations from "../i18n";
import { ReactQueryProvider } from "./_providers/ReactQueryProvider";
import TranslationsProvider from "./_providers/TranslationProvider";

import "./globals.css";

import { TonConnectUiProvider } from "./_providers/TonConnectUiProvider";
import { ToasterProvider } from "./_providers/ToasterProvider";

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
            <ToasterProvider>
              <TonClientProvider>
                <InitWebAppParams />
                <ReactQueryProvider>{children}</ReactQueryProvider>
              </TonClientProvider>
            </ToasterProvider>
          </TonConnectUiProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
