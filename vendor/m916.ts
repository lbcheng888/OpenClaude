// @ts-nocheck
import {X} from "../runtime.ts";
import {nk} from "./m607.ts";
import {Ffs} from "./m915.ts";
var cQ=X((Loe)=>{var RCt=nk(),Ufs=Ffs(),zuu=(e)=>({setRegion(t){e.region=t},region(){return e.region}}),Yuu=(e)=>({region:e.region()});Object.defineProperty(Loe,"NODE_REGION_CONFIG_FILE_OPTIONS",{enumerable:!0,get:function(){return RCt.NODE_REGION_CONFIG_FILE_OPTIONS}});Object.defineProperty(Loe,"NODE_REGION_CONFIG_OPTIONS",{enumerable:!0,get:function(){return RCt.NODE_REGION_CONFIG_OPTIONS}});Object.defineProperty(Loe,"REGION_ENV_NAME",{enumerable:!0,get:function(){return RCt.REGION_ENV_NAME}});Object.defineProperty(Loe,"REGION_INI_NAME",{enumerable:!0,get:function(){return RCt.REGION_INI_NAME}});Object.defineProperty(Loe,"resolveRegionConfig",{enumerable:!0,get:function(){return RCt.resolveRegionConfig}});Loe.getAwsRegionExtensionConfiguration=zuu;Loe.resolveAwsRegionExtensionConfiguration=Yuu;Object.keys(Ufs).forEach(function(e){if(e!=="default"&&!Object.prototype.hasOwnProperty.call(Loe,e))Object.defineProperty(Loe,e,{enumerable:!0,get:function(){return Ufs[e]}})})});
export {cQ};
