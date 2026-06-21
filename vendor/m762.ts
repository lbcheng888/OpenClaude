// @ts-nocheck
import {b} from "../runtime.ts";
import {sgr,Nbe} from "./m761.ts";
var JZc="AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE",XZc="ec2_metadata_service_endpoint_mode",gos;
var _os=b(()=>{sgr();gos={environmentVariableSelector:(e)=>e[JZc],configFileSelector:(e)=>e[XZc],default:Nbe.IPv4}});
export {JZc,XZc,gos,_os};
