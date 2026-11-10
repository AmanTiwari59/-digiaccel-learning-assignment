import React from 'react';
import { Check } from 'lucide-react';
import { ICheckBoxProps } from '../../../types/props/ICheckBoxProps';
import { cn } from '../../../utils/classNames';

/**
 * Reusable CheckBox Component matching Figma design.
 * Rounded square with smooth toggle transitions and accessibility attributes.
 */
export const CheckBox: React.FC<ICheckBoxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  className,
  id,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      id={id}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      className={cn(
        'inline-flex items-center gap-3 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#5B36F4]/40 rounded-lg cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div
        className={cn(
          'w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all duration-150 shrink-0',
          checked
            ? 'bg-[#5B36F4] border-[#5B36F4] text-white shadow-sm shadow-[#5B36F4]/20'
            : 'bg-white border-[#B8A1FF]/60 hover:border-[#5B36F4]'
        )}
      >
        {checked && <Check className="w-4 h-4 stroke-[3]" />}
      </div>
      {label && <span className="text-sm text-gray-800 font-medium">{label}</span>}
    </div>
  );
};

export default CheckBox;
