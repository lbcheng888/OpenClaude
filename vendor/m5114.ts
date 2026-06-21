// @ts-nocheck
import {si,gT} from "./m2190.ts";
import {TRr,g1} from "./m1445.ts";
import {isAxiosError} from "./m567.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {d$,Dw} from "../src/api/2190_updateSessionTitle.ts";
import {getOauthConfig,Dc} from "../src/api/0459_getOauthConfig.ts";
import {b} from "../runtime.ts";
import {ek} from "../src/core/0570_isCancel.ts";
async function UPl(e){let t;try{t=await si.post("/v1/code/github/import-token",{token:e.reveal()},{headers:{"anthropic-beta":TRr.header},auth:"teleport-org",timeout:15000,validateStatus:()=>!0})}catch(n){if(isAxiosError(n))return logForDebugging(`import-token network error: ${n.code??"unknown"}`,{level:"error"}),{ok:!1,error:{kind:"network"}};return{ok:!1,error:{kind:"not_signed_in"}}}if(!t.ok)return{ok:!1,error:{kind:"not_signed_in"}};if(t.status===200)return{ok:!0,result:t.data};if(t.status===400)return{ok:!1,error:{kind:"invalid_token"}};if(t.status===401)return{ok:!1,error:{kind:"not_signed_in"}};return logForDebugging(`import-token returned ${t.status}`,{level:"error"}),{ok:!1,error:{kind:"server",status:t.status}}}
async function $Pl(){try{return await d$(),!0}catch{return!1}}
async function qPl(){try{let e=await si.get("/api/oauth/organizations/:orgUUID/sync/github/auth",{auth:"teleport-org",timeout:1e4,validateStatus:()=>!0});if(!e.ok||e.status!==200||!e.data?.is_authenticated)return null;let t=e.data.auth_source;return t==="oauth"||t==="cli_import"?t:null}catch{return null}}
function B7n(){return`${getOauthConfig().CLAUDE_AI_ORIGIN}/code`}
var Uxo;
var jPl=b(()=>{g1();Dc();ek();gT();qe();Dw();Uxo=class Uxo{#e;constructor(e){this.#e=e}reveal(){return this.#e}toString(){return"[REDACTED:gh-token]"}toJSON(){return"[REDACTED:gh-token]"}[Symbol.for("nodejs.util.inspect.custom")](){return"[REDACTED:gh-token]"}}});
export {UPl,$Pl,qPl,B7n,Uxo,jPl};
