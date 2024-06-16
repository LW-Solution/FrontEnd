
export interface Location {
    id_location: number;
    location_name: string;
    latitude: string;
    longitude: string;
  }
  
  export interface Station {
    id_station: number;
    station_description: string;
    station_mac_address: string;
    location: Location;
  }
  
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
  
  export interface AvgParameterValues {
    minValue: number;
    maxValue: number;
    avgValue: number;
    qtdMeasurements: number;
  }
  
  export interface DailyDataEntry {
    date: string;
    hour: string;
    avgParameterValues: {
      [key: string]: AvgParameterValues;
    };
    quantityMeasurements: number;
  }
  
  export interface NewGridDataType {
    id_estacao: Station;
    parameter_types: ParameterType[];
    dailyData: DailyDataEntry[];
  }
  