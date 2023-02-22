import getStatusAndLocation from "./utils";

const onRequestOptions: PagesFunction = async () => new Response(null, {
	status: 204,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET",
		"Access-Control-Max-Age": "86400",
	}
});

const onRequestGet: PagesFunction<Environment> = async ({ env, waitUntil }) => {
	let status: GeoJSONResponse | null = await env.KV.get("status", { type: "json" });
	if (!status) {
		status = await getStatusAndLocation();
		waitUntil(env.KV.put("status", JSON.stringify(status), { expirationTtl: 60 }));
	}
	return Response.json(status, {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET",
			"Access-Control-Max-Age": "86400",
		}
	});
};
export { onRequestGet, onRequestOptions };