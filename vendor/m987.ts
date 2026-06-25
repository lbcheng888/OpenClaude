// @ts-nocheck
import {win,UEr} from "./m848.ts";
import {sNe,bvt} from "./m770.ts";
import {Psn,Qcs} from "./m758.ts";
import {b,x} from "../runtime.ts";
import {b0} from "./m756.ts";
import {Vg} from "./m600.ts";
var UAs,rln,$As=(e,t,n)=>{let r={EcsContainer:async(o)=>{let{fromHttp:s}=await Promise.resolve().then(() => (win(),UEr)),{fromContainerMetadata:i}=await Promise.resolve().then(() => (sNe(),bvt));return n?.debug("@aws-sdk/credential-provider-ini - credential_source is EcsContainer"),async()=>rln.chain(s(o??{}),i(o))().then(bRr)},Ec2InstanceMetadata:async(o)=>{n?.debug("@aws-sdk/credential-provider-ini - credential_source is Ec2InstanceMetadata");let{fromInstanceMetadata:s}=await Promise.resolve().then(() => (sNe(),bvt));return async()=>s(o)().then(bRr)},Environment:async(o)=>{n?.debug("@aws-sdk/credential-provider-ini - credential_source is Environment");let{fromEnv:s}=await Promise.resolve().then(() => (Psn(),Qcs));return async()=>s(o)().then(bRr)}};if(e in r)return r[e];else throw new rln.CredentialsProviderError(`Unsupported credential source in profile ${t}. Got ${e}, expected EcsContainer or Ec2InstanceMetadata or Environment.`,{logger:n})},bRr=(e)=>UAs.setCredentialFeature(e,"CREDENTIALS_PROFILE_NAMED_PROVIDER","p");
var qAs=b(()=>{UAs=x(b0(),1),rln=x(Vg(),1)});
export {UAs,rln,$As,bRr,qAs};
