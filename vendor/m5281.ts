// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {xh,wm} from "./m707.ts";
import {getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {b} from "../runtime.ts";
function yGl(){if(process.env.NODE_EXTRA_CA_CERTS)return;let e=kOm();if(e)process.env.NODE_EXTRA_CA_CERTS=e,logForDebugging(`CA certs: Applied NODE_EXTRA_CA_CERTS from config to process.env: ${e}`)}
function kOm(){try{let t=getGlobalConfig()?.env,r=(xh("userSettings")?getSettingsForSource("userSettings"):void 0)?.env;logForDebugging(`CA certs: Config fallback - globalEnv keys: ${t?Object.keys(t).join(","):"none"}, settingsEnv keys: ${r?Object.keys(r).join(","):"none"}`);let o=r?.NODE_EXTRA_CA_CERTS||t?.NODE_EXTRA_CA_CERTS;if(o)logForDebugging(`CA certs: Found NODE_EXTRA_CA_CERTS in config/settings: ${o}`);return o}catch(e){logForDebugging(`CA certs: Config fallback failed: ${e}`,{level:"error"});return}}
var TGl=b(()=>{tr();qe();wm();br()});
export {yGl,kOm,TGl};
