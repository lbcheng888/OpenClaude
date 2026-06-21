// @ts-nocheck
import {X} from "../runtime.ts";
import {f9} from "./m3516.ts";
var Xee=X((lge)=>{Object.defineProperty(lge,"__esModule",{value:!0});lge.CHANNEL_ARGS_CONFIG_SELECTOR_KEY=void 0;lge.registerResolver=bJd;lge.registerDefaultScheme=EJd;lge.createResolver=CJd;lge.getDefaultAuthority=vJd;lge.mapUriDefaultScheme=wJd;var bZr=f9();lge.CHANNEL_ARGS_CONFIG_SELECTOR_KEY="grpc.internal.config_selector";var sit={},SZr=null;function bJd(e,t){sit[e]=t}function EJd(e){SZr=e}function CJd(e,t,n){if(e.scheme!==void 0&&e.scheme in sit)return new sit[e.scheme](e,t,n);else throw Error(`No resolver could be created for target ${(0,bZr.uriToString)(e)}`)}function vJd(e){if(e.scheme!==void 0&&e.scheme in sit)return sit[e.scheme].getDefaultAuthority(e);else throw Error(`Invalid target ${(0,bZr.uriToString)(e)}`)}function wJd(e){if(e.scheme===void 0||!(e.scheme in sit))if(SZr!==null)return{scheme:SZr,authority:void 0,path:(0,bZr.uriToString)(e)};else return null;return e}});
export {Xee};
