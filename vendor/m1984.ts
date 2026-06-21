// @ts-nocheck
import {X} from "../runtime.ts";
import {XZs} from "./m1983.ts";
var QZs=X((TOr)=>{Object.defineProperty(TOr,"__esModule",{value:!0});TOr.getToken=v8u;var S8u=XZs(),b8u="https://oauth2.googleapis.com/token",E8u="urn:ietf:params:oauth:grant-type:jwt-bearer",C8u=(e)=>({method:"POST",url:b8u,data:new URLSearchParams({grant_type:E8u,assertion:(0,S8u.getJwsSign)(e)}),responseType:"json",retryConfig:{httpMethodsToRetry:["POST"]}});async function v8u(e){if(!e.transporter)throw Error("No transporter set.");try{let t=C8u(e);return(await e.transporter.request(t)).data}catch(t){let n=t,r=n.response?.data;if(r?.error)n.message=`${r.error}: ${r.error_description}`;throw n}}});
export {QZs};
