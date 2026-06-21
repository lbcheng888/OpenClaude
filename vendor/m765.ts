// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {providerConfigFromInit,fromContainerMetadata,ENV_CMDS_RELATIVE_URI,ENV_CMDS_FULL_URI,ENV_CMDS_AUTH_TOKEN,DEFAULT_TIMEOUT,DEFAULT_MAX_RETRIES,los} from "./m755.ts";
import {httpRequest,Qnn} from "./m754.ts";
import {getInstanceMetadataEndpoint,agr} from "./m763.ts";
import {fromInstanceMetadata,wos} from "./m764.ts";
import {Endpoint,ogr} from "./m759.ts";
var Ros=()=>{};
var zEt={};
isFullscreenWithTTY(zEt,{providerConfigFromInit:()=>providerConfigFromInit,httpRequest:()=>httpRequest,getInstanceMetadataEndpoint:()=>getInstanceMetadataEndpoint,fromInstanceMetadata:()=>fromInstanceMetadata,fromContainerMetadata:()=>fromContainerMetadata,Endpoint:()=>Endpoint,ENV_CMDS_RELATIVE_URI:()=>ENV_CMDS_RELATIVE_URI,ENV_CMDS_FULL_URI:()=>ENV_CMDS_FULL_URI,ENV_CMDS_AUTH_TOKEN:()=>ENV_CMDS_AUTH_TOKEN,DEFAULT_TIMEOUT:()=>DEFAULT_TIMEOUT,DEFAULT_MAX_RETRIES:()=>DEFAULT_MAX_RETRIES});
var p1e=b(()=>{Qnn();agr();ogr();los();wos();Ros()});
export {Ros,zEt,p1e};
