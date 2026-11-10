import React, { useRef, useEffect } from 'react';
import { ChevronLeft, Search, X } from 'lucide-react';

interface ISearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  autoFocus?: boolean;
}

/**
 * Search Bar Component.
 * Features back arrow navigation, search icon, clear button, and auto-focus.
 */
export const SearchBar: React.FC<ISearchBarProps> = ({
  value,
  onChange,
  onBack,
  autoFocus = true,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 bg-white sticky top-0 z-20">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back to Dashboard"
        className="p-2 -ml-2 text-gray-700 hover:text-[#5B36F4] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="relative flex-1 flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for a task..."
          className="w-full h-11 bg-gray-50 text-gray-900 text-sm rounded-xl pl-4 pr-10 border border-gray-200 outline-none placeholder:text-gray-400 focus:bg-white focus:border-[#5B36F4] focus:ring-2 focus:ring-[#5B36F4]/15 transition-all"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <Search className="absolute right-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
