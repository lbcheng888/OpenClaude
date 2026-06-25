// @ts-nocheck
import {Q} from "../runtime.ts";
import {yk} from "./m613.ts";
import {$N} from "./m607.ts";
var PSs=Q((WYe)=>{Object.defineProperty(WYe,"__esModule",{value:!0});WYe.warning=void 0;WYe.stsRegionDefaultResolver=cbu;var DSs=yk(),lbu=$N();function cbu(e={}){return(0,lbu.loadConfig)({...DSs.NODE_REGION_CONFIG_OPTIONS,async default(){if(!WYe.warning.silence)console.warn("@aws-sdk - WARN - default STS region of us-east-1 used. See @aws-sdk/credential-providers README and set a region explicitly.");return"us-east-1"}},{...DSs.NODE_REGION_CONFIG_FILE_OPTIONS,...e})}WYe.warning={silence:!1}});
export {PSs};
