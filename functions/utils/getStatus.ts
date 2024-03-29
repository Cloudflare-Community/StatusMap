interface AtlassianResponse {
	components: {
		name: string;
		status: string;
		group: boolean;
		group_id: string;
	}[]
}

export default async function getStatus(): Promise<FullStatus> {
	const components = (await (await fetch("https://www.cloudflarestatus.com/api/v2/components.json")).json<AtlassianResponse>()).components;
	const obj: FullStatus = {};
	console.log(JSON.stringify(components.map(e => e.name)));
	for (const component of components) {
		// Group ID for CF Services, ignore
		if (component.group || component.group_id === "1km35smx8p41") {
			continue;
		}
		const matches = /([A-Za-z,\s]+)\s+-\s+\(([A-Z]{3})\)/g.exec(component.name);
		// To appease TypeScript. This should never happen.
		if (!matches) {
			continue;
		}
		obj[matches[2]] = { name: matches[1].trim(), status: component.status, location: { lat: 0, lon: 0 } };
	}
	return obj;
}