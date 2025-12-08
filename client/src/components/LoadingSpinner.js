"use client";

export default function LoadingSpinner({ message = "Loading...", className = "" }) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="text-center">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--lime-green)] border-r-transparent"></div>
        <p className="text-[var(--coffee-brown)]">{message}</p>
      </div>
    </div>
  );
}

