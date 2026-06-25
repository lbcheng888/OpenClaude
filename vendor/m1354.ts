// @ts-nocheck
import {p9s,m9s,h9s} from "./m1353.ts";
import {STSClient,okt} from "./m1336.ts";
import {b} from "../runtime.ts";
var g9s=(e,t)=>{if(!t)return e;else return class extends e{constructor(r){super(r);for(let o of t)this.middlewareStack.use(o)}}},getDefaultRoleAssumer=(e={},t)=>p9s(e,g9s(STSClient,t)),getDefaultRoleAssumerWithWebIdentity=(e={},t)=>m9s(e,g9s(STSClient,t)),decorateDefaultCredentialProvider=(e)=>(t)=>e({roleAssumer:getDefaultRoleAssumer(t),roleAssumerWithWebIdentity:getDefaultRoleAssumerWithWebIdentity(t),...t});
var T9s=b(()=>{h9s();okt()});
export {g9s,getDefaultRoleAssumer,getDefaultRoleAssumerWithWebIdentity,decorateDefaultCredentialProvider,T9s};
