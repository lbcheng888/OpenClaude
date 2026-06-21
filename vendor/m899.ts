// @ts-nocheck
import {X} from "../runtime.ts";
import {Poe} from "./m881.ts";
var ime=X((T1e)=>{var Ims=require("os"),Zyr=require("process"),Mcu=Poe(),Dms={isCrtAvailable:!1},Ncu=()=>{if(Dms.isCrtAvailable)return["md/crt-avail"];return null},Pms=({serviceId:e,clientVersion:t})=>async(n)=>{let r=[["aws-sdk-js",t],["ua","2.1"],[`os/${Ims.platform()}`,Ims.release()],["lang/js"],["md/nodejs",`${Zyr.versions.node}`]],o=Ncu();if(o)r.push(o);if(e)r.push([`api/${e}`,t]);if(Zyr.env.AWS_EXECUTION_ENV)r.push([`exec-env/${Zyr.env.AWS_EXECUTION_ENV}`]);let s=await n?.userAgentAppId?.();return s?[...r,[`app/${s}`]]:[...r]},Bcu=Pms,Oms="AWS_SDK_UA_APP_ID",Lms="sdk_ua_app_id",Fcu="sdk-ua-app-id",Ucu={environmentVariableSelector:(e)=>e[Oms],configFileSelector:(e)=>e[Lms]??e[Fcu],default:Mcu.DEFAULT_UA_APP_ID};T1e.NODE_APP_ID_CONFIG_OPTIONS=Ucu;T1e.UA_APP_ID_ENV_NAME=Oms;T1e.UA_APP_ID_INI_NAME=Lms;T1e.createDefaultUserAgentProvider=Pms;T1e.crtAvailability=Dms;T1e.defaultUserAgent=Bcu});
export {ime};
