import getStatus from "./getStatus";
import generateGeoJSON from "./generateGeoJSON";
export default async function getStatusAndLocation(): Promise<GeoJSONResponse> {
	const status = await getStatus();
	const locations = await (await fetch("https://staging.cloudflare.manfredi.io/api/pops/_all.json")).json<ColoLocation>();
	for (const location of Object.values(locations)) {
		if (status[location.iata]) {
			status[location.iata].location = { lat: location.coords.lat, lon: location.coords.lng };
		}
	}
	return generateGeoJSON(status);
}