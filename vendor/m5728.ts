// @ts-nocheck
import {XU,rI} from "../src/config/0586_rI.ts";
import {Vs,lT} from "./m2195.ts";
import {wn,pf} from "../src/config/0693_timestamp.ts";
import {Fb,Ct} from "./m197.ts";
import {qt,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
import {MS} from "./m460.ts";
import {ve} from "./m461.ts";
import {jt} from "./m253.ts";
function Ohc(e){return{skillId:e.id,name:e.name,description:e.description??"",source:e.source??"custom",updatedAt:e.updated_at??null}}
function Lhc(e){return e.enabled!==!1}
async function Fhc(){let e=XU(),t=e?`${Mhc}&entrypoint=${encodeURIComponent(e)}`:Mhc;try{let n=await Vs.get(t,{auth:"teleport-org",timeout:D7m});if(!n.ok)return{success:!1,error:n.reason==="no-auth"?n.detail:n.reason};if(!Array.isArray(n.data?.skills))return wn("warn","skills_sync_list_malformed"),{success:!1,error:"malformed list-skills response"};return{success:!0,skills:n.data.skills.filter(Lhc).map(Ohc)}}catch(n){let{message:r}=Fb(n);return{success:!1,error:r}}}
async function Bhc(e,t){let n=XU(),r=n?`?entrypoint=${encodeURIComponent(n)}`:"";try{let o=await Vs.get(`/api/oauth/organizations/:orgUUID/skills/${encodeURIComponent(e)}/download${r}`,{auth:"teleport-org",timeout:P7m,responseType:"arraybuffer"});if(!o.ok||!o.data)return wn("warn","skills_sync_download_not_ok",{reason:o.ok?"empty_body":o.reason}),!1;let s=Buffer.from(o.data);if(s.length<2||s[0]!==80||s[1]!==75)return wn("warn","skills_sync_download_not_zip",{serverError:L7m(s),bodyLen:s.length}),!1;return await Nhc.writeFile(t,s),!0}catch(o){let{kind:s}=Fb(o);return wn("warn","skills_sync_download_exception",{kind:s}),!1}}
function L7m(e){try{let t=O7m().safeParse(qt(e.toString("utf8",0,2048)));if(t.success)return t.data.error.type??"error_envelope_no_type"}catch{}return"non_json_body"}
var Nhc,D7m=30000,P7m=300000,O7m,Mhc="/api/oauth/organizations/:orgUUID/skills/list-skills?include_wiggle_skills=true";
var Uhc=b(()=>{MS();pf();rI();Ct();tn();lT();Nhc=require("fs/promises"),O7m=ve(()=>jt.object({error:jt.object({type:jt.string().optional()})}))});
export {Ohc,Lhc,Fhc,Bhc,L7m,Nhc,D7m,P7m,O7m,Mhc,Uhc};
