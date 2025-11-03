import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      return NextResponse.json(
        { message: "TELEGRAM_BOT_TOKEN is not configured" },
        { status: 500 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const amount = Number(body?.amount ?? 100); // default 100 stars
    const title = String(body?.title ?? "Deposit Stars");
    const description = String(body?.description ?? "Account top-up");
    const payload = String(body?.payload ?? `deposit_${Date.now()}`);

    const params = new URLSearchParams();
    params.set("title", title);
    params.set("description", description);
    params.set("payload", payload);
    params.set("currency", "XTR");
    params.set("prices", JSON.stringify([{ label: title, amount }]));

    const resp = await fetch(
      `https://api.telegram.org/bot${botToken}/createInvoiceLink`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: params.toString(),
        cache: "no-store",
      },
    );

    const data = await resp.json();
    if (!data?.ok) {
      return NextResponse.json(
        { message: data?.description || "Failed to create invoice" },
        { status: 500 },
      );
    }

    return NextResponse.json({ link: data.result });
  } catch (e: any) {
    return NextResponse.json(
      { message: e?.message || "Unexpected error" },
      { status: 500 },
    );
  }
}


