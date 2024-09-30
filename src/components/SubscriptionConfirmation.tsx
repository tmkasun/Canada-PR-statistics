import React from "react";

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-blue-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const SubscriptionSuccessMessage = ({
  email,
  onClose,
}: {
  email: string;
  onClose: () => void;
}) => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <div className="mx-auto w-12">
          <CheckCircleIcon />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Subscription Successful!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for subscribing. We've sent a verification email to:
        </p>
        <p className="mt-1 text-lg font-medium text-blue-600">{email}</p>
      </div>

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <MailIcon />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Please check your inbox and click the verification link to
              complete your subscription.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-center text-sm text-gray-500">
          Didn't receive the email? Check your spam folder or{" "}
          <button
            disabled
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            click here to resend
          </button>
        </p>
      </div>
      <div className="flex justify-center items-center">
        {/* Close */}
        <button
          onClick={onClose}
          className="text-yellow-950 font-bold py-2 px-4 rounded bg-slate-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubscriptionSuccessMessage;
