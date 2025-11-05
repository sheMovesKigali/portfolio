"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckIcon } from "@/components/icons";

function DonateSuccessContent() {
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("RWF");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const amountParam = searchParams.get("amount");
    const currencyParam = searchParams.get("currency");
    const nameParam = searchParams.get("name");
    const emailParam = searchParams.get("email");
    const paymentIntentParam = searchParams.get("payment_intent");

    if (amountParam) setAmount(amountParam);
    if (currencyParam) setCurrency(currencyParam.toUpperCase());
    if (nameParam) setDonorName(decodeURIComponent(nameParam));
    if (emailParam) setDonorEmail(decodeURIComponent(emailParam));

    // Send receipt email if we have all required info and haven't sent it yet
    if (amountParam && emailParam && paymentIntentParam && !emailSent) {
      sendReceiptEmail(
        amountParam,
        currencyParam || 'rwf',
        decodeURIComponent(nameParam || 'Anonymous'),
        decodeURIComponent(emailParam),
        paymentIntentParam
      );
      setEmailSent(true);
    }
  }, [searchParams, emailSent]);

  const sendReceiptEmail = async (
    amt: string,
    curr: string,
    name: string,
    email: string,
    transactionId: string
  ) => {
    try {
      // Convert amount back to original value (Stripe sends in smallest unit for USD/EUR)
      const actualAmount = ['usd', 'eur'].includes(curr.toLowerCase())
        ? parseFloat(amt) / 100
        : parseFloat(amt);

      await fetch('/api/send-donation-receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donorName: name,
          donorEmail: email,
          amount: actualAmount,
          currency: curr,
          transactionId,
        }),
      });
      console.log('Receipt email sent successfully');
    } catch (error) {
      console.error('Failed to send receipt email:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckIcon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Thank You{donorName ? `, ${donorName}` : ""}!</h1>
        <p className="text-white/80 mb-4">
          Your generous donation{amount ? ` of ${parseFloat(amount).toLocaleString()} ${currency}` : ""} has been received successfully.
        </p>
        <p className="text-white/70 text-sm mb-8">
          Your support helps empower women drivers and creates safer transportation in Kigali.
          {donorEmail && " A receipt has been sent to your email."}
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Return to Home
          </Link>
          <Link
            href="/donate"
            className="block w-full border border-white/20 hover:bg-white/5 font-medium py-3 rounded-lg transition-colors"
          >
            Make Another Donation
          </Link>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-white/70">
            Share your support on social media and help us reach more people!
          </p>
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            <a
              href="https://twitter.com/intent/tweet?text=I%20just%20donated%20to%20SheMoves%20Kigali!%20Join%20me%20in%20supporting%20women%20drivers.&url=https://shemoveskigali.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition-colors"
            >
              Share on X
            </a>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://shemoveskigali.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition-colors"
            >
              Share on Facebook
            </a>
            <a
              href="https://www.instagram.com/shemoveskigali?igsh=ZGRtYXE0NGFsZTJp&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition-colors"
            >
              Follow on Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/shemoves-cbc/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition-colors"
            >
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DonateSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckIcon className="w-10 h-10 text-white" />
          </div>
          <p className="text-white/80">Loading...</p>
        </div>
      </div>
    }>
      <DonateSuccessContent />
    </Suspense>
  );
}
