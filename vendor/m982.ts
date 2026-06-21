// @ts-nocheck
import {Wrn,d_r} from "./m843.ts";
import {p1e,zEt} from "./m765.ts";
import {Jnn,oos} from "./m753.ts";
import {b,M} from "../runtime.ts";
import {r0} from "./m751.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
var V_s,Tsn,K_s=(e,t,n)=>{let r={EcsContainer:async(o)=>{let{fromHttp:s}=await Promise.resolve().then(() => (Wrn(),d_r)),{fromContainerMetadata:i}=await Promise.resolve().then(() => (p1e(),zEt));return n?.debug("@aws-sdk/credential-provider-ini - credential_source is EcsContainer"),async()=>Tsn.chain(s(o??{}),i(o))().then(VTr)},Ec2InstanceMetadata:async(o)=>{n?.debug("@aws-sdk/credential-provider-ini - credential_source is Ec2InstanceMetadata");let{fromInstanceMetadata:s}=await Promise.resolve().then(() => (p1e(),zEt));return async()=>s(o)().then(VTr)},Environment:async(o)=>{n?.debug("@aws-sdk/credential-provider-ini - credential_source is Environment");let{fromEnv:s}=await Promise.resolve().then(() => (Jnn(),oos));return async()=>s(o)().then(VTr)}};if(e in r)return r[e];else throw new Tsn.CredentialsProviderError(`Unsupported credential source in profile ${t}. Got ${e}, expected EcsContainer or Ec2InstanceMetadata or Environment.`,{logger:n})},VTr=(e)=>V_s.setCredentialFeature(e,"CREDENTIALS_PROFILE_NAMED_PROVIDER","p");
var z_s=b(()=>{V_s=M(r0(),1),Tsn=M(createDefaultGlobalConfig(),1)});
export {V_s,Tsn,K_s,VTr,z_s};
