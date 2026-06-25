// @ts-nocheck
import {Q} from "../runtime.ts";
import {Ksi} from "./m1988.ts";
var zsi=Q((JNr)=>{Object.defineProperty(JNr,"__esModule",{value:!0});JNr.getToken=GXu;var UXu=Ksi(),$Xu="https://oauth2.googleapis.com/token",qXu="urn:ietf:params:oauth:grant-type:jwt-bearer",WXu=(e)=>({method:"POST",url:$Xu,data:new URLSearchParams({grant_type:qXu,assertion:(0,UXu.getJwsSign)(e)}),responseType:"json",retryConfig:{httpMethodsToRetry:["POST"]}});async function GXu(e){if(!e.transporter)throw Error("No transporter set.");try{let t=WXu(e);return(await e.transporter.request(t)).data}catch(t){let n=t,r=n.response?.data;if(r?.error)n.message=`${r.error}: ${r.error_description}`;throw n}}});
export {zsi};
