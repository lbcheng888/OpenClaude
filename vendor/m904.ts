// @ts-nocheck
import {Q} from "../runtime.ts";
import {xoe} from "./m886.ts";
var fme=Q((mNe)=>{var RTs=require("os"),kAr=require("process"),QTu=xoe(),vTs={isCrtAvailable:!1},ZTu=()=>{if(vTs.isCrtAvailable)return["md/crt-avail"];return null},wTs=({serviceId:e,clientVersion:t})=>async(n)=>{let r=[["aws-sdk-js",t],["ua","2.1"],[`os/${RTs.platform()}`,RTs.release()],["lang/js"],["md/nodejs",`${kAr.versions.node}`]],o=ZTu();if(o)r.push(o);if(e)r.push([`api/${e}`,t]);if(kAr.env.AWS_EXECUTION_ENV)r.push([`exec-env/${kAr.env.AWS_EXECUTION_ENV}`]);let s=await n?.userAgentAppId?.();return s?[...r,[`app/${s}`]]:[...r]},eSu=wTs,kTs="AWS_SDK_UA_APP_ID",HTs="sdk_ua_app_id",tSu="sdk-ua-app-id",nSu={environmentVariableSelector:(e)=>e[kTs],configFileSelector:(e)=>e[HTs]??e[tSu],default:QTu.DEFAULT_UA_APP_ID};mNe.NODE_APP_ID_CONFIG_OPTIONS=nSu;mNe.UA_APP_ID_ENV_NAME=kTs;mNe.UA_APP_ID_INI_NAME=HTs;mNe.createDefaultUserAgentProvider=wTs;mNe.crtAvailability=vTs;mNe.defaultUserAgent=eSu});
export {fme};
