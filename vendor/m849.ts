// @ts-nocheck
import {sNe,bvt} from "./m770.ts";
import {win,UEr} from "./m848.ts";
import {b,x} from "../runtime.ts";
import {Vg} from "./m600.ts";
var kin,Xfs="AWS_EC2_METADATA_DISABLED",Qfs=async(e)=>{let{ENV_CMDS_FULL_URI:t,ENV_CMDS_RELATIVE_URI:n,fromContainerMetadata:r,fromInstanceMetadata:o}=await Promise.resolve().then(() => (sNe(),bvt));if(process.env[n]||process.env[t]){e.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromHttp/fromContainerMetadata");let{fromHttp:s}=await Promise.resolve().then(() => (win(),UEr));return kin.chain(s(e),r(e))}if(process.env[Xfs]&&process.env[Xfs]!=="false")return async()=>{throw new kin.CredentialsProviderError("EC2 Instance Metadata Service access disabled",{logger:e.logger})};return e.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromInstanceMetadata"),o(e)};
var Zfs=b(()=>{kin=x(Vg(),1)});
export {kin,Xfs,Qfs,Zfs};
