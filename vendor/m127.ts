// @ts-nocheck
import {kKe,Dsr} from "./m126.ts";
import {b} from "../runtime.ts";
function nt(e){if(!e)return!1;if(typeof e==="boolean")return e;let t=String(e).toLowerCase().trim();return["1","true","yes","on"].includes(t)}
function Za(e){if(e===void 0)return!1;if(typeof e==="boolean")return!e;let t=String(e).toLowerCase().trim();return["0","false","no","off"].includes(t)}
function Sre(e){if(!e||e.startsWith("-")||e.startsWith("/"))return!1;if(e.includes(".."))return!1;if(e.split("/").some((t)=>t==="."||t===""))return!1;return/^[a-zA-Z0-9/._+@-]+$/.test(e)}
function Ni(){let e=new Set;return{subscribe(t){let n=kKe(t);return e.add(n),()=>{e.delete(n)}},emit(...t){let n;for(let r of e)try{r(...t)}catch(o){(n??=[]).push(o)}if(n)throw n.length===1?n[0]:AggregateError(n,"Signal listener(s) threw")},clear(){e.clear()}}}
var i6o=b(()=>{Dsr()});
export {nt,Za,Sre,Ni,i6o};
