// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Fa,Pd} from "./m701.ts";
import {Fs,qU} from "./m5131.ts";
import {SQe,Mw} from "../src/config/2221_recursive.ts";
import {setFlagSettingsExpectedContent,setFlagSettingsPath,setParentManagedSettings,setAllowedSettingSources,lt} from "../src/session/0131_sent.ts";
import {jp,jt,ws} from "./m228.ts";
import {Pn,Se,bt} from "./m195.ts";
import {f_,Kx} from "./m128.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {lts,mf} from "./m702.ts";
import {profileCheckpoint,x3} from "../src/session/0241_profileReport.ts";
import {mhn,iMr} from "./m2032.ts";
import {tu,_9} from "../src/config/3864_entrypoint.ts";
var ksc={};
isFullscreenWithTTY(ksc,{loadSettingsFromFlag:()=>loadSettingsFromFlag,loadSettingSourcesFromFlag:()=>loadSettingSourcesFromFlag,loadManagedSettingsFromFlag:()=>loadManagedSettingsFromFlag,eagerLoadSettings:()=>eagerLoadSettings});
function loadSettingsFromFlag(e){try{let t=e.trim(),n=t.startsWith("{")&&t.endsWith("}"),r;if(n){let o=Fa(t);if(!o)return Fs("Error: Invalid JSON provided to --settings");let s=JSON.stringify(o).replace(/[\u007f-\u009f]/g,(i)=>"\\u"+i.charCodeAt(0).toString(16).toUpperCase().padStart(4,"0"));r=SQe("claude-settings",".json",{contentHash:s}),setFlagSettingsExpectedContent(s)}else{let{resolvedPath:o}=jp(jt(),e);try{vsc.readFileSync(o,"utf8")}catch(s){if(Pn(s))return Fs(`Error: Settings file not found: ${o}`);throw s}r=o}setFlagSettingsPath(r),f_()}catch(t){if(t instanceof Error)logForDebugging(`Error processing --settings: ${Se(t)}`,{level:"error"});return Fs(`Error processing settings: ${Se(t)}`)}}
function loadManagedSettingsFromFlag(e){let t=Fa(e.trim(),!1);if(!t||typeof t!=="object"||Array.isArray(t)){logForDebugging("--managed-settings ignored: invalid JSON object",{level:"warn"});return}setParentManagedSettings(t),f_()}
function loadSettingSourcesFromFlag(e){try{let t=lts(e);setAllowedSettingSources(t),f_()}catch(t){if(t instanceof Error)logForDebugging(`Invalid --setting-sources flag: ${Se(t)}`,{level:"error"});return Fs(`Error processing --setting-sources: ${Se(t)}`)}}
function eagerLoadSettings(){let e=performance.now();profileCheckpoint("eagerLoadSettings_start");let t=mhn("--settings");if(t)loadSettingsFromFlag(t);let n=mhn("--managed-settings");if(n)loadManagedSettingsFromFlag(n);let r=mhn("--setting-sources");if(r!==void 0)loadSettingSourcesFromFlag(r);profileCheckpoint("eagerLoadSettings_end"),tu("settings_load_ms",performance.now()-e,e)}
var vsc;
var B1o=b(()=>{lt();qU();iMr();qe();bt();ws();Pd();x3();_9();Mw();mf();Kx();vsc=require("fs")});
export {ksc,loadSettingsFromFlag,loadManagedSettingsFromFlag,loadSettingSourcesFromFlag,eagerLoadSettings,vsc,B1o};
