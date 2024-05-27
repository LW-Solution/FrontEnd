import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';

interface Station {
  id_station: number;
  station_description: string;
  station_mac_address: string;
  location: {
    id_location: number;
    location_name: string;
    latitude: string;
    longitude: string;
  };
}

interface MapsProps {
  station: Station[];
}

export default function Maps({ station }: MapsProps) {
    if (station.length === 0) {
      return <div>Não há estações cadastradas!</div>;
    }
  
    const firstStation: LatLngTuple = [
      Number(station[0].location.latitude),
      Number(station[0].location.longitude),
    ];

  return (
    <MapContainer center={firstStation} zoom={10} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {station.map((s) => (
        <Marker key={s.id_station} position={[Number(s.location.latitude), Number(s.location.longitude)]}>
          <Popup>
            {s.station_description} <br /> {s.location.location_name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}