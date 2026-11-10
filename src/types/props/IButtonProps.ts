import { ReactNode, ButtonHTMLAttributes } from 'react';

/**
 * Prop interface for reusable Button component.
 * Supports primary, secondary, danger, and ghost variants with loading state.
 */
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  children?: ReactNode;
}

export default IButtonProps;
