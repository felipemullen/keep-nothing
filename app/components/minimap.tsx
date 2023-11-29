'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L, { LatLngExpression, icon } from 'leaflet';

import 'leaflet/dist/leaflet.css';

export interface MinimapProps {
    center: [number, number];
    zoom: number;
}

export default function Minimap({ }: MinimapProps) {
    // Coordinates for the initial map center
    const center = [51.505, -0.09];

    // Icon for the marker (you can use your custom icon)
    const customIcon = new L.Icon({
        iconUrl: 'path-to-your-marker-icon.png',
        iconSize: [32, 32], // Adjust the size as needed
    });

    const position: LatLngExpression = [51.505, -0.09]

    const markerIcon = icon({
        iconUrl: "/images/marker-icon-2x.png",
        iconSize: [20, 32],
    });

    return (
        <div className="h-full w-full">
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: 400, width: "100%" }}>
                <TileLayer
                    // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://carto.com/legal">Carto</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                />
                <Marker icon={markerIcon} position={position} />
            </MapContainer>
        </div>
    );
};
