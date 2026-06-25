// @ts-nocheck
import {b} from "../runtime.ts";
import {Obr,TCe} from "./m766.ts";
var puu="AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE",muu="ec2_metadata_service_endpoint_mode",dus;
var pus=b(()=>{Obr();dus={environmentVariableSelector:(e)=>e[puu],configFileSelector:(e)=>e[muu],default:TCe.IPv4}});
export {puu,muu,dus,pus};
