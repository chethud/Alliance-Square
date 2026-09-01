export interface MapLandmark {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "airport" | "city" | "highway" | "railway";
}

export interface MapCorridor {
  id: string;
  name: string;
  path: [number, number][];
}

/** Mysuru map center and default zoom */
export const MYSURU_CENTER: [number, number] = [12.285, 76.62];
export const MYSURU_ZOOM = 11;
/** Max pan distance from Mysuru center (meters) */
export const MYSURU_MAP_MAX_RADIUS_M = 100_000;

export const mapLandmarks: MapLandmark[] = [
  {
    id: "mysuru-railway-station",
    name: "Mysuru Junction Railway Station",
    lat: 12.3169,
    lng: 76.6422,
    type: "railway",
  },
  {
    id: "mysuru-airport",
    name: "Mysuru Airport",
    lat: 12.231,
    lng: 76.6543,
    type: "airport",
  },
];

/** Approximate major corridor paths for visual context */
export const mapCorridors: MapCorridor[] = [
  {
    id: "bengaluru-mysuru-expressway",
    name: "Bengaluru–Mysuru Expressway (NH-275)",
    path: [
      [12.18, 76.72],
      [12.22, 76.68],
      [12.26, 76.65],
      [12.29, 76.64],
    ],
  },
  {
    id: "hunsur-road",
    name: "Hunsur Road Corridor",
    path: [
      [12.28, 76.64],
      [12.31, 76.61],
      [12.34, 76.58],
      [12.37, 76.55],
    ],
  },
  {
    id: "ring-road",
    name: "Peripheral / Ring Road",
    path: [
      [12.25, 76.62],
      [12.27, 76.66],
      [12.29, 76.68],
      [12.28, 76.64],
    ],
  },
  {
    id: "nanjangud-corridor",
    name: "Mysuru–Nanjangud Corridor",
    path: [
      [12.29, 76.64],
      [12.22, 76.66],
      [12.15, 76.68],
      [12.12, 76.685],
    ],
  },
];
