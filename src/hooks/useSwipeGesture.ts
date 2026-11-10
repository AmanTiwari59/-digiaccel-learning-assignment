import { useState, useRef, TouchEvent } from 'react';

interface SwipeGestureOptions {
  threshold?: number; // Minimum pixels to activate swipe action
  maxOffset?: number; // Max horizontal translation
}

/**
 * Custom hook to detect horizontal swipe gestures on list items.
 * Specifically handles swipe-left to reveal actions (e.g., delete button).
 */
export function useSwipeGesture({
  threshold = 40,
  maxOffset = 80,
}: SwipeGestureOptions = {}) {
  const [offset, setOffset] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const startXRef = useRef<number | null>(null);

  const onTouchStart = (e: TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: TouchEvent) => {
    if (startXRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;

    // We only care about swipe-left (negative diff)
    if (diff < 0) {
      const clampedOffset = Math.max(-maxOffset, diff);
      setOffset(clampedOffset);
    } else if (isOpen && diff > 0) {
      // Swiping back to close
      const clampedOffset = Math.min(0, -maxOffset + diff);
      setOffset(clampedOffset);
    }
  };

  const onTouchEnd = () => {
    if (offset < -threshold) {
      setOffset(-maxOffset);
      setIsOpen(true);
    } else {
      setOffset(0);
      setIsOpen(false);
    }
    startXRef.current = null;
  };

  const closeSwipe = () => {
    setOffset(0);
    setIsOpen(false);
  };

  return {
    offset,
    isOpen,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    closeSwipe,
  };
}

export default useSwipeGesture;
