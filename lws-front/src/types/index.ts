export interface ToastProps {
    children: string;
    show: boolean;
    toggle: (show: boolean) => void;
    type: string;
  }

