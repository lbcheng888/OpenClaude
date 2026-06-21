// @ts-nocheck
import {c7r,l7r} from "./m3135.ts";
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {Se,bt} from "./m195.ts";
import {b} from "../runtime.ts";
async function S2d(e){let{McpbManifestSchema:t}=await Promise.resolve().then(() => (c7r(),l7r)),n=t.safeParse(e);if(!n.success){let r=n.error.flatten(),o=[...Object.entries(r.fieldErrors).map(([s,i])=>`${s}: ${i?.join(", ")}`),...r.formErrors||[]].filter(Boolean).join("; ");throw Error(`Invalid manifest: ${o}`)}return n.data}
async function b2d(e){let t;try{t=qt(e)}catch(n){throw Error(`Invalid JSON in manifest.json: ${Se(n)}`)}return S2d(t)}
async function u7r(e){let t=new TextDecoder().decode(e);return b2d(t)}
var YXi=b(()=>{bt();Xt()});
export {S2d,b2d,u7r,YXi};
