import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, donorName, donorEmail, message } = await req.json();

    const selectedCurrency = currency || "rwf";

    // Minimum amounts per currency
    const minimums: Record<string, number> = {
      rwf: 1000,
      usd: 1,
      eur: 1,
    };

    const minAmount = minimums[selectedCurrency] || 1;

    // Validate amount
    if (!amount || amount < minAmount) {
      return NextResponse.json(
        { error: `Invalid amount. Minimum donation is ${minAmount} ${selectedCurrency.toUpperCase()}` },
        { status: 400 }
      );
    }

    // For currencies with cents (USD, EUR), convert to smallest unit (cents)
    const stripeAmount = ["usd", "eur"].includes(selectedCurrency)
      ? Math.round(amount * 100)
      : amount;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: stripeAmount,
      currency: selectedCurrency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        donorName: donorName || "Anonymous",
        donorEmail: donorEmail || "",
        message: message || "",
        platform: "SheMoves Kigali",
      },
      description: `Donation to SheMoves from ${donorName || "Anonymous"}`,
      receipt_email: donorEmail || undefined,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
