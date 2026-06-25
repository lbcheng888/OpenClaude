// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {providerConfigFromInit,fromContainerMetadata,ENV_CMDS_RELATIVE_URI,ENV_CMDS_FULL_URI,ENV_CMDS_AUTH_TOKEN,DEFAULT_TIMEOUT,DEFAULT_MAX_RETRIES,nus} from "./m760.ts";
import {httpRequest,Lsn} from "./m759.ts";
import {getInstanceMetadataEndpoint,Mbr} from "./m768.ts";
import {fromInstanceMetadata,Sus} from "./m769.ts";
import {Endpoint,Pbr} from "./m764.ts";
var bus=()=>{};
var bvt={};
ft(bvt,{providerConfigFromInit:()=>providerConfigFromInit,httpRequest:()=>httpRequest,getInstanceMetadataEndpoint:()=>getInstanceMetadataEndpoint,fromInstanceMetadata:()=>fromInstanceMetadata,fromContainerMetadata:()=>fromContainerMetadata,Endpoint:()=>Endpoint,ENV_CMDS_RELATIVE_URI:()=>ENV_CMDS_RELATIVE_URI,ENV_CMDS_FULL_URI:()=>ENV_CMDS_FULL_URI,ENV_CMDS_AUTH_TOKEN:()=>ENV_CMDS_AUTH_TOKEN,DEFAULT_TIMEOUT:()=>DEFAULT_TIMEOUT,DEFAULT_MAX_RETRIES:()=>DEFAULT_MAX_RETRIES});
var sNe=b(()=>{Lsn();Mbr();Pbr();nus();Sus();bus()});
export {bus,bvt,sNe};
