// @ts-nocheck
import {RSr,xSr,MSs} from "./m1011.ts";
import {uTs,dTs,pTs} from "./m993.ts";
import {WSs,GSs,VSs} from "./m1014.ts";
import {kSs,HSs,ISs} from "./m1009.ts";
import {PSs,DSs,OSs} from "./m1010.ts";
import {hSs,gSs,_Ss} from "./m1004.ts";
import {b,M} from "../runtime.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
var KSs,ISr=async(e,t,n,r={},o=!1)=>{let s=t[e];if(Object.keys(r).length>0&&RSr(s))return xSr(s,n);if(o||uTs(s,{profile:e,logger:n.logger}))return dTs(e,t,n,r,ISr);if(RSr(s))return xSr(s,n);if(WSs(s))return GSs(s,n);if(kSs(s))return HSs(n,e);if(PSs(s))return await DSs(e,s,n);if(hSs(s))return gSs(e,n);throw new KSs.CredentialsProviderError(`Could not resolve credentials using profile: [${e}] in configuration/credentials file(s).`,{logger:n.logger})};
var zSs=b(()=>{pTs();_Ss();ISs();OSs();MSs();VSs();KSs=M(createDefaultGlobalConfig(),1)});
export {KSs,ISr,zSs};
