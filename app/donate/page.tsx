"use client";
import { useState } from "react";
import Link from "next/link";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { MoneyIcon, CheckIcon } from "@/components/icons";
import { getStripe } from "@/lib/stripe";

// Checkout Form Component
function CheckoutForm({ amount, currency, donorName, donorEmail }: { amount: number; currency: string; donorName: string; donorEmail: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/donate/success?amount=${amount}&currency=${currency}&name=${encodeURIComponent(donorName)}&email=${encodeURIComponent(donorEmail)}`,
      },
    });

    if (submitError) {
      setError(submitError.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </>
        ) : (
          <>Donate {amount.toLocaleString()} {currency}</>
        )}
      </button>

      <p className="text-xs text-white/60 text-center">
        By donating, you agree to our terms. All donations are tax-deductible where applicable.
      </p>
    </form>
  );
}

type Currency = "RWF" | "USD" | "EUR";

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(50000);
  const [customAmount, setCustomAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("RWF");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const presetAmounts: Record<Currency, number[]> = {
    RWF: [10000, 25000, 50000, 100000, 250000],
    USD: [10, 25, 50, 100, 250],
    EUR: [10, 20, 50, 100, 200],
  };

  const minimumAmounts: Record<Currency, number> = {
    RWF: 1000,
    USD: 1,
    EUR: 1,
  };

  const getAmount = () => {
    if (selectedAmount === "custom") {
      return parseInt(customAmount) || 0;
    }
    return selectedAmount;
  };

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = getAmount();

    if (amount < minimumAmounts[currency]) {
      alert(`Minimum donation is ${minimumAmounts[currency]} ${currency}`);
      return;
    }

    if (!donorName || !donorEmail) {
      alert("Please fill in your name and email");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: currency.toLowerCase(),
          donorName,
          donorEmail,
          message,
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        setLoading(false);
        return;
      }

      setClientSecret(data.clientSecret);
      setShowPayment(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to initialize payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const stripePromise = getStripe();

  const appearance = {
    theme: "night" as const,
    variables: {
      colorPrimary: "#f59e0b",
      colorBackground: "#18181b",
      colorText: "#ffffff",
      colorDanger: "#ef4444",
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      borderRadius: "0.5rem",
    },
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-2 mb-6">
            <MoneyIcon className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">Support Our Mission</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Help Us Empower Women Drivers
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Your donation supports training programs, safety equipment, and financial assistance for women
            entering the transportation industry in Kigali.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Make a Donation</h2>

              {!showPayment ? (
                <form onSubmit={handleProceedToPayment} className="space-y-6">
                  {/* Currency Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Select Currency</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["RWF", "USD", "EUR"] as Currency[]).map((curr) => (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => {
                            setCurrency(curr);
                            setSelectedAmount(presetAmounts[curr][2]); // Set to middle amount
                            setCustomAmount("");
                          }}
                          className={`p-3 rounded-lg border-2 font-semibold transition-all ${currency === curr
                            ? "border-amber-500 bg-amber-500/10 text-amber-500"
                            : "border-white/10 hover:border-white/20"
                            }`}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preset Amounts */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Select Amount ({currency})</label>
                    <div className="grid grid-cols-3 gap-3">
                      {presetAmounts[currency].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setSelectedAmount(amount)}
                          className={`p-4 rounded-lg border-2 font-semibold transition-all ${selectedAmount === amount
                            ? "border-amber-500 bg-amber-500/10 text-amber-500"
                            : "border-white/10 hover:border-white/20"
                            }`}
                        >
                          {amount.toLocaleString()}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setSelectedAmount("custom")}
                        className={`p-4 rounded-lg border-2 font-semibold transition-all ${selectedAmount === "custom"
                          ? "border-amber-500 bg-amber-500/10 text-amber-500"
                          : "border-white/10 hover:border-white/20"
                          }`}
                      >
                        Custom
                      </button>
                    </div>
                  </div>

                  {/* Custom Amount Input */}
                  {selectedAmount === "custom" && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Custom Amount ({currency})</label>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full p-3 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        min={minimumAmounts[currency]}
                        required
                      />
                    </div>
                  )}

                  {/* Donor Information */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full p-3 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full p-3 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share why you're supporting SheMoves..."
                      rows={4}
                      className="w-full p-3 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || getAmount() < minimumAmounts[currency]}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>Proceed to Payment</>
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      <strong>Amount:</strong> {getAmount().toLocaleString()} {currency}
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                      <strong>Donor:</strong> {donorName}
                    </p>
                  </div>

                  {clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                      <CheckoutForm amount={getAmount()} currency={currency} donorName={donorName} donorEmail={donorEmail} />
                    </Elements>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowPayment(false)}
                    className="w-full text-center text-sm text-white/70 hover:text-white"
                  >
                    ← Go back
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Impact Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <h3 className="text-xl font-bold mb-4">Your Impact Fuels Her Journey</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Start the Engine</p>
                    <p className="text-xs text-white/70">Help one woman begin her driver training.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Drive Change</p>
                    <p className="text-xs text-white/70">Empower a survivor to earn her independence</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Keep Her Moving</p>
                    <p className="text-xs text-white/70">Support vehicle maintenance and safety equipment.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Expand the Road Ahead</p>
                    <p className="text-xs text-white/70">Help SheMoves reach more communities.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <h3 className="text-xl font-bold mb-3">Other Ways to Help</h3>
              <div className="space-y-3">
                <Link
                  href="/drive"
                  className="block p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                >
                  <p className="font-semibold text-sm">Become a Driver</p>
                  <p className="text-xs text-white/70">Join our team</p>
                </Link>
                <Link
                  href="/contact"
                  className="block p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                >
                  <p className="font-semibold text-sm">Partner With Us</p>
                  <p className="text-xs text-white/70">Corporate partnerships</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
