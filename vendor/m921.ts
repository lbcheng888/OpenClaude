// @ts-nocheck
import {Q} from "../runtime.ts";
import {yk} from "./m613.ts";
import {PSs} from "./m920.ts";
var iQ=Q((Poe)=>{var ewt=yk(),OSs=PSs(),ubu=(e)=>({setRegion(t){e.region=t},region(){return e.region}}),dbu=(e)=>({region:e.region()});Object.defineProperty(Poe,"NODE_REGION_CONFIG_FILE_OPTIONS",{enumerable:!0,get:function(){return ewt.NODE_REGION_CONFIG_FILE_OPTIONS}});Object.defineProperty(Poe,"NODE_REGION_CONFIG_OPTIONS",{enumerable:!0,get:function(){return ewt.NODE_REGION_CONFIG_OPTIONS}});Object.defineProperty(Poe,"REGION_ENV_NAME",{enumerable:!0,get:function(){return ewt.REGION_ENV_NAME}});Object.defineProperty(Poe,"REGION_INI_NAME",{enumerable:!0,get:function(){return ewt.REGION_INI_NAME}});Object.defineProperty(Poe,"resolveRegionConfig",{enumerable:!0,get:function(){return ewt.resolveRegionConfig}});Poe.getAwsRegionExtensionConfiguration=ubu;Poe.resolveAwsRegionExtensionConfiguration=dbu;Object.keys(OSs).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(Poe,e))Object.defineProperty(Poe,e,{enumerable:!0,get:function(){return OSs[e]}})})});
export {iQ};
