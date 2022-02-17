declare type GeoJSONResponse = {
  green: GeoJSON.FeatureCollection<GeoJSON.Point> | null,
  yellow: GeoJSON.FeatureCollection<GeoJSON.Point> | null,
  red: GeoJSON.FeatureCollection<GeoJSON.Point> | null
};
declare type FullStatus = {
  [iata: string] : ColoStatus;
};
declare type ColoStatus = {
  name: string;
  location: StatusLocation;
  status: string;
};
declare type StatusLocation = {
  lat: number;
  lon: number;
  cca2: string;
  region: string;
  city: string;
};
declare type ColoLocation = {
  iata: string;
  lat: number;
  lon: number;
  cca2: string;
  region: string;
  city: string;
};