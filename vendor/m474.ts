// @ts-nocheck
import {Q} from "../runtime.ts";
import {Rgr} from "./m472.ts";
import {vgr} from "./m473.ts";
var wgr=Q((pCf,lXo)=>{var aXo=Rgr(),p8c=vgr();lXo.exports=m8c;function m8c(e,t,n,r){var o=n.keyedList?n.keyedList[n.index]:n.index;n.jobs[o]=f8c(t,o,e[o],function(s,i){if(!(o in n.jobs))return;if(delete n.jobs[o],s)p8c(n);else n.results[o]=i;r(s,n.results)})}function f8c(e,t,n,r){var o;if(e.length==2)o=e(n,aXo(r));else o=e(n,t,aXo(r));return o}});
export {wgr};
