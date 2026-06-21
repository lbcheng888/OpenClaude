// @ts-nocheck
import {Bl,sn} from "../src/config/0047_namespace.ts";
import {hVt,h1o} from "../src/config/5628_h1o.ts";
import {b} from "../runtime.ts";
function grc(e){let t=Bl()?"safe mode":hVt()?"hermetic mode":void 0;if(!t)return{servers:e,dropped:[],reason:t};let n={},r=[];for(let[o,s]of Object.entries(e))if(s.type==="sdk")n[o]=s;else r.push(o);return{servers:n,dropped:r,reason:t}}
var _rc=b(()=>{h1o();sn()});
export {grc,_rc};
