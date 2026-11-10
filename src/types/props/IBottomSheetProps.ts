import { ReactNode } from 'react';

/**
 * Prop interface for reusable BottomSheet / Modal component.
 * Supports smooth slide-up animation, backdrop dismiss, and header title.
 */
export interface IBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
}

export default IBottomSheetProps;
