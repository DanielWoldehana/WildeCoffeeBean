"use client";

export default function QuantityControls({ quantity, onDecrease, onIncrease, className = "" }) {
  return (
    <div className={`flex items-center justify-between rounded-full border-2 border-[var(--coffee-brown-medium-light)] bg-[var(--coffee-brown-medium-light)] ${className}`}>
      <button
        onClick={onDecrease}
        className="flex h-10 w-10 items-center justify-center rounded-l-full text-[var(--coffee-brown)] transition-colors hover:bg-[var(--coffee-brown-light)] hover:text-white"
        aria-label="Decrease quantity"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>
      <span className="flex flex-1 items-center justify-center gap-1.5 px-4 text-sm font-semibold text-[var(--coffee-brown)]">
        <span>{quantity}</span>
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </span>
      <button
        onClick={onIncrease}
        className="flex h-10 w-10 items-center justify-center rounded-r-full text-[var(--coffee-brown)] transition-colors hover:bg-[var(--coffee-brown-light)] hover:text-white"
        aria-label="Increase quantity"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}

