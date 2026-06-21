// @ts-nocheck
import {gNs,_Ns,TNs} from "./m1348.ts";
import {STSClient,Dvt} from "./m1331.ts";
import {b} from "../runtime.ts";
var SNs=(e,t)=>{if(!t)return e;else return class extends e{constructor(r){super(r);for(let o of t)this.middlewareStack.use(o)}}},getDefaultRoleAssumer=(e={},t)=>gNs(e,SNs(STSClient,t)),getDefaultRoleAssumerWithWebIdentity=(e={},t)=>_Ns(e,SNs(STSClient,t)),decorateDefaultCredentialProvider=(e)=>(t)=>e({roleAssumer:getDefaultRoleAssumer(t),roleAssumerWithWebIdentity:getDefaultRoleAssumerWithWebIdentity(t),...t});
var CNs=b(()=>{TNs();Dvt()});
export {SNs,getDefaultRoleAssumer,getDefaultRoleAssumerWithWebIdentity,decorateDefaultCredentialProvider,CNs};
