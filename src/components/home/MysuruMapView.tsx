"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  ZoomControl,
} from "react-leaflet";
import type { MapMarker } from "@/types";
import {
  MYSURU_CENTER,
  MYSURU_ZOOM,
  mapCorridors,
  mapLandmarks,
} from "@/data/map-landmarks";
import { railwayLandmarkIcon } from "@/data/railway-landmark-icon";

interface MysuruMapViewProps {
  markers: MapMarker[];
  activeMarker: string | null;
  onMarkerHover: (slug: string | null) => void;
}

function createProjectIcon(active: boolean) {
  return L.divIcon({
    className: "asp-map-marker",
    html: `<div class="asp-map-marker-dot${active ? " asp-map-marker-dot--active" : ""}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -12],
  });
}

function createLandmarkIcon(type: "airport" | "city" | "highway" | "railway") {
  const label =
    type === "airport"
      ? "✈"
      : type === "railway"
        ? railwayLandmarkIcon
        : type === "city"
          ? "●"
          : "—";
  return L.divIcon({
    className: "asp-landmark-marker",
    html: `<div class="asp-landmark-marker-dot" data-type="${type}">${label}</div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });
}

function MapResizeFix() {
  const map = useMap();

  useEffect(() => {
    const fixSize = () => map.invalidateSize({ animate: false });
    fixSize();

    const timer = window.setTimeout(fixSize, 150);
    window.addEventListener("resize", fixSize);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", fixSize);
    };
  }, [map]);

  return null;
}

function EnableMapInteraction() {
  const map = useMap();

  useEffect(() => {
    map.dragging.enable();
    map.touchZoom.enable();
    map.scrollWheelZoom.enable();
    map.doubleClickZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
  }, [map]);

  return null;
}

function FitAllMarkers({ markers }: { markers: MapMarker[] }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length === 0) return;

    const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number]));
    mapLandmarks.forEach((landmark) => bounds.extend([landmark.lat, landmark.lng]));

    map.fitBounds(bounds.pad(0.12), { animate: false });
  }, [map, markers]);

  return null;
}

export function MysuruMapView({
  markers,
  activeMarker,
  onMarkerHover,
}: MysuruMapViewProps) {
  const projectIcons = useMemo(() => {
    const icons: Record<string, L.DivIcon> = {};
    markers.forEach((m) => {
      icons[m.projectSlug] = createProjectIcon(activeMarker === m.projectSlug);
    });
    return icons;
  }, [markers, activeMarker]);

  return (
    <MapContainer
      center={MYSURU_CENTER}
      zoom={MYSURU_ZOOM}
      dragging
      touchZoom
      scrollWheelZoom
      doubleClickZoom
      zoomControl={false}
      className="asp-leaflet-map h-full w-full"
      style={{ height: "100%", width: "100%" }}
      aria-label="Interactive OpenStreetMap of Alliance Square projects in Mysuru"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        subdomains={["a", "b", "c"]}
        maxZoom={19}
        minZoom={9}
      />

      {mapCorridors.map((corridor) => (
        <Polyline
          key={corridor.id}
          positions={corridor.path}
          pathOptions={{
            color: "#7B858C",
            weight: 2,
            opacity: 0.45,
            dashArray: "6 8",
          }}
        />
      ))}

      {mapLandmarks.map((landmark) => (
        <Marker
          key={landmark.id}
          position={[landmark.lat, landmark.lng]}
          icon={createLandmarkIcon(landmark.type)}
        >
          <Popup>
            <strong>{landmark.name}</strong>
          </Popup>
        </Marker>
      ))}

      {markers.map((marker) => (
        <Marker
          key={marker.projectSlug}
          position={[marker.lat, marker.lng]}
          icon={projectIcons[marker.projectSlug]}
          eventHandlers={{
            mouseover: () => onMarkerHover(marker.projectSlug),
            click: () => onMarkerHover(marker.projectSlug),
          }}
        >
          <Popup>
            <div className="min-w-[180px]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#00A9E8]">
                Project
              </p>
              <p className="mt-1 text-base font-bold text-[#202124]">{marker.name}</p>
              <p className="mt-1 text-sm font-semibold text-[#202124]">{marker.priceLabel}</p>
              <p className="mt-1 text-xs text-[#7B858C]">{marker.location}</p>
              <Link
                href={`/projects/${marker.projectSlug}`}
                className="mt-3 inline-block text-sm font-semibold text-[#00A9E8] hover:underline"
              >
                View Project →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}

      <ZoomControl position="bottomright" />
      <MapResizeFix />
      <EnableMapInteraction />
      <FitAllMarkers markers={markers} />
    </MapContainer>
  );
}
