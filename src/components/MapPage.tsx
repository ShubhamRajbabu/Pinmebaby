import '../fixLeafletIcon';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import FormPage from './FormPage';
import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api'
import FitBounds from './FitBounds';
import { toast } from 'react-toastify';

const MapPage = () => {
  const allMarkers = useQuery(api.markers.getAllMarkers);
  const deleteMarker = useMutation(api.markers.deleteMarker);
  const [position, setPosition] = useState<[number, number] | null>(null);

  const ClickHandler = ({ onClick }: { onClick: (lat: number, lng: number) => void }) => {
    useMapEvents({
      click(e) {
        onClick(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  const handleDelete = async (id: any) => {
    try {
      console.log(id);
      if (!id) return null;
      const isSuccess = await deleteMarker({ id });
      if (isSuccess) {
        toast("Successfully marker deleted");
      }
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[20.5937, 78.9629]} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler
          onClick={(lat, lng) => {
            console.log('Clicked at:', lat, lng);
            setPosition([lat, lng]);
          }}
        />
        {/* Existing markers */}
        {allMarkers?.map((marker) => (
          <Marker key={marker._id} position={[marker.latitude, marker.longitude]}>
            <Popup>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>{marker.itemName} Spotted</strong>
                  <button
                    onClick={() => handleDelete(marker._id)}
                    style={{
                      marginLeft: '5px',
                      padding: '2px 6px',
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  >
                    Delete
                  </button>
                </div>
                <img src={marker.imageUrl} alt={marker.itemName} style={{ width: '200px', height: '200px', marginTop: '8px' }} />
              </div>
            </Popup>
          </Marker>
        ))}

        {allMarkers && allMarkers.length > 0 && (
          <FitBounds positions={allMarkers.map((m) => [m.latitude, m.longitude])} />
        )}
        {position && <Marker position={position}>
          <Popup>
            <FormPage position={position} onSubmitSuccess={() => setPosition(null)} />
          </Popup>
        </Marker>}
      </MapContainer>
    </div>
  )
}

export default MapPage