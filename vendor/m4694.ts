// @ts-nocheck
import {tP,d6,Z0,dS} from "../src/config/4460_source.ts";
import {J2e,Uie,BNi,Whe} from "./m2607.ts";
import {AD,ts,oh} from "./m2600.ts";
import {jA,II} from "./m3268.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {X5t,Qce} from "../src/config/4464_ref.ts";
import {Ce,Ct} from "./m197.ts";
import {loadAllPluginsCacheOnly,path} from "../src/agent/4467_resolvePluginRoot.ts";
import {T8r,Q8} from "./m2594.ts";
import {os} from "../src/api/0465_getOauthConfig.ts";
import {b} from "../runtime.ts";
async function ITe(e){let t=new Map;for(let a of e){if(a.type!=="dependency-unsatisfied"||a.reason!=="not-found")continue;let l=t.get(a.dependency);if(!l)l=new Set,t.set(a.dependency,l);l.add(a.source)}if(t.size===0)return{installed:[],stillUnresolved:[],marketplaceMissing:[]};let n=await tP(),r=uom.map((a)=>[a,J2e(AD(a))]),o=[],s=[],i=[];for(let[a,l]of t){let c=ts(a).marketplace;if(!c||!n[c]){s.push(a),i.push(a);continue}if(!jA(n[c].source)){logForDebugging(`resolveMissingDependencies: skipping "${a}" \u2014 marketplace "${c}" is blocked by enterprise policy`),s.push(a);continue}let u=!1;for(let d of l){let p=ts(d).marketplace;if(p===c){u=!0;break}if(!p)continue;if((await d6(p))?.allowCrossMarketplaceDependenciesOn?.includes(c)){u=!0;break}}if(!u){logForDebugging(`resolveMissingDependencies: skipping "${a}" \u2014 cross-marketplace dependency not in any declaring marketplace's allowlist`),s.push(a);continue}try{let d=await Z0(a);if(!d){s.push(a);continue}let p=dom(l,r),m=await X5t({pluginId:a,entry:d.entry,scope:p??"user",marketplaceInstallLocation:d.marketplaceInstallLocation,trigger:"dependency-resolution",auto:p!==void 0,requiredByEnabledDependent:!0});if(m.ok){for(let f of m.closure)if(!o.includes(f))o.push(f)}else logForDebugging(`resolveMissingDependencies: install of "${a}" did not complete (${m.reason})`,{level:"warn"}),s.push(a)}catch(d){logForDebugging(`resolveMissingDependencies: install of "${a}" threw: ${Ce(d)}`,{level:"warn"}),s.push(a)}}return{installed:o,stillUnresolved:s,marketplaceMissing:i}}
async function ewo(e){let{errors:t}=await loadAllPluginsCacheOnly();return t.filter(T8r).filter((n)=>n.source===e)}
async function Tht(e){let t=await ewo(e);if(t.length===0)return null;let{installed:n,marketplaceMissing:r}=await ITe(t),o=new Set(n),s=os(t.map((i)=>i.dependency)).filter((i)=>!o.has(i));return{suffix:`${Uie(n)}${BNi(s,r)}`,changed:n.length>0}}
function dom(e,t){for(let[n,r]of t)for(let o of e)if(r.has(o))return n;return}
var uom;
var bPe=b(()=>{Q8();qe();Ct();Whe();dS();oh();Qce();path();II();uom=["user","project","local"]});
export {ITe,ewo,Tht,dom,uom,bPe};
