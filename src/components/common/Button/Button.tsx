import React from 'react';
import { IButtonProps } from '../../../types/props/IButtonProps';
import { cn } from '../../../utils/classNames';

/**
 * Reusable Button Component.
 * Supports primary, secondary, outline, danger, and ghost variants.
 * Handles disabled, loading, fullWidth, and icon slots.
 */
export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon,
      fullWidth = false,
      className,
      children,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary:
        'bg-[#5B36F4] text-white hover:bg-[#4C24D4] active:bg-[#3D1BAF] shadow-sm shadow-[#5B36F4]/30',
      secondary:
        'bg-[#F4F0FF] text-[#5B36F4] hover:bg-[#E9E2FF] active:bg-[#D5C7FF]',
      outline:
        'border border-[#5B36F4] text-[#5B36F4] hover:bg-[#F4F0FF] active:bg-[#E9E2FF]',
      danger:
        'bg-[#FF5B5B] text-white hover:bg-[#E04848] active:bg-[#C83838]',
      ghost:
        'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200',
    };

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5 h-8',
      md: 'text-sm px-4 py-2.5 rounded-xl gap-2 h-11',
      lg: 'text-base px-6 py-3.5 rounded-2xl gap-2.5 h-14 font-semibold',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#5B36F4]/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}
        {children && <span>{children}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
