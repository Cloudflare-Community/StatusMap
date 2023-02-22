export default function generateGeoJSON(status: FullStatus): GeoJSONResponse {
	const features: Record<string, { type: "geojson", data: GeoJSON.FeatureCollection }> = {
		green: { type: "geojson", data: { type: "FeatureCollection", features: [] } },
		yellow: { type: "geojson", data: { type: "FeatureCollection", features: [] } },
		red: { type: "geojson", data: { type: "FeatureCollection", features: [] } }
	};
	for (const [, colo] of Object.entries(status)) {
		const feature: GeoJSON.Feature = { type: "Feature", properties: { description: `<strong>${colo.name}</strong><br/>${colo.status.split("_").map(e => e[0].toUpperCase() + e.substring(1)).join(" ")}<p>` }, geometry: { type: "Point", coordinates: [colo.location.lon, colo.location.lat] } };
		switch (colo.status) {
			case "operational":
				features.green.data.features.push(feature);
				break;
			case "under_maintenance":
			case "partial_outage":
				features.yellow.data.features.push(feature);
				break;
			case "major_outage":
				features.red.data.features.push(feature);
		}
	}
	return {
		green: features.green.data.features.length > 0 ? features.green : undefined,
		yellow: features.yellow.data.features.length > 0 ? features.yellow : undefined,
		red: features.red.data.features.length > 0 ? features.red : undefined
	} as GeoJSONResponse;
}