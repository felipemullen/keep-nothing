'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { icon } from 'leaflet';

import 'leaflet/dist/leaflet.css';

export interface MinimapProps {
    center: [number, number];
    zoom: number;
}

export default function Minimap({ center, zoom }: MinimapProps) {
    const markerIcon = icon({
        iconUrl: '/images/marker-icon-2x.png',
        iconSize: [20, 32],
    });

    return (
        <div className="h-full w-full">
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: 400, width: "100%" }}>
                <TileLayer
                    // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://carto.com/legal">Carto</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                />
                <Marker icon={markerIcon} position={center} />
            </MapContainer>
        </div>
    );
};
