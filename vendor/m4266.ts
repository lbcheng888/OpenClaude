// @ts-nocheck
import {Yn,Pl} from "./m2465.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {truncate} from "./m239.ts";
import {DD} from "../src/telemetry/2792_eventName.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {Xo} from "./m240.ts";
import {oe} from "./m2275.ts";
function q2p(e){let t=0;for(let n of e)if(n!=null&&typeof n!=="string")t++;return t}
function DYa({query:e,allowed_domains:t,blocked_domains:n},{verbose:r}){if(!e)return null;let o="";if(e)o+=`"${e}"`;if(r){if(t&&t.length>0)o+=`, only allowing domains: ${t.join(", ")}`;if(n&&n.length>0)o+=`, blocking domains: ${n.join(", ")}`}return o}
function PYa(e){if(e.length===0)return null;let t=e.at(-1);if(!t?.data)return null;let n=t.data;switch(n.type){case"query_update":return Kye.jsx(Yn,{children:Kye.jsxs(Text,{dimColor:!0,children:["Searching: ",n.query]})});case"search_results_received":return Kye.jsx(Yn,{children:Kye.jsxs(Text,{dimColor:!0,children:["Found ",n.resultCount,' results for "',n.query,'"']})});default:return null}}
function OYa(e){let t=e.searchCount??q2p(e.results??[]),n=e.durationSeconds>=1?`${Math.round(e.durationSeconds)}s`:`${Math.round(e.durationSeconds*1000)}ms`;return Kye.jsx(Box,{justifyContent:"space-between",width:"100%",children:Kye.jsx(Yn,{height:1,children:Kye.jsxs(Text,{children:["Did ",t," search",t!==1?"es":""," in ",n]})})})}
function H_o(e){if(!e?.query)return null;return truncate(e.query,DD)}
var Kye;
var LYa=b(()=>{Pl();je();Xo();Kye=x(oe(),1)});
export {q2p,DYa,PYa,OYa,H_o,Kye,LYa};
