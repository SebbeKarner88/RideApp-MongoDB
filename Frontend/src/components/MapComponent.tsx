import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ coordinatesList }) => {

    const polylinePositions = coordinatesList.map(({ latitude, longitude }) => [latitude, longitude]);

    const customIcon = new L.Icon({
        iconUrl: 'https://icon-library.com/images/mountain-bike-icon/mountain-bike-icon-7.jpg', // Replace with the path to your custom icon
        iconSize: [32, 32], // Adjust the size of your icon
        iconAnchor: [16, 32], // Adjust the anchor point of your icon
        popupAnchor: [0, -32], // Adjust the popup anchor of your icon
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