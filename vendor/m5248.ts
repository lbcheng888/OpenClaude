// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {xh,mf} from "./m702.ts";
import {getSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {b} from "../runtime.ts";
function R$l(){if(process.env.NODE_EXTRA_CA_CERTS)return;let e=pwm();if(e)process.env.NODE_EXTRA_CA_CERTS=e,logForDebugging(`CA certs: Applied NODE_EXTRA_CA_CERTS from config to process.env: ${e}`)}
function pwm(){try{let t=getGlobalConfig()?.env,r=(xh("userSettings")?getSettingsForSource("userSettings"):void 0)?.env;logForDebugging(`CA certs: Config fallback - globalEnv keys: ${t?Object.keys(t).join(","):"none"}, settingsEnv keys: ${r?Object.keys(r).join(","):"none"}`);let o=r?.NODE_EXTRA_CA_CERTS||t?.NODE_EXTRA_CA_CERTS;if(o)logForDebugging(`CA certs: Found NODE_EXTRA_CA_CERTS in config/settings: ${o}`);return o}catch(e){logForDebugging(`CA certs: Config fallback failed: ${e}`,{level:"error"});return}}
var x$l=b(()=>{Qn();qe();mf();yr()});
export {R$l,pwm,x$l};
