// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {mt,configProtoStore} from "./m2458.ts";
import {bDe,Sue} from "./m4650.ts";
import {Pje} from "../src/telemetry/4652_call.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {j5n} from "../src/config/4661_onComplete.ts";
import {OSo,LSo} from "./m4654.ts";
import {oml} from "./m4661.ts";
import {njt} from "./m4663.ts";
import {bbo} from "./m4693.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var Kfl={};
isFullscreenWithTTY(Kfl,{call:()=>XJp});
function KJp(e){let t=Vfl.c(7),{action:n,target:r,onComplete:o}=e,s=mt(JJp),i=bDe(),a=lye.useRef(!1),l,c;if(t[0]!==n||t[1]!==s||t[2]!==o||t[3]!==r||t[4]!==i)l=()=>{if(a.current)return;a.current=!0;let u=n==="enable",d=s.filter(YJp),p=r==="all"?d:d.filter((f)=>f.name===r),m=p.filter((f)=>Pje(f)!=="needs-approval"&&(u?f.type==="disabled":f.type!=="disabled"));if(m.length===0){o(r==="all"?`All MCP servers are already ${u?"enabled":"disabled"}`:p.length===0?`MCP server "${r}" not found`:p.some(zJp)?`MCP server "${r}" is pending approval \u2014 approve it via /mcp first`:`MCP server "${r}" is already ${u?"enabled":"disabled"}`);return}for(let f of m)i(f.name).catch(De);o(r==="all"?`${u?"Enabled":"Disabled"} ${m.length} MCP server(s)`:`MCP server "${r}" ${u?"enabled":"disabled"}`)},c=[n,r,s,i,o],t[0]=n,t[1]=s,t[2]=o,t[3]=r,t[4]=i,t[5]=l,t[6]=c;else l=t[5],c=t[6];return lye.useEffect(l,c),null}
function zJp(e){return Pje(e)==="needs-approval"}
function YJp(e){return e.name!=="ide"}
function JJp(e){return e.mcp.clients}
async function XJp(e,t,n){if(n){let r=/^(\S+)\s*(.*)$/.exec(n.trim()),o=r?.[1]??"",s=r?.[2]??"";if(o==="no-redirect")return lye.default.createElement(j5n,{onComplete:e});if(o==="reconnect"&&s)return lye.default.createElement(OSo,{serverName:s,onComplete:e});if(o==="enable"||o==="disable")return lye.default.createElement(KJp,{action:o,target:s||"all",onComplete:e})}return lye.default.createElement(j5n,{onComplete:e})}
var Vfl,lye;
var zfl=b(()=>{oml();LSo();Sue();configProtoStore();Rn();njt();bbo();Vfl=M(rt(),1),lye=M(Te(),1)});
export {Kfl,KJp,zJp,YJp,JJp,XJp,Vfl,lye,zfl};
