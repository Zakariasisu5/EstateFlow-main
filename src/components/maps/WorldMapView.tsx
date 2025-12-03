import { useEffect, useRef, useState } from "react";
import { dummyProperties, Property } from "@/data/dummyProperties";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import PropertySearchBar from "./PropertySearchBar";
import "leaflet/dist/leaflet.css";

const WorldMapView = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamic import of Leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      // Fix for default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      // Initialize the map
      const map = L.map(mapRef.current!, {
        center: [20, 0],
        zoom: 2,
        zoomControl: false,
        maxBounds: [
          [-90, -180],
          [90, 180],
        ],
        maxBoundsViscosity: 1.0,
      });

      mapInstanceRef.current = map;

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Define custom icons
      const customIcon = L.icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(`
          <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 26 16 26s16-15 16-26C32 7.163 24.837 0 16 0z" fill="#4db5ff"/>
            <circle cx="16" cy="16" r="6" fill="white"/>
          </svg>
        `)}`,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42],
      });

      const highlightedIcon = L.icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(`
          <svg width="40" height="52" viewBox="0 0 40 52" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C8.954 0 0 8.954 0 20c0 13.75 20 32.5 20 32.5S40 33.75 40 20C40 8.954 31.046 0 20 0z" fill="#ff4d4d"/>
            <circle cx="20" cy="20" r="8" fill="white"/>
            <circle cx="20" cy="20" r="5" fill="#ff4d4d"/>
          </svg>
        `)}`,
        iconSize: [40, 52],
        iconAnchor: [20, 52],
        popupAnchor: [0, -52],
      });

      // Store icons for later use
      (mapInstanceRef.current as any).customIcon = customIcon;
      (mapInstanceRef.current as any).highlightedIcon = highlightedIcon;

      // Add markers
      dummyProperties.forEach((property) => {
        const marker = L.marker([property.coordinates.lat, property.coordinates.lng], {
          icon: customIcon,
        });

        const popupContent = `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="margin-bottom: 8px; font-size: 14px; font-weight: 600; color: #1f1f3b;">
              ${property.title}
            </h3>
            <p style="margin: 4px 0; font-size: 12px; color: #666;">
              <strong>📍 ${property.city}, ${property.country}</strong>
            </p>
            <p style="margin: 4px 0; font-size: 12px; color: #666;">
              <strong>💰 ${property.price}</strong>
            </p>
            <p style="font-size: 12px; color: #666;">
              🛏️ ${property.bedrooms} beds | 🚿 ${property.bathrooms} baths
            </p>
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.addTo(map);
        markersRef.current.set(property.id, marker);
      });
      // Cleanup
      return () => {
        if (mapInstanceRef.current) {
          markersRef.current.forEach((marker) => marker.remove());
          markersRef.current.clear();
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }).catch((error) => {
      console.error("Error loading Leaflet:", error);
    });
  }, []);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([20, 0], 2);
      setSelectedProperty(null);
      
      // Reset all markers to default icon
      const customIcon = (mapInstanceRef.current as any).customIcon;
      if (customIcon) {
        markersRef.current.forEach(marker => marker.setIcon(customIcon));
      }
    }
  };

  const handlePropertySelect = (property: Property | null) => {
    setSelectedProperty(property);
    
    if (!property || !mapInstanceRef.current) return;

    const customIcon = (mapInstanceRef.current as any).customIcon;
    const highlightedIcon = (mapInstanceRef.current as any).highlightedIcon;

    if (!customIcon || !highlightedIcon) return;

    // Reset all markers and highlight selected
    markersRef.current.forEach((marker, id) => {
      if (id === property.id) {
        marker.setIcon(highlightedIcon);
        marker.openPopup();
      } else {
        marker.setIcon(customIcon);
      }
    });

    // Fly to property location
    mapInstanceRef.current.flyTo([property.coordinates.lat, property.coordinates.lng], 12, {
      duration: 1.5
    });
  };

  return (
    <div className="relative w-full h-screen">
      {/* Search Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-full px-4">
        <PropertySearchBar
          properties={dummyProperties}
          onPropertySelect={handlePropertySelect}
          selectedProperty={selectedProperty}
        />
      </div>

      <div ref={mapRef} className="w-full h-full" />

      {/* Custom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <Button
          onClick={handleZoomIn}
          size="icon"
          className="bg-background hover:bg-background/90 text-primary shadow-lg border border-border"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleZoomOut}
          size="icon"
          className="bg-background hover:bg-background/90 text-primary shadow-lg border border-border"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleResetView}
          size="icon"
          className="bg-background hover:bg-background/90 text-primary shadow-lg border border-border"
          title="Reset View"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Property Count */}
      <div className="absolute bottom-4 left-4 bg-background rounded-lg shadow-lg p-3 z-[1000] border border-border">
        <p className="text-sm font-semibold text-primary">
          🌍 {dummyProperties.length} Properties Worldwide
        </p>
      </div>
    </div>
  );
};

export default WorldMapView;
