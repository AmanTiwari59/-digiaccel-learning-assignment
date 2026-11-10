import React from 'react';
import { Plus } from 'lucide-react';

interface IFloatingAddButtonProps {
  onClick: () => void;
}

/**
 * Floating Add Task Button.
 * Centered fixed action button at the bottom of the screen.
 */
export const FloatingAddButton: React.FC<IFloatingAddButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 inset-x-0 flex justify-center z-40 pointer-events-none">
      <button
        type="button"
        onClick={onClick}
        aria-label="Add New Task"
        className="pointer-events-auto w-14 h-14 bg-[#5B36F4] text-white rounded-full flex items-center justify-center shadow-xl shadow-[#5B36F4]/40 hover:bg-[#4C24D4] active:scale-95 transition-all duration-150 cursor-pointer"
      >
        <Plus className="w-7 h-7 stroke-[2.5]" />
      </button>
    </div>
  );
};

export default FloatingAddButton;
