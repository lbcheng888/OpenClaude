// @ts-nocheck
import {getSettingsForSource,getSettings_DEPRECATED,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {Bl,sn} from "../src/config/0047_namespace.ts";
import {iS,RK} from "./m2231.ts";
import {f_,Kx} from "./m128.ts";
import {b} from "../runtime.ts";
function RQu(){return{initialHooksConfig:null}}
function CBr(){let e=kQu(),t=chi.get(e);if(!t)t=RQu(),chi.set(e,t);return t}
function vBr(){let e=getSettingsForSource("policySettings");if(e?.disableAllHooks===!0)return{};if(e?.allowManagedHooksOnly===!0||Bl())return e?.hooks??{};if(iS("hooks"))return e?.hooks??{};let t=getSettings_DEPRECATED();if(t.disableAllHooks===!0)return e?.hooks??{};return t.hooks??{}}
function uE(){return Bl()||eie()}
function eie(){let e=getSettingsForSource("policySettings");if(e?.allowManagedHooksOnly===!0)return!0;if(getSettings_DEPRECATED().disableAllHooks===!0&&e?.disableAllHooks!==!0)return!0;return!1}
function h$(){return getSettingsForSource("policySettings")?.disableAllHooks===!0}
function uhi(){f_(),CBr().initialHooksConfig=vBr()}
function Cve(){f_(),CBr().initialHooksConfig=vBr()}
function f5(){let e=CBr();if(e.initialHooksConfig===null)f_(),e.initialHooksConfig=vBr();return e.initialHooksConfig}
var xQu="cli",kQu=()=>xQu,chi;
var L1=b(()=>{sn();RK();yr();Kx();chi=new Map});
export {RQu,CBr,vBr,uE,eie,h$,uhi,Cve,f5,xQu,kQu,chi,L1};
