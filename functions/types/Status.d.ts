type FColMixed = { type: "geojson", data: GeoJSON.FeatureCollection<GeoJSON.Point> } | null;
interface GeoJSONResponse {
	green: FColMixed;
	yellow: FColMixed;
	red: FColMixed;
}
interface FullStatus {
	[iata: string]: ColoStatus;
}
interface ColoStatus {
	name: string;
	location: StatusLocation;
	status: string;
}
interface StatusLocation {
	lat: number;
	lon: number;
}
interface ColoLocation {
	[iata: string]: {
		iata: string;
		coords: {
			lat: number;
			lng: number;
		}
	}
}