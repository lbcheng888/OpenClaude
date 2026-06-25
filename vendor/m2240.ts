// @ts-nocheck
import {getSettingsForSource,getSettings_DEPRECATED,br} from "../src/config/0745_updateSettingsForSource.ts";
import {dl,dn} from "../src/config/0137_namespace.ts";
import {JS,ez} from "./m2239.ts";
import {C_,lk} from "./m125.ts";
import {b} from "../runtime.ts";
function Xld(){return{initialHooksConfig:null}}
function t9r(){let e=Zld(),t=uEi.get(e);if(!t)t=Xld(),uEi.set(e,t);return t}
function n9r(){let e=getSettingsForSource("policySettings");if(e?.disableAllHooks===!0)return{};if(e?.allowManagedHooksOnly===!0||dl())return e?.hooks??{};if(JS("hooks"))return e?.hooks??{};let t=getSettings_DEPRECATED();if(t.disableAllHooks===!0)return e?.hooks??{};return t.hooks??{}}
function eS(){return dl()||Zse()}
function Zse(){let e=getSettingsForSource("policySettings");if(e?.allowManagedHooksOnly===!0)return!0;if(getSettings_DEPRECATED().disableAllHooks===!0&&e?.disableAllHooks!==!0)return!0;return!1}
function B2(){return getSettingsForSource("policySettings")?.disableAllHooks===!0}
function dEi(){C_(),t9r().initialHooksConfig=n9r()}
function cve(){C_(),t9r().initialHooksConfig=n9r()}
function Y3(){let e=t9r();if(e.initialHooksConfig===null)C_(),e.initialHooksConfig=n9r();return e.initialHooksConfig}
var Qld="cli",Zld=()=>Qld,uEi;
var zM=b(()=>{dn();ez();br();lk();uEi=new Map});
export {Xld,t9r,n9r,eS,Zse,B2,dEi,cve,Y3,Qld,Zld,uEi,zM};
