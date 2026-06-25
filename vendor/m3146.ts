// @ts-nocheck
import {GJr,WJr} from "./m3145.ts";
import {qt,tn} from "../src/config/0230_encoding.ts";
import {Ce,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
async function nVd(e){let{McpbManifestSchema:t}=await Promise.resolve().then(() => (GJr(),WJr)),n=t.safeParse(e);if(!n.success){let r=n.error.flatten(),o=[...Object.entries(r.fieldErrors).map(([s,i])=>`${s}: ${i?.join(", ")}`),...r.formErrors||[]].filter(Boolean).join("; ");throw Error(`Invalid manifest: ${o}`)}return n.data}
async function rVd(e){let t;try{t=qt(e)}catch(n){throw Error(`Invalid JSON in manifest.json: ${Ce(n)}`)}return nVd(t)}
async function VJr(e){let t=new TextDecoder().decode(e);return rVd(t)}
var qoa=b(()=>{Ct();tn()});
export {nVd,rVd,VJr,qoa};
