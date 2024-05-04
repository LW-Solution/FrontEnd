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

export interface ILocation {
  id_location: number;
  latitude: string;
  location_name: string;
  longitude: string;
}

export interface IStation {
  id_station: number;
  station_description: string;
  uuid: string | null;
  location: ILocation;
}

export interface IMeasurement {
  data: string;
  value: number;
}

export interface IData {
  id_estacao: IStation;
  measurements: IMeasurement[];
}