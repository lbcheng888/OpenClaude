// @ts-nocheck
import {jsn} from "./m1002.ts";
import {b,M} from "../runtime.ts";
import {ESr} from "./m1003.ts";
import {r0} from "./m751.ts";
var ASs,hSs=(e)=>Boolean(e&&e.login_session),gSs=async(e,t)=>{let n=await jsn({...t,profile:e})();return ASs.setCredentialFeature(n,"CREDENTIALS_PROFILE_LOGIN","AC")};
var _Ss=b(()=>{ESr();ASs=M(r0(),1)});
export {ASs,hSs,gSs,_Ss};
