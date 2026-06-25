// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {ba,pd} from "./m706.ts";
import {Rs,_N} from "./m5161.ts";
import {Eet,resolveToolAlias} from "../src/config/2229_observed_uid.ts";
import {setFlagSettingsExpectedContent,setFlagSettingsPath,setParentManagedSettings,setAllowedSettingSources,lt} from "../src/session/0132_sent.ts";
import {Nd,Wt,ps} from "./m230.ts";
import {In,Ce,Ct} from "./m197.ts";
import {C_,lk} from "./m125.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {oas,wm} from "./m707.ts";
import {profileCheckpoint,z9} from "../src/session/0243_profileReport.ts";
import {zyn,OBr} from "./m2037.ts";
import {Mc,W$} from "../src/config/3882_entrypoint.ts";
var yfc={};
ft(yfc,{loadSettingsFromFlag:()=>loadSettingsFromFlag,loadSettingSourcesFromFlag:()=>loadSettingSourcesFromFlag,loadManagedSettingsFromFlag:()=>loadManagedSettingsFromFlag,eagerLoadSettings:()=>eagerLoadSettings});
function loadSettingsFromFlag(e){try{let t=e.trim(),n=t.startsWith("{")&&t.endsWith("}"),r;if(n){let o=ba(t);if(!o)return Rs("Error: Invalid JSON provided to --settings");let s=JSON.stringify(o).replace(/[\u007f-\u009f]/g,(i)=>"\\u"+i.charCodeAt(0).toString(16).toUpperCase().padStart(4,"0"));r=Eet("claude-settings",".json",{contentHash:s}),setFlagSettingsExpectedContent(s)}else{let{resolvedPath:o}=Nd(Wt(),e);try{ffc.readFileSync(o,"utf8")}catch(s){if(In(s))return Rs(`Error: Settings file not found: ${o}`);throw s}r=o}setFlagSettingsPath(r),C_()}catch(t){if(t instanceof Error)logForDebugging(`Error processing --settings: ${Ce(t)}`,{level:"error"});return Rs(`Error processing settings: ${Ce(t)}`)}}
function loadManagedSettingsFromFlag(e){let t=ba(e.trim(),!1);if(!t||typeof t!=="object"||Array.isArray(t)){logForDebugging("--managed-settings ignored: invalid JSON object",{level:"warn"});return}setParentManagedSettings(t),C_()}
function loadSettingSourcesFromFlag(e){try{let t=oas(e);setAllowedSettingSources(t),C_()}catch(t){if(t instanceof Error)logForDebugging(`Invalid --setting-sources flag: ${Ce(t)}`,{level:"error"});return Rs(`Error processing --setting-sources: ${Ce(t)}`)}}
function eagerLoadSettings(){let e=performance.now();profileCheckpoint("eagerLoadSettings_start");let t=zyn("--settings");if(t)loadSettingsFromFlag(t);let n=zyn("--managed-settings");if(n)loadManagedSettingsFromFlag(n);let r=zyn("--setting-sources");if(r!==void 0)loadSettingSourcesFromFlag(r);profileCheckpoint("eagerLoadSettings_end"),Mc("settings_load_ms",performance.now()-e,e)}
var ffc;
var u$o=b(()=>{lt();_N();OBr();qe();Ct();ps();pd();z9();W$();resolveToolAlias();wm();lk();ffc=require("fs")});
export {yfc,loadSettingsFromFlag,loadManagedSettingsFromFlag,loadSettingSourcesFromFlag,eagerLoadSettings,ffc,u$o};
