// @ts-nocheck
import {dc,U8} from "./m1480.ts";
import {yee,Vnt} from "./m3017.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {getSettings_DEPRECATED,updateSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {Se,bt} from "./m195.ts";
import {$xe,Ert} from "./m3139.ts";
import {getProjectRoot,lt} from "../src/session/0131_sent.ts";
import {uae,J1} from "../src/config/2678_withFileTypes.ts";
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
import {u8,Hbt} from "./m637.ts";
function ET(e){let t=x2d(e)?e.manifest.displayName:e.displayName;return Crt(t)??e.name}
function Crt(e){if(typeof e!=="string")return;return e.trim()?e:void 0}
function x2d(e){return"manifest"in e&&typeof e.manifest==="object"&&e.manifest!==null}
function xee(e){return e.source}
function Rkn(e,t){return e.find((n)=>n.repository===t||n.source===t)}
function xkn(){bL.cache?.clear?.(),k2d.cache?.clear?.()}
async function vrt(e,t,n){let r={},o={};for(let[u,d]of Object.entries(t))if(n[u]?.sensitive===!0)o[u]=String(d);else r[u]=d;let s=new Set(Object.keys(o)),i=new Set(Object.keys(r)),a=await dc().mutate((u)=>{let d=u.pluginSecrets?.[e],p=d?yee(d,(f,A)=>i.has(A)):void 0,m=p&&d&&Object.keys(p).length!==Object.keys(d).length;if(Object.keys(o).length===0&&!m)return u;return{...u,pluginSecrets:{...u.pluginSecrets,[e]:{...p,...o}}}});if(!a.success){let u=Error(`Failed to save sensitive plugin options for ${e} to secure storage`);throw logForDebugging(u.message,{level:"error"}),u}if(a.warning)logForDebugging(`Plugin secrets save warning: ${a.warning}`,{level:"warn"});let l=getSettings_DEPRECATED().pluginConfigs?.[e]?.options??{},c=Object.keys(l).filter((u)=>s.has(u));if(Object.keys(r).length>0||c.length>0){let u=Object.fromEntries(c.map((p)=>[p,void 0])),d=updateSettingsForSource("userSettings",{pluginConfigs:{[e]:{options:{...r,...u}}}});if(d.error)throw logForDebugging(`Failed to save plugin options for ${e} to settings.json: ${Se(d.error)}`,{level:"error"}),Error(`Failed to save plugin options for ${e}: ${d.error.message}`)}xkn()}
async function wrt(e){if(getSettings_DEPRECATED().pluginConfigs?.[e]){let n={[e]:void 0},{error:r}=updateSettingsForSource("userSettings",{pluginConfigs:n});if(r)logForDebugging(`deletePluginOptions: failed to clear settings.pluginConfigs[${e}]: ${r.message}`,{level:"warn"})}try{if(!(await dc().mutate((r)=>{if(!r.pluginSecrets)return r;let o=`${e}/`,s=Object.entries(r.pluginSecrets).filter(([i])=>i!==e&&!i.startsWith(o));if(s.length===Object.keys(r.pluginSecrets).length)return r;return{...r,pluginSecrets:s.length>0?Object.fromEntries(s):void 0}})).success)logForDebugging(`deletePluginOptions: failed to clear pluginSecrets for ${e} from keychain`,{level:"warn"})}catch(n){logForDebugging(`deletePluginOptions: storage lock unavailable for ${e}: ${Se(n)}`,{level:"warn"})}xkn()}
function sMt(e){let t=e.manifest.userConfig;if(!t||Object.keys(t).length===0)return{};let n=bL(xee(e)),r={};for(let[o,s]of Object.entries(t)){let i=n[o];if(i===void 0||i===""||s.sensitive!==!0&&!$xe({[o]:i},{[o]:s}).valid)r[o]=s}return r}
function sQi(e,t){let n={};for(let[r,o]of Object.entries(t)){if(o.required&&o.default===void 0)continue;n[r]=o.default??""}return{...n,...e}}
function kee(e,t){let n=(o)=>o,r=e.replace(/\$\{CLAUDE_PLUGIN_ROOT\}/g,()=>n(t.path));if(r=r.replace(/\$\{CLAUDE_PROJECT_DIR\}/g,()=>n(getProjectRoot())),t.source){let o=t.source;r=r.replace(/\$\{CLAUDE_PLUGIN_DATA\}/g,()=>n(uae(o)))}return r}
function Che(e,t){return e.replace(/\$\{user_config\.([^}]+)\}/g,(n,r)=>{let o=t[r];if(o===void 0)throw Error(`Plugin option "${r}" isn't set. Open /plugin manage to configure it, or check that the plugin's userConfig schema declares "${r}".`);return String(o)})}
function kkn(e,t,n,r){return e.replace(/\$\{user_config\.([^}]+)\}/g,(o,s)=>{if(n[s]?.sensitive===!0)return`[sensitive option '${s}' not available in skill content]`;let i=t[s];if(i===void 0)return o;let a=String(i);return r?r(a):a})}
var bL,k2d;
var Hq=b(()=>{ta();Vnt();lt();qe();bt();u8();U8();yr();Ert();J1();bL=wn((e)=>{let n=getSettings_DEPRECATED().pluginConfigs?.[e]?.options??{},o=dc().read()?.pluginSecrets?.[e]??{};return{...n,...o}}),k2d=Hbt(async(e)=>{let n=getSettings_DEPRECATED().pluginConfigs?.[e]?.options??{},o=(await dc().readAsync())?.pluginSecrets?.[e]??{};return{...n,...o}})});
export {ET,Crt,x2d,xee,Rkn,xkn,vrt,wrt,sMt,sQi,kee,Che,kkn,bL,k2d,Hq};
