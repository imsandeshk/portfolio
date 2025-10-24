import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Shipment } from '@/types/scm';

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface ShipmentMapProps {
  shipment: Shipment;
}

const ShipmentMap: React.FC<ShipmentMapProps> = ({ shipment }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [shipment.origin.coordinates.lat, shipment.origin.coordinates.lng],
        7
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers and layers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // Add origin marker (green)
    const originIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #10b981; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    L.marker([shipment.origin.coordinates.lat, shipment.origin.coordinates.lng], { icon: originIcon })
      .addTo(map)
      .bindPopup(`<b>Origin</b><br>${shipment.origin.address}`);

    // Add destination marker (red)
    const destIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #ef4444; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    L.marker([shipment.destination.coordinates.lat, shipment.destination.coordinates.lng], { icon: destIcon })
      .addTo(map)
      .bindPopup(`<b>Destination</b><br>${shipment.destination.address}`);

    // Add current location marker if available (blue)
    if (shipment.currentLocation) {
      const currentIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: #3b82f6; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); animation: pulse 2s infinite;"></div>
        <style>
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
        </style>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      L.marker([shipment.currentLocation.lat, shipment.currentLocation.lng], { icon: currentIcon })
        .addTo(map)
        .bindPopup('<b>Current Location</b>');
    }

    // Add checkpoint markers
    shipment.checkpoints.forEach((checkpoint, index) => {
      const checkpointIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: #8b5cf6; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">${index + 1}</div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      L.marker([checkpoint.location.coordinates.lat, checkpoint.location.coordinates.lng], { icon: checkpointIcon })
        .addTo(map)
        .bindPopup(`<b>Checkpoint ${index + 1}</b><br>${checkpoint.location.address}<br><small>${checkpoint.timestamp.toLocaleString()}</small>`);
    });

    // Draw route line
    const routePoints: [number, number][] = [
      [shipment.origin.coordinates.lat, shipment.origin.coordinates.lng],
      ...shipment.checkpoints.map(cp => [cp.location.coordinates.lat, cp.location.coordinates.lng] as [number, number]),
    ];

    if (shipment.currentLocation) {
      routePoints.push([shipment.currentLocation.lat, shipment.currentLocation.lng]);
    }

    routePoints.push([shipment.destination.coordinates.lat, shipment.destination.coordinates.lng]);

    L.polyline(routePoints, {
      color: '#3b82f6',
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 5',
    }).addTo(map);

    // Fit bounds to show all markers
    const bounds = L.latLngBounds(routePoints);
    map.fitBounds(bounds, { padding: [50, 50] });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [shipment]);

  return <div ref={mapRef} className="h-[400px] w-full rounded-lg overflow-hidden" />;
};

export default ShipmentMap;
