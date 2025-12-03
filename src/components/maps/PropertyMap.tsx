import { useEffect, useRef } from 'react';
import { Property } from '@/data/dummyProperties';
import { MapPin, School, ShoppingBag, Bus } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
  property: Property;
}

const PropertyMap = ({ property }: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Fix Leaflet default marker icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });

    // Create custom icons
    const propertyIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: #ef4444; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const schoolIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    const mallIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: #22c55e; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    const transportIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: #eab308; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Initialize map with OpenStreetMap tiles (no API key needed!)
    const map = L.map(mapRef.current).setView([property.coordinates.lat, property.coordinates.lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add property marker
    L.marker([property.coordinates.lat, property.coordinates.lng], { icon: propertyIcon })
      .addTo(map)
      .bindPopup(`<strong>${property.title}</strong><br>${property.location}`);

    // Add nearby schools
    property.nearbyPlaces.schools.forEach((school) => {
      const schoolCoords: [number, number] = [
        property.coordinates.lat + (Math.random() - 0.5) * 0.02,
        property.coordinates.lng + (Math.random() - 0.5) * 0.02,
      ];
      L.marker(schoolCoords, { icon: schoolIcon })
        .addTo(map)
        .bindPopup(`<strong>School</strong><br>${school}`);
    });

    // Add nearby malls
    property.nearbyPlaces.malls.forEach((mall) => {
      const mallCoords: [number, number] = [
        property.coordinates.lat + (Math.random() - 0.5) * 0.02,
        property.coordinates.lng + (Math.random() - 0.5) * 0.02,
      ];
      L.marker(mallCoords, { icon: mallIcon })
        .addTo(map)
        .bindPopup(`<strong>Shopping</strong><br>${mall}`);
    });

    // Add transport
    property.nearbyPlaces.transport.forEach((transport) => {
      const transportCoords: [number, number] = [
        property.coordinates.lat + (Math.random() - 0.5) * 0.015,
        property.coordinates.lng + (Math.random() - 0.5) * 0.015,
      ];
      L.marker(transportCoords, { icon: transportIcon })
        .addTo(map)
        .bindPopup(`<strong>Transport</strong><br>${transport}`);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [property]);

  return (
    <div className="space-y-4">
      <div ref={mapRef} className="w-full h-96 rounded-xl overflow-hidden shadow-lg" />
      
      <div className="flex items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500" />
          <span>🔴 Property</span>
        </div>
        <div className="flex items-center gap-2">
          <School className="w-4 h-4 text-blue-500" />
          <span>🔵 Schools</span>
        </div>
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-green-500" />
          <span>🟢 Shopping</span>
        </div>
        <div className="flex items-center gap-2">
          <Bus className="w-4 h-4 text-yellow-600" />
          <span>🟡 Transport</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
