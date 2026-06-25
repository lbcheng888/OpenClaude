// @ts-nocheck
import {dl,dn} from "../src/config/0137_namespace.ts";
import {Vzt,B2o} from "../src/config/5665_B2o.ts";
import {b} from "../runtime.ts";
function spc(e){let t=dl()?"safe mode":Vzt()?"hermetic mode":void 0;if(!t)return{servers:e,dropped:[],reason:t};let n={},r=[];for(let[o,s]of Object.entries(e))if(s.type==="sdk")n[o]=s;else r.push(o);return{servers:n,dropped:r,reason:t}}
var ipc=b(()=>{B2o();dn()});
export {spc,ipc};
