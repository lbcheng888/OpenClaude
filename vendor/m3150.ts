// @ts-nocheck
import {ql,e8} from "./m1485.ts";
import {BN,IEe} from "./m452.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {getSettings_DEPRECATED,ao,br} from "../src/config/0745_updateSettingsForSource.ts";
import {Ce,Ct} from "./m197.ts";
import {HHe,wst} from "./m3149.ts";
import {getProjectRoot,lt} from "../src/session/0132_sent.ts";
import {aae,a1} from "../src/config/2689_withFileTypes.ts";
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
import {v5,nRt} from "./m643.ts";
function yT(e){let t=cVd(e)?e.manifest.displayName:e.displayName;return kst(t)??e.name}
function kst(e){if(typeof e!=="string")return;return e.trim()?e:void 0}
function cVd(e){return"manifest"in e&&typeof e.manifest==="object"&&e.manifest!==null}
function Aee(e){return e.source}
function gxn(e,t){return e.find((n)=>n.repository===t||n.source===t)}
function _xn(){$O.cache?.clear?.(),uVd.cache?.clear?.()}
async function Hst(e,t,n){let r={},o={};for(let[u,d]of Object.entries(t))if(n[u]?.sensitive===!0)o[u]=String(d);else r[u]=d;let s=new Set(Object.keys(o)),i=new Set(Object.keys(r)),a=await ql().mutate((u)=>{let d=u.pluginSecrets?.[e],p=d?BN(d,(f,h)=>i.has(h)):void 0,m=p&&d&&Object.keys(p).length!==Object.keys(d).length;if(Object.keys(o).length===0&&!m)return u;return{...u,pluginSecrets:{...u.pluginSecrets,[e]:{...p,...o}}}});if(!a.success){let u=Error(`Failed to save sensitive plugin options for ${e} to secure storage`);throw logForDebugging(u.message,{level:"error"}),u}if(a.warning)logForDebugging(`Plugin secrets save warning: ${a.warning}`,{level:"warn"});let l=getSettings_DEPRECATED().pluginConfigs?.[e]?.options??{},c=Object.keys(l).filter((u)=>s.has(u));if(Object.keys(r).length>0||c.length>0){let u=Object.fromEntries(c.map((p)=>[p,void 0])),d=ao("userSettings",{pluginConfigs:{[e]:{options:{...r,...u}}}});if(d.error)throw logForDebugging(`Failed to save plugin options for ${e} to settings.json: ${Ce(d.error)}`,{level:"error"}),Error(`Failed to save plugin options for ${e}: ${d.error.message}`)}_xn()}
async function Ist(e){if(getSettings_DEPRECATED().pluginConfigs?.[e]){let n={[e]:void 0},{error:r}=ao("userSettings",{pluginConfigs:n});if(r)logForDebugging(`deletePluginOptions: failed to clear settings.pluginConfigs[${e}]: ${r.message}`,{level:"warn"})}try{if(!(await ql().mutate((r)=>{if(!r.pluginSecrets)return r;let o=`${e}/`,s=Object.entries(r.pluginSecrets).filter(([i])=>i!==e&&!i.startsWith(o));if(s.length===Object.keys(r.pluginSecrets).length)return r;return{...r,pluginSecrets:s.length>0?Object.fromEntries(s):void 0}})).success)logForDebugging(`deletePluginOptions: failed to clear pluginSecrets for ${e} from keychain`,{level:"warn"})}catch(n){logForDebugging(`deletePluginOptions: storage lock unavailable for ${e}: ${Ce(n)}`,{level:"warn"})}_xn()}
function PNt(e){let t=e.manifest.userConfig;if(!t||Object.keys(t).length===0)return{};let n=$O(Aee(e)),r={};for(let[o,s]of Object.entries(t)){let i=n[o];if(i===void 0||i===""||s.sensitive!==!0&&!HHe({[o]:i},{[o]:s}).valid)r[o]=s}return r}
function Qoa(e,t){let n={};for(let[r,o]of Object.entries(t)){if(o.required&&o.default===void 0)continue;n[r]=o.default??""}return{...n,...e}}
function Ree(e,t){let n=(o)=>o,r=e.replace(/\$\{CLAUDE_PLUGIN_ROOT\}/g,()=>n(t.path));if(r=r.replace(/\$\{CLAUDE_PROJECT_DIR\}/g,()=>n(getProjectRoot())),t.source){let o=t.source;r=r.replace(/\$\{CLAUDE_PLUGIN_DATA\}/g,()=>n(aae(o)))}return r}
function Lge(e,t){return e.replace(/\$\{user_config\.([^}]+)\}/g,(n,r)=>{let o=t[r];if(o===void 0)throw Error(`Plugin option "${r}" isn't set. Open /plugin manage to configure it, or check that the plugin's userConfig schema declares "${r}".`);return String(o)})}
function yxn(e,t,n,r){return e.replace(/\$\{user_config\.([^}]+)\}/g,(o,s)=>{if(n[s]?.sensitive===!0)return`[sensitive option '${s}' not available in skill content]`;let i=t[s];if(i===void 0)return o;let a=String(i);return r?r(a):a})}
var $O,uVd;
var V4=b(()=>{Wi();IEe();lt();qe();Ct();v5();e8();br();wst();a1();$O=Hn((e)=>{let n=getSettings_DEPRECATED().pluginConfigs?.[e]?.options??{},o=ql().read()?.pluginSecrets?.[e]??{};return{...n,...o}}),uVd=nRt(async(e)=>{let n=getSettings_DEPRECATED().pluginConfigs?.[e]?.options??{},o=(await ql().readAsync())?.pluginSecrets?.[e]??{};return{...n,...o}})});
export {yT,kst,cVd,Aee,gxn,_xn,Hst,Ist,PNt,Qoa,Ree,Lge,yxn,$O,uVd,V4};
