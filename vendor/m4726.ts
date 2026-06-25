// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {_t,uo} from "./m2468.ts";
import {SPe,Sue} from "./m4678.ts";
import {lWe} from "../src/telemetry/4680_call.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {v7n} from "../src/config/4689_onComplete.ts";
import {jvo,Yvo} from "./m4682.ts";
import {zSl} from "./m4689.ts";
import {_ht} from "./m4691.ts";
import {szn} from "./m4725.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var WEl={};
ft(WEl,{call:()=>uim});
function iim(e){let t=qEl.c(7),{action:n,target:r,onComplete:o}=e,s=_t(cim),i=SPe(),a=izn.useRef(!1),l,c;if(t[0]!==n||t[1]!==s||t[2]!==o||t[3]!==r||t[4]!==i)l=()=>{if(a.current)return;a.current=!0;let u=n==="enable",d=s.filter(lim),p=r==="all"?d:d.filter((f)=>f.name===r),m=p.filter((f)=>lWe(f)!=="needs-approval"&&(u?f.type==="disabled":f.type!=="disabled"));if(m.length===0){o(r==="all"?`All MCP servers are already ${u?"enabled":"disabled"}`:p.length===0?`MCP server "${r}" not found`:p.some(aim)?`MCP server "${r}" is pending approval \u2014 approve it via /mcp first`:`MCP server "${r}" is already ${u?"enabled":"disabled"}`);return}for(let f of m)i(f.name).catch(Ie);o(r==="all"?`${u?"Enabled":"Disabled"} ${m.length} MCP server(s)`:`MCP server "${r}" ${u?"enabled":"disabled"}`)},c=[n,r,s,i,o],t[0]=n,t[1]=s,t[2]=o,t[3]=r,t[4]=i,t[5]=l,t[6]=c;else l=t[5],c=t[6];return izn.useEffect(l,c),null}
function aim(e){return lWe(e)==="needs-approval"}
function lim(e){return e.name!=="ide"}
function cim(e){return e.mcp.clients}
async function uim(e,t,n){if(n){let r=/^(\S+)\s*(.*)$/.exec(n.trim()),o=r?.[1]??"",s=r?.[2]??"";if(o==="no-redirect")return MWt.jsx(v7n,{onComplete:e});if(o==="reconnect"&&s)return MWt.jsx(jvo,{serverName:s,onComplete:e});if(o==="enable"||o==="disable")return MWt.jsx(iim,{action:o,target:s||"all",onComplete:e})}return MWt.jsx(v7n,{onComplete:e})}
var qEl,izn,MWt;
var GEl=b(()=>{zSl();Yvo();Sue();uo();vn();_ht();szn();qEl=x(tt(),1),izn=x(et(),1),MWt=x(oe(),1)});
export {WEl,iim,aim,lim,cim,uim,qEl,izn,MWt,GEl};
