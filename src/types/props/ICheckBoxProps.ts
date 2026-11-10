import { ReactNode } from 'react';

/**
 * Prop interface for reusable CheckBox component.
 * Supports custom styling, check state, animations, and optional labels.
 */
export interface ICheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
  className?: string;
  id?: string;
}

export default ICheckBoxProps;
