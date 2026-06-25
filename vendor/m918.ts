// @ts-nocheck
import {Q} from "../runtime.ts";
import {yk} from "./m613.ts";
import {$N} from "./m607.ts";
import {Vg} from "./m600.ts";
import {sNe,bvt} from "./m770.ts";
var Sme=Q((vSs)=>{var USu=yk(),CSs=$N(),$Su=Vg(),qSu="AWS_EXECUTION_ENV",ASs="AWS_REGION",RSs="AWS_DEFAULT_REGION",WSu="AWS_EC2_METADATA_DISABLED",GSu=["in-region","cross-region","mobile","standard","legacy"],VSu="/latest/meta-data/placement/region",KSu="AWS_DEFAULTS_MODE",zSu="defaults_mode",jSu={environmentVariableSelector:(e)=>e[KSu],configFileSelector:(e)=>e[zSu],default:"legacy"},YSu=({region:e=CSs.loadConfig(USu.NODE_REGION_CONFIG_OPTIONS),defaultsMode:t=CSs.loadConfig(jSu)}={})=>$Su.memoize(async()=>{let n=typeof t==="function"?await t():t;switch(n?.toLowerCase()){case"auto":return JSu(e);case"in-region":case"cross-region":case"mobile":case"standard":case"legacy":return Promise.resolve(n?.toLocaleLowerCase());case void 0:return Promise.resolve("legacy");default:throw Error(`Invalid parameter for "defaultsMode", expect ${GSu.join(", ")}, got ${n}`)}}),JSu=async(e)=>{if(e){let t=typeof e==="function"?await e():e,n=await XSu();if(!n)return"standard";if(t===n)return"in-region";else return"cross-region"}return"standard"},XSu=async()=>{if(process.env[qSu]&&(process.env[ASs]||process.env[RSs]))return process.env[ASs]??process.env[RSs];if(!process.env[WSu])try{let{getInstanceMetadataEndpoint:e,httpRequest:t}=await Promise.resolve().then(() => (sNe(),bvt)),n=await e();return(await t({...n,path:VSu})).toString()}catch(e){}};vSs.resolveDefaultsModeConfig=YSu});
export {Sme};
