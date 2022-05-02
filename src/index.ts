import { Router } from "itty-router";
import getStatusAndLocation from "./Status";
import {html,css,js} from "./mini";

const router = Router();

router.get("/", () => new Response(html, {headers: {"Content-Type": "text/html"}}));
router.get("/style.css", () => new Response(css, {headers: {"Content-Type": "text/css"}}));
router.get("/script.js", () => new Response(js, {headers: {"Content-Type": "application/javascript"}}));
router.get("/cflogo.png", async () => fetch("https://cloudflare.community/images/cflogo.png"));
router.get("/status", async (req: Request, env: Environment) => {
  let status : GeoJSONResponse | null = await env.KV.get("status",{type:"json"});
  if(!status) {
    status = await getStatusAndLocation();
    await env.KV.put("status", JSON.stringify(status), {expirationTtl: 60});
  }
  return new Response(JSON.stringify(status), {headers: {"Content-Type": "application/json"}});
});
router.all("*", () => Response.redirect("https://statusmap.cloudflare.community"));

export default {
  fetch: router.handle
};