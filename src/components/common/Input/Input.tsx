import React from 'react';
import { IInputProps } from '../../../types/props/IInputProps';
import { cn } from '../../../utils/classNames';

/**
 * Reusable Input Component.
 * Supports label, leading icon, trailing icon, error message, and disabled state.
 */
export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      label,
      error,
      helperText,
      leadingIcon,
      trailingIcon,
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-gray-700 tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leadingIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400">
              {leadingIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-12 bg-white text-gray-900 text-sm rounded-xl border border-gray-200 transition-all duration-150 outline-none placeholder:text-gray-400 focus:border-[#5B36F4] focus:ring-2 focus:ring-[#5B36F4]/15 disabled:bg-gray-50 disabled:text-gray-400',
              leadingIcon ? 'pl-10' : 'pl-4',
              trailingIcon ? 'pr-10' : 'pr-4',
              error && 'border-red-400 focus:border-red-500 focus:ring-red-100',
              className
            )}
            {...props}
          />
          {trailingIcon && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-gray-400">
              {trailingIcon}
            </div>
          )}
        </div>
        {error ? (
          <span className="text-xs text-red-500 font-medium">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-gray-400">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
