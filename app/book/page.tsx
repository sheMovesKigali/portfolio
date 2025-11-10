"use client";
import { useState } from "react";
import Link from "next/link";
import { ShieldIcon, CheckIcon } from "@/components/icons";

type RideType = "wellness" | "standard" | "scheduled";

export default function BookPage() {
  const [rideType, setRideType] = useState<RideType>("standard");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [rideDate, setRideDate] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [error, setError] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const rideTypes = [
    {
      id: "standard" as RideType,
      name: "Standard Ride",
      code: "RIDE",
      description: "Regular transportation service",
      icon: "🚗",
    },
    {
      id: "wellness" as RideType,
      name: "Wellness Ride",
      code: "WELL",
      description: "Private, confidential transportation for healthcare visits",
      icon: "🏥",
      private: true,
    },
    {
      id: "scheduled" as RideType,
      name: "Scheduled Ride",
      code: "SCHED",
      description: "Book in advance for a specific date and time",
      icon: "📅",
    },
  ];

  const generateBookingCode = (type: RideType) => {
    const prefix = rideTypes.find((r) => r.id === type)?.code || "RIDE";
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${random}`;
  };

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Use reverse geocoding to get address from coordinates
          // Using a free geocoding service (Nominatim)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );

          const data = await response.json();

          if (data.display_name) {
            setPickupLocation(data.display_name);
          } else {
            setPickupLocation(`${latitude}, ${longitude}`);
          }
        } catch (err) {
          console.error("Geocoding error:", err);
          // Fallback to coordinates if geocoding fails
          setPickupLocation(`${latitude}, ${longitude}`);
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLoadingLocation(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Location access denied. Please enable location permissions in your browser.");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setError("Location request timed out.");
            break;
          default:
            setError("An error occurred while getting your location.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Generate booking code
      const code = generateBookingCode(rideType);
      setGeneratedCode(code);

      // Send booking data to API
      const response = await fetch('/api/book-ride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingCode: code,
          rideType,
          pickupLocation,
          dropoffLocation,
          phoneNumber,
          email: email || undefined, // Only send if provided
          rideDate: rideDate || undefined,
          rideTime: rideTime || undefined,
          specialRequests: specialRequests || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process booking');
      }

      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Booking error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process booking. Please try again.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg w-full">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>

            {rideType === "wellness" && (
              <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2 justify-center mb-2">
                  <ShieldIcon className="w-5 h-5 text-amber-500" />
                  <p className="font-semibold text-amber-700 dark:text-amber-400">Private & Confidential</p>
                </div>
                <p className="text-sm text-white/70">
                  Your wellness ride details are encrypted and private
                </p>
              </div>
            )}

            <div className="mb-6 p-6 rounded-xl bg-black/20 border border-white/10">
              <p className="text-sm text-white/70 mb-2">Your Booking Code</p>
              <p className="text-3xl font-bold font-mono tracking-wider text-amber-500 mb-2">
                {generatedCode}
              </p>
              <p className="text-xs text-white/60">
                {rideType === "wellness" ? "Share this code only with your driver" : "Show this code to your driver"}
              </p>
            </div>

            <div className="space-y-3 text-left mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Pickup:</span>
                <span className="font-medium">{pickupLocation}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Dropoff:</span>
                <span className="font-medium">{dropoffLocation}</span>
              </div>
              {rideType === "scheduled" && rideDate && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Date:</span>
                    <span className="font-medium">{rideDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Time:</span>
                    <span className="font-medium">{rideTime}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Contact:</span>
                <span className="font-medium">{phoneNumber}</span>
              </div>
            </div>

            <p className="text-white/80 mb-6 text-sm">
              {email
                ? `A confirmation email has been sent to ${email}. Your driver will contact you shortly.`
                : "Your booking is confirmed. Your driver will contact you shortly at your phone number."}
            </p>

            <div className="flex gap-3">
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 font-medium hover:bg-white/5"
              >
                Go Home
              </Link>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setGeneratedCode("");
                  setPickupLocation("");
                  setDropoffLocation("");
                  setPhoneNumber("");
                  setEmail("");
                  setRideDate("");
                  setRideTime("");
                  setSpecialRequests("");
                  setError("");
                }}
                className="flex-1 inline-flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 font-medium"
              >
                Book Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 px-4 py-2 mb-6">
            <ShieldIcon className="w-5 h-5 text-green-500" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">Safe & Private</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Book Your Ride</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Choose your ride type and we&apos;ll connect you with a trusted woman driver
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Ride Type Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3">Select Ride Type</label>
                  <div className="grid gap-3">
                    {rideTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setRideType(type.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${rideType === type.id
                            ? "border-amber-500 bg-amber-500/10"
                            : "border-white/10 hover:border-white/20"
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{type.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{type.name}</p>
                              {type.private && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400">
                                  Private
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-white/70 mt-1">{type.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wellness Ride Privacy Notice */}
                {rideType === "wellness" && (
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-start gap-3">
                      <ShieldIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm">
                          Privacy Guaranteed
                        </p>
                        <p className="text-xs text-white/70 mt-1">
                          Wellness rides are completely confidential. Your destination and purpose remain private. Only share your booking code with your assigned driver.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location Fields */}
                <div>
                  <label className="block text-sm font-medium mb-2">Pickup Location</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="Enter pickup address or landmark"
                      className="w-full p-3 pr-12 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      disabled={loadingLocation}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Use my current location"
                    >
                      {loadingLocation ? (
                        <svg className="animate-spin h-5 w-5 text-amber-500" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-white/60 mt-1">
                    Click the location icon to use your current location
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Dropoff Location</label>
                  <input
                    type="text"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    placeholder={
                      rideType === "wellness"
                        ? "Your destination (kept private)"
                        : "Enter destination address or landmark"
                    }
                    className="w-full p-3 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                {/* Scheduled Ride DateTime */}
                {rideType === "scheduled" && (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Date</label>
                        <input
                          type="date"
                          value={rideDate}
                          onChange={(e) => setRideDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full p-3 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Time</label>
                        <input
                          type="time"
                          value={rideTime}
                          onChange={(e) => setRideTime(e.target.value)}
                          className="w-full p-3 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Contact Information */}
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+250 7XX XXX XXX"
                    className="w-full p-3 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full p-3 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-xs text-white/60 mt-1">
                    We&apos;ll send your booking confirmation to this email
                  </p>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requirements or preferences..."
                    rows={3}
                    className="w-full p-3 rounded-lg border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>Confirm Booking</>
                  )}
                </button>

                <p className="text-xs text-white/60 text-center">
                  By booking, you agree to our terms of service. No surcharges apply.
                </p>
              </form>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <h3 className="text-xl font-bold mb-4">What to Expect</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80">
                    Instant booking confirmation with unique code
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80">Driver matched within 5 minutes</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80">Real-time SMS updates</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80">Trained women drivers only</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80">24/7 support available</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <h3 className="text-xl font-bold mb-3">Need Help?</h3>
              <p className="text-sm text-white/70 mb-4">
                Our support team is available 24/7 to assist you
              </p>
              <Link
                href="/contact"
                className="block text-center p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 font-semibold hover:bg-amber-500/20 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
