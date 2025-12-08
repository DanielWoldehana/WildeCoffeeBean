"use client";

export default function ErrorDisplay({ message, className = "" }) {
  if (!message) return null;

  return (
    <div className={`rounded-lg bg-red-50 border border-red-200 p-4 text-center ${className}`}>
      <p className="text-red-600">{message}</p>
    </div>
  );
}

