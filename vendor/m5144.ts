// @ts-nocheck
import {Vs,lT} from "./m2195.ts";
import {Y0r,xM} from "./m1450.ts";
import {isAxiosError} from "./m573.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {prepareApiRequest,NR} from "../src/api/2195_updateSessionTitle.ts";
import {getOauthConfig,Sc} from "../src/api/0465_getOauthConfig.ts";
import {b} from "../runtime.ts";
import {_k} from "../src/core/0576_isCancel.ts";
async function g2l(e){let t;try{t=await Vs.post("/v1/code/github/import-token",{token:e.reveal()},{headers:{"anthropic-beta":Y0r.header},auth:"teleport-org",timeout:15000,validateStatus:()=>!0})}catch(n){if(isAxiosError(n))return logForDebugging(`import-token network error: ${n.code??"unknown"}`,{level:"error"}),{ok:!1,error:{kind:"network"}};return{ok:!1,error:{kind:"not_signed_in"}}}if(!t.ok)return{ok:!1,error:{kind:"not_signed_in"}};if(t.status===200)return{ok:!0,result:t.data};if(t.status===400)return{ok:!1,error:{kind:"invalid_token"}};if(t.status===401)return{ok:!1,error:{kind:"not_signed_in"}};return logForDebugging(`import-token returned ${t.status}`,{level:"error"}),{ok:!1,error:{kind:"server",status:t.status}}}
async function _2l(){try{return await prepareApiRequest(),!0}catch{return!1}}
async function y2l(){try{let e=await Vs.get("/api/oauth/organizations/:orgUUID/sync/github/auth",{auth:"teleport-org",timeout:1e4,validateStatus:()=>!0});if(!e.ok||e.status!==200||!e.data?.is_authenticated)return null;let t=e.data.auth_source;return t==="oauth"||t==="cli_import"?t:null}catch{return null}}
function xJn(){return`${getOauthConfig().CLAUDE_AI_ORIGIN}/code`}
var zDo;
var T2l=b(()=>{xM();Sc();_k();lT();qe();NR();zDo=class zDo{#e;constructor(e){this.#e=e}reveal(){return this.#e}toString(){return"[REDACTED:gh-token]"}toJSON(){return"[REDACTED:gh-token]"}[Symbol.for("nodejs.util.inspect.custom")](){return"[REDACTED:gh-token]"}}});
export {g2l,_2l,y2l,xJn,zDo,T2l};
