"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect, useCallback } from "react";
import { usePaymentStore } from "@/store/paymentStore";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const {
    createDonation,
    message,
    donation,
    fetchDonations,
    isLoading,
    error,
  } = usePaymentStore();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    text: "",
    amount: "",
  });
  const [isPayPalProcessing, setIsPayPalProcessing] = useState(false);
  const [localError, setLocalError] = useState("");

  const fetchDonationsMemo = useCallback(() => {
    fetchDonations();
  }, [fetchDonations]);

  useEffect(() => {
    fetchDonationsMemo();
  }, [fetchDonationsMemo]);

  const handleApprove = async (data, actions) => {
    setIsPayPalProcessing(true);
    try {
      const details = await actions.order.capture();
      const transactionId = details.id;
      const payerName = details.payer.name.given_name;
      router.push("/SupportUs/complete-order");

      await createDonation(
        formData.email,
        formData.name,
        formData.text,
        formData.amount,
        transactionId
      );
      setFormData({ email: "", name: "", text: "", amount: "" });
    } catch (err) {
      console.error("Error updating donation in database:", err);
      router.push("/SupportUs/cancel-order");
    } finally {
      setIsPayPalProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Support Our Mission
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Your contribution helps us continue our important work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Donation Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Make a Donation</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Amount ($)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={formData.amount}
                  onChange={(e) => {
                    const amount = e.target.value;
                    if (amount >= 0) setFormData({ ...formData, amount });
                  }}
                  min="1"
                  step="0.01"
                  required
                  placeholder="50.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Share why you're supporting us..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="pt-2">
                <PayPalScriptProvider options={{ clientId: "test" }}>
                  <PayPalButtons
                    style={{ 
                      layout: "vertical",
                      color: "blue",
                      shape: "pill",
                      label: "donate",
                      height: 45
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: parseFloat(formData.amount).toFixed(2) || "0.00",
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={handleApprove}
                    onError={(error) => {
                      console.error("PayPal Error:", error);
                      setLocalError("An error occurred during the transaction. Please try again.");
                    }}
                  />
                </PayPalScriptProvider>

                {isPayPalProcessing && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-600">Processing your donation...</span>
                  </div>
                )}
                {localError && (
                  <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg">
                    {localError}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Donations */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Supporters</h2>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600">Loading donations...</p>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                Error: {error}
              </div>
            ) : donation?.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {donation.map((d) => (
                  <li key={d._id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{d.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(d.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="bg-blue-50 px-3 py-1 rounded-full">
                        <span className="font-semibold text-blue-600">${d.amount}</span>
                      </div>
                    </div>
                    {d.text && (
                      <p className="mt-2 text-gray-600 text-sm italic">"{d.text}"</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No donations yet</h3>
                <p className="mt-1 text-sm text-gray-500">Be the first to support our cause!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;