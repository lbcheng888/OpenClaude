// @ts-nocheck
import {Q} from "../runtime.ts";
import {B$} from "./m3532.ts";
var Vee=Q((E_e)=>{Object.defineProperty(E_e,"__esModule",{value:!0});E_e.CHANNEL_ARGS_CONFIG_SELECTOR_KEY=void 0;E_e.registerResolver=cap;E_e.registerDefaultScheme=uap;E_e.createResolver=dap;E_e.getDefaultAuthority=pap;E_e.mapUriDefaultScheme=map;var ooo=B$();E_e.CHANNEL_ARGS_CONFIG_SELECTOR_KEY="grpc.internal.config_selector";var nlt={},roo=null;function cap(e,t){nlt[e]=t}function uap(e){roo=e}function dap(e,t,n){if(e.scheme!==void 0&&e.scheme in nlt)return new nlt[e.scheme](e,t,n);else throw Error(`No resolver could be created for target ${(0,ooo.uriToString)(e)}`)}function pap(e){if(e.scheme!==void 0&&e.scheme in nlt)return nlt[e.scheme].getDefaultAuthority(e);else throw Error(`Invalid target ${(0,ooo.uriToString)(e)}`)}function map(e){if(e.scheme===void 0||!(e.scheme in nlt))if(roo!==null)return{scheme:roo,authority:void 0,path:(0,ooo.uriToString)(e)};else return null;return e}});
export {Vee};
