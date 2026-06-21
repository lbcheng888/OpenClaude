// @ts-nocheck
import {qt,Le,Xt} from "../src/config/0228_encoding.ts";
import {fo} from "./m566.ts";
import {b} from "../runtime.ts";
import {Gp} from "./m567.ts";
function wDl(e){let t=Buffer.from(e,"base64url").toString("utf-8"),n=qt(t);if(!n||typeof n!=="object"||!("version"in n)||n.version!==1)throw Error(`Unsupported work secret version: ${n&&typeof n==="object"&&"version"in n?n.version:"unknown"}`);let r=n;if(typeof r.session_ingress_token!=="string"||r.session_ingress_token.length===0)throw Error("Invalid work secret: missing or empty session_ingress_token");if(typeof r.api_base_url!=="string")throw Error("Invalid work secret: missing api_base_url");return n}
function RDl(e,t){let n=e.includes("localhost")||e.includes("127.0.0.1"),r=n?"ws":"wss",o=n?"v2":"v1",s=e.replace(/^https?:\/\//,"").replace(/\/+$/,"");return`${r}://${s}/${o}/session_ingress/ws/${t}`}
function uxo(e,t){if(e===t)return!0;let n=e.slice(e.lastIndexOf("_")+1),r=t.slice(t.lastIndexOf("_")+1);return n.length>=4&&n===r}
function G8t(e,t){return`${e.replace(/\/+$/,"")}/v1/code/sessions/${t}`}
async function S7n(e,t){let n=await fo.post(`${e}/worker/register`,{},{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json","anthropic-version":"2023-06-01"},timeout:1e4}),r=n.data?.worker_epoch,o=typeof r==="string"?Number(r):r;if(typeof o!=="number"||!Number.isFinite(o)||!Number.isSafeInteger(o))throw Error(`registerWorker: invalid worker_epoch in response: ${Le(n.data)}`);return o}
var b7n=b(()=>{Gp();Xt()});
export {wDl,RDl,uxo,G8t,S7n,b7n};
