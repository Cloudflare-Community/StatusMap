import polyfill from "./Locations.json";
export default async function getStatusAndLocation() : Promise<GeoJSONResponse> {
  const status = await getStatus();
  const locations = (await (await fetch("https://speed.cloudflare.com/locations")).json() as ColoLocation[]).concat(polyfill as ColoLocation[]);
  for(const location of locations) if(status[location.iata]) status[location.iata].location = {lat: location.lat,lon:location.lon,cca2:location.cca2,region:location.region,city:location.city};
  return generateGeoJSON(status);
}

function generateGeoJSON(status : FullStatus) : GeoJSONResponse {
  const features : any = {
    green: { "type": "geojson", data: { type: "FeatureCollection", features: [] } },
    yellow: { "type": "geojson", data: { type: "FeatureCollection", features: [] } },
    red: { "type": "geojson", data: { type: "FeatureCollection", features: [] } }
  };
  for(const [iata, colo] of Object.entries(status)) {
    const feature = { type: "Feature", properties: { description: `<strong>${colo.name}</strong><br/>${colo.status.split("_").map(e => e[0].toUpperCase() + e.substring(1)).join(" ")}<p>` }, geometry: { type: "Point", coordinates: [colo.location.lon, colo.location.lat] } };
    switch(colo.status) {
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
  if(features.green.data.features.length === 0) features.green = null;
  if(features.yellow.data.features.length === 0) features.yellow = null;
  if(features.red.data.features.length === 0) features.red = null;
  return features as GeoJSONResponse;
}

async function getStatus() : Promise<FullStatus> {
  const data = await (await fetch("https://www.cloudflarestatus.com/api/v2/components.json")).json() as any;
  const obj : FullStatus = {};
  for(const colo of data.components.filter((e: any) => e.name.includes("(") && !e.name.includes("BYOIP")) as ColoStatus[]) {
    let split = colo.name.split("-");
    const iata = split[split.length-1].trim().replace("(", "").replace(")", "");
    obj[iata] = {name: colo.name.replace(` -${split[split.length-1]}`, "").trim(), status: colo.status, location: {lat: 0, lon: 0, cca2: "", region: "", city: ""}};
  }
  return obj;
}