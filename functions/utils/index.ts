import polyfill from "./Locations.json";
import getStatus from "./getStatus";
import generateGeoJSON from "./generateGeoJSON";
export default async function getStatusAndLocation(): Promise<GeoJSONResponse> {
	const status = await getStatus();
	const locations = (await (await fetch("https://speed.cloudflare.com/locations")).json() as ColoLocation[]).concat(polyfill as ColoLocation[]);
	for (const location of locations) {
		if (status[location.iata]) {
			status[location.iata].location = { lat: location.lat, lon: location.lon, cca2: location.cca2, region: location.region, city: location.city };
		}
	}
	return generateGeoJSON(status);
}