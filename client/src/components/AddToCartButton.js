"use client";

import QuantityControls from "./QuantityControls";

export default function AddToCartButton({ 
  item, 
  quantity, 
  onAdd, 
  onIncrease, 
  onDecrease, 
  disabled = false,
  className = "",
  stopPropagation = false 
}) {
  const handleClick = (e) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    if (!disabled && onAdd) {
      onAdd(item);
    }
  };

  const handleDecrease = (e) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    if (onDecrease) {
      onDecrease(item);
    }
  };

  const handleIncrease = (e) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    if (onIncrease) {
      onIncrease(item);
    }
  };

  if (quantity > 0) {
    return (
      <QuantityControls
        quantity={quantity}
        onDecrease={handleDecrease}
        onIncrease={handleIncrease}
        className={className}
      />
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`rounded-full bg-[var(--lime-green)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--lime-green-dark)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      Add to Cart
    </button>
  );
}

