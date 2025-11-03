"use client";

import toast from "react-hot-toast";

type Options = {
  amount?: number;
  title?: string;
  description?: string;
  payload?: string;
  invoiceLink?: string;
};

export const useOpenStarsInvoice = () => {
  const openInvoice = async (options?: Options) => {
    try {
      const directLink = options?.invoiceLink || process.env.NEXT_PUBLIC_STARS_INVOICE_LINK;
      let link = directLink as string | undefined;

      if (!link) {
        const res = await fetch("/api/stars/create-invoice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: options?.amount ?? 100,
            title: options?.title ?? "Deposit Stars",
            description: options?.description ?? "Account top-up",
            payload: options?.payload,
          }),
          cache: "no-store",
        });
        if (!res.ok) {
          const error = await res.json().catch(() => ({}));
          toast.error(error?.message || "Failed to create invoice");
          return;
        }
        const data = await res.json();
        link = data?.link;
      }

      if (!link) {
        toast.error("Invoice link is not configured");
        return;
      }

      const tg = (window as any)?.Telegram?.WebApp;
      const version = tg?.version ? parseFloat(String(tg.version)) : 0;

      if (tg?.openInvoice && version >= 7) {
        tg.openInvoice(link, (status: string) => {
          if (status === "paid") {
            toast.success("Payment successful");
          } else if (status === "cancelled") {
            toast("Payment cancelled");
          } else if (status === "failed") {
            toast.error("Payment failed");
          }
        });
        return;
      }

      // Fallback: open invoice link via Telegram if available, otherwise navigate
      if (tg?.openTelegramLink) {
        tg.openTelegramLink(link);
        return;
      }
      window.location.href = link;
    } catch (e) {
      toast.error("Unable to open invoice");
    }
  };

  return openInvoice;
};

