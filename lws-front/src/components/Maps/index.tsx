import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';
import './style.scss';

interface Location {
  id_location: number;
  location_name: string;
  latitude: string;
  longitude: string;
}

interface Station {
  id_station: number;
  station_description: string;
  station_mac_address: string;
  location: Location;
}

interface MapsProps {
  data: (Location | Station)[];
  getCoordinates: (dataItem: Location | Station) => { latitude: string, longitude: string };
}

export default function Maps({ data, getCoordinates }: MapsProps) {
    if (data.length === 0) {
      return <h4 className='noData'>
      Localização não cadastrada!
    </h4>
    }
  
    const firstCoordinates = getCoordinates(data[0]);
    const firstLocation: LatLngTuple = [
      Number(firstCoordinates.latitude),
      Number(firstCoordinates.longitude),
    ];
  
    return (
      <MapContainer center={firstLocation} zoom={10} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((item, index) => {
          const coordinates = getCoordinates(item);
          const position: LatLngTuple = [Number(coordinates.latitude), Number(coordinates.longitude)];
          return (
            <Marker key={index} position={position}>
              <Popup>
                {('location' in item) ? item.location.location_name : item.location_name}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    );
  }