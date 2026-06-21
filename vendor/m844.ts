// @ts-nocheck
import {p1e,zEt} from "./m765.ts";
import {Wrn,d_r} from "./m843.ts";
import {b,M} from "../runtime.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
var Grn,rcs="AWS_EC2_METADATA_DISABLED",ocs=async(e)=>{let{ENV_CMDS_FULL_URI:t,ENV_CMDS_RELATIVE_URI:n,fromContainerMetadata:r,fromInstanceMetadata:o}=await Promise.resolve().then(() => (p1e(),zEt));if(process.env[n]||process.env[t]){e.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromHttp/fromContainerMetadata");let{fromHttp:s}=await Promise.resolve().then(() => (Wrn(),d_r));return Grn.chain(s(e),r(e))}if(process.env[rcs]&&process.env[rcs]!=="false")return async()=>{throw new Grn.CredentialsProviderError("EC2 Instance Metadata Service access disabled",{logger:e.logger})};return e.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromInstanceMetadata"),o(e)};
var scs=b(()=>{Grn=M(createDefaultGlobalConfig(),1)});
export {Grn,rcs,ocs,scs};
