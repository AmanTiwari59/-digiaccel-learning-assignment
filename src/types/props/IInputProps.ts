import { InputHTMLAttributes, ReactNode } from 'react';

/**
 * Prop interface for reusable Input component.
 * Supports label, leading/trailing icons, error messages, and helper text.
 */
export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  fullWidth?: boolean;
}

export default IInputProps;
