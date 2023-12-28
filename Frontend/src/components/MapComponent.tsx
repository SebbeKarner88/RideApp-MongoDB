import React from 'react';
// @ts-ignore
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// @ts-ignore
const MapComponent = ({ coordinatesList }) => {

    // @ts-ignore
    const polylinePositions = coordinatesList.map(({ latitude, longitude }) => [latitude, longitude]);

    const customIcon = new L.Icon({
        iconUrl: 'https://icon-library.com/images/mountain-bike-icon/mountain-bike-icon-7.jpg',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    return (
        <MapContainer
            center={polylinePositions[0]}
            zoom={13}
            style={{ height: '300px', width: '450px' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {polylinePositions.map((position, index) => (
                <Marker key={index} position={position} icon={customIcon}>
                    <Popup>
                        Point {index + 1}:<br />
                        Latitude: {position[0]}<br />
                        Longitude: {position[1]}
                    </Popup>
                </Marker>
            ))}
            <Polyline positions={polylinePositions} color='red' />
        </MapContainer>
    );
};

export default MapComponent;