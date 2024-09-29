import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "react-query";

declare global {
  interface Window {
    turnstile: any;
  }
}
const postSubscription = async (subscriptionData: {
  email: string;
  token: string;
  subscriptions: string[];
}) => {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscriptionData),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error);
  }

  return response.json();
};

export default function SubscriptionPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [cfToken, setCfToken] = useState(null);

  const { mutate, error, isError } = useMutation(postSubscription, {
    onSuccess: (data) => {
      console.log("Subscription successful", data);
      //   showNotification("Subscription successful!", "success");
      setIsOpen(false);
    },
  });

  const [email, setEmail] = useState("");
  const [subscriptions, setSubscriptions] = useState<{
    [key: string]: boolean;
  }>({
    expressEntry: true,
    oinp: true,
    bcPnp: true,
    all: true,
  });
  const turnstileRef = useRef(null);
  useEffect(() => {
    let widgetId: null | string = null;
    if (typeof window !== "undefined" && window.turnstile && isOpen) {
      widgetId = window.turnstile.render(turnstileRef.current, {
        callback: (token: any) => {
          setCfToken(token);
          console.log("Turnstile token:", token);
        },
        "error-callback": (error: any) => {
          console.error("Turnstile error:", error);
          setCfToken(null);
        },
        "expired-callback": () => {
          console.error("Turnstile token expired");
          setCfToken(null);
        },
      });
    }
    return () => {
      if (typeof window !== "undefined" && window.turnstile) {
        if (widgetId) {
          window.turnstile.remove(widgetId);
          setCfToken(null);
        }
      }
    };
  }, [isOpen]);

  const handleSubscriptionChange = (event: any) => {
    const { name, checked } = event.target;
    if (name === "all") {
      setSubscriptions({
        expressEntry: checked,
        oinp: checked,
        bcPnp: checked,
        all: checked,
      });
    } else {
      setSubscriptions((prev) => ({
        ...prev,
        [name]: checked,
        all: false,
      }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (cfToken) {
      mutate({
        email,
        token: cfToken,
        subscriptions: Object.keys(subscriptions).filter(
          (key) => subscriptions[key]
        ),
      });
    }
  };
  const isNotSelected = Object.values(subscriptions).every(
    (value) => value === false
  );
  const isDisabled = isNotSelected || !email || !cfToken;
  return (
    <div className="p-4">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Subscribe
      </button>

      {isOpen && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Subscribe</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  placeholder="example@sample.com"
                  autoFocus
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Subscribe to:
                </label>
                {Object.entries({
                  all: "All",
                  expressEntry: "Express Entry Draws",
                  oinp: "OINP Draws",
                  bcPnp: "BC PNP Draws",
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      id={key}
                      name={key}
                      checked={subscriptions[key]}
                      onChange={handleSubscriptionChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={key}
                      className="ml-2 block text-sm text-gray-900"
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>
              {/* https://developers.cloudflare.com/turnstile/troubleshooting/testing/
                1x00000000000000000000AA	Always passes	visible
                2x00000000000000000000AB	Always blocks	visible
                1x00000000000000000000BB	Always passes	invisible
                2x00000000000000000000BB	Always blocks	invisible
                3x00000000000000000000FF	Forces an interactive challenge	visible
              */}
              <div
                ref={turnstileRef}
                className="cf-turnstile"
                data-sitekey="0x4AAAAAAAqMFdMafq55TWNv"
                data-callback="javascriptCallback"
                data-theme="light"
              />
              <button
                disabled={isDisabled}
                type="submit"
                className={`w-full ${
                  isDisabled ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
                }  text-white font-bold py-2 px-4 rounded`}
              >
                Get Notified
              </button>
              {isError && <div className="text-red-500">{`${error}`}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
