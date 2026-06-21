// @ts-nocheck
import {k2,xH} from "../src/config/0580_xH.ts";
import {si,gT} from "./m2190.ts";
import {kn,SA} from "../src/config/0689_timestamp.ts";
import {Lb,bt} from "./m195.ts";
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
import {iv} from "./m454.ts";
import {we} from "./m455.ts";
import {hn} from "./m251.ts";
function Wic(e){return{skillId:e.id,name:e.name,description:e.description??"",source:e.source??"custom",updatedAt:e.updated_at??null}}
function Gic(e){return e.enabled!==!1}
async function zic(){let e=k2(),t=e?`${Vic}&entrypoint=${encodeURIComponent(e)}`:Vic;try{let n=await si.get(t,{auth:"teleport-org",timeout:s4m});if(!n.ok)return{success:!1,error:n.reason==="no-auth"?n.detail:n.reason};if(!Array.isArray(n.data?.skills))return kn("warn","skills_sync_list_malformed"),{success:!1,error:"malformed list-skills response"};return{success:!0,skills:n.data.skills.filter(Gic).map(Wic)}}catch(n){let{message:r}=Lb(n);return{success:!1,error:r}}}
async function Yic(e,t){let n=k2(),r=n?`?entrypoint=${encodeURIComponent(n)}`:"";try{let o=await si.get(`/api/oauth/organizations/:orgUUID/skills/${encodeURIComponent(e)}/download${r}`,{auth:"teleport-org",timeout:i4m,responseType:"arraybuffer"});if(!o.ok||!o.data)return kn("warn","skills_sync_download_not_ok",{reason:o.ok?"empty_body":o.reason}),!1;let s=Buffer.from(o.data);if(s.length<2||s[0]!==80||s[1]!==75)return kn("warn","skills_sync_download_not_zip",{serverError:l4m(s),bodyLen:s.length}),!1;return await Kic.writeFile(t,s),!0}catch(o){let{kind:s}=Lb(o);return kn("warn","skills_sync_download_exception",{kind:s}),!1}}
function l4m(e){try{let t=a4m().safeParse(qt(e.toString("utf8",0,2048)));if(t.success)return t.data.error.type??"error_envelope_no_type"}catch{}return"non_json_body"}
var Kic,s4m=30000,i4m=300000,a4m,Vic="/api/oauth/organizations/:orgUUID/skills/list-skills?include_wiggle_skills=true";
var Jic=b(()=>{iv();SA();xH();bt();Xt();gT();Kic=require("fs/promises"),a4m=we(()=>hn.object({error:hn.object({type:hn.string().optional()})}))});
export {Wic,Gic,zic,Yic,l4m,Kic,s4m,i4m,a4m,Vic,Jic};
