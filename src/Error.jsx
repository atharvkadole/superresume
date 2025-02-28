import React from "react";

const Error = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 py-24">
      <div className="text-center">
        <img
          src="https://illustrations.popsy.co/white/resistance-band.svg"
          alt="Error Illustration"
          className="w-64 mx-auto"
        />
        <p className="text-xl font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-6xl">
          Oops! Page Not Found
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <a
            href="/"
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:bg-indigo-500"
          >
            Go Back Home
          </a>
          <a href="#" className="text-sm font-medium text-gray-900 hover:underline">
            Contact Support →
          </a>
        </div>
      </div>
    </main>
  );
};

export default Error;
