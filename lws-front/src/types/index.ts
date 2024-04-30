export interface ToastProps {
  children: string;
  show: boolean;
  toggle: (show: boolean) => void;
  type: string;
}

export interface User {
  id: number;
  user_name: string;
  email: string;
}

export interface ModalData {
  showModal: boolean;
  userIdToDelete: number | null;
  userToDelete: string | null;
  userEmailToDelete: string | null;
}

export type DeleteStatus = "success" | "error" | "loading" | "fail" | null;
