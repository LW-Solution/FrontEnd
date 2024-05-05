export interface ParameterType {
    id_parameter_type: number;
    description: string;
    factor: number;
    offset: number;
    parameter_name: string;
  }
  
  export interface Measurement {
    description: string;
    value: number;
    parameter_type: ParameterType;
  }
  
  export interface AvgParameterValues {
    minValue: number;
    maxValue: number;
    avgValue: number;
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
    id_estacao: Station;
    dailyData: DailyData[];
  }

  export interface DashCardProps {
    med: number;
    min: number;
    max: number;
    title: string;
    onClick: () => void; 
  }