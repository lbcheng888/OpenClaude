// @ts-nocheck
import {Gn,sc} from "./m2455.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {truncate} from "./m237.ts";
import {yP} from "../src/telemetry/2780_eventName.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {ps} from "./m238.ts";
import {Te} from "./m2253.ts";
function bOp(e){let t=0;for(let n of e)if(n!=null&&typeof n!=="string")t++;return t}
function pWa({query:e,allowed_domains:t,blocked_domains:n},{verbose:r}){if(!e)return null;let o="";if(e)o+=`"${e}"`;if(r){if(t&&t.length>0)o+=`, only allowing domains: ${t.join(", ")}`;if(n&&n.length>0)o+=`, blocking domains: ${n.join(", ")}`}return o}
function mWa(e){if(e.length===0)return null;let t=e.at(-1);if(!t?.data)return null;let n=t.data;switch(n.type){case"query_update":return i0e.default.createElement(Gn,null,i0e.default.createElement(Text,{dimColor:!0},"Searching: ",n.query));case"search_results_received":return i0e.default.createElement(Gn,null,i0e.default.createElement(Text,{dimColor:!0},"Found ",n.resultCount,' results for "',n.query,'"'));default:return null}}
function fWa(e){let t=e.searchCount??bOp(e.results??[]),n=e.durationSeconds>=1?`${Math.round(e.durationSeconds)}s`:`${Math.round(e.durationSeconds*1000)}ms`;return i0e.default.createElement(Box,{justifyContent:"space-between",width:"100%"},i0e.default.createElement(Gn,{height:1},i0e.default.createElement(Text,null,"Did ",t," search",t!==1?"es":""," in ",n)))}
function Ppo(e){if(!e?.query)return null;return truncate(e.query,yP)}
var i0e;
var AWa=b(()=>{sc();ze();ps();i0e=M(Te(),1)});
export {bOp,pWa,mWa,fWa,Ppo,i0e,AWa};
