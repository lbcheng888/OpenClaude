// @ts-nocheck
import {vln} from "./m1007.ts";
import {b,x} from "../runtime.ts";
import {QRr} from "./m1008.ts";
import {b0} from "./m756.ts";
var cws,uws=(e)=>Boolean(e&&e.login_session),dws=async(e,t)=>{let n=await vln({...t,profile:e})();return cws.setCredentialFeature(n,"CREDENTIALS_PROFILE_LOGIN","AC")};
var pws=b(()=>{QRr();cws=x(b0(),1)});
export {cws,uws,dws,pws};
