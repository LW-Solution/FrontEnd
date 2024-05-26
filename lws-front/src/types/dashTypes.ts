export interface Unit {
  id_unit: number;
  unit: string;
}

export interface ParameterType {
  id_parameter_type: number;
  description: string;
  factor: number;
  offset: number;
  parameter_name: string;
  unit: Unit;
}

export interface Measurement {
  description: string;
  value: number;
  parameter_type: ParameterType;
  unixtime: number;
}

export interface AvgParameterValues {
  minValue: number;
  maxValue: number;
  avgValue: number;
  qtdMeasurements: number;
}

export interface DailyData {
  date: string;
  avgParameterValues: { [key: string]: AvgParameterValues };
  measurements: Measurement[];
  quantityMeasurements: number;
}

export interface Location {
  id_location: number;
  location_name: string;
  latitude: string;
  longitude: string;
}

export interface Station {
  id_station: number;
  station_description: string;
  uuid: null | string;
  location: Location;
}

export interface GridDataType {
  parameter_types: string[];
  id_estacao: Station;
  parameterUnits: { [key: string]: string };
  dailyData: DailyData[];
}

export interface DashCardProps {
  med: number;
  min: number;
  max: number;
  title: string;
  unit: string;
  onClick: () => void; 
}
