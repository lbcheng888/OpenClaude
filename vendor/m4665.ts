// @ts-nocheck
import {NP,V6,U0,hS} from "../src/config/4438_source.ts";
import {JUe,jie,aDi,HAe} from "./m2596.ts";
import {cP,gs,sh} from "./m2589.ts";
import {Uv,nI} from "./m3252.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {vqt,tue} from "../src/config/4442_ref.ts";
import {Se,bt} from "./m195.ts";
import {loadAllPluginsCacheOnly,gg} from "../src/agent/4445_resolvePluginRoot.ts";
import {q3r,N5} from "./m2583.ts";
import {fs} from "../src/api/0459_getOauthConfig.ts";
import {b} from "../runtime.ts";
async function sye(e){let t=new Map;for(let a of e){if(a.type!=="dependency-unsatisfied"||a.reason!=="not-found")continue;let l=t.get(a.dependency);if(!l)l=new Set,t.set(a.dependency,l);l.add(a.source)}if(t.size===0)return{installed:[],stillUnresolved:[],marketplaceMissing:[]};let n=await NP(),r=lYp.map((a)=>[a,JUe(cP(a))]),o=[],s=[],i=[];for(let[a,l]of t){let c=gs(a).marketplace;if(!c||!n[c]){s.push(a),i.push(a);continue}if(!Uv(n[c].source)){logForDebugging(`resolveMissingDependencies: skipping "${a}" \u2014 marketplace "${c}" is blocked by enterprise policy`),s.push(a);continue}let u=!1;for(let d of l){let p=gs(d).marketplace;if(p===c){u=!0;break}if(!p)continue;if((await V6(p))?.allowCrossMarketplaceDependenciesOn?.includes(c)){u=!0;break}}if(!u){logForDebugging(`resolveMissingDependencies: skipping "${a}" \u2014 cross-marketplace dependency not in any declaring marketplace's allowlist`),s.push(a);continue}try{let d=await U0(a);if(!d){s.push(a);continue}let p=cYp(l,r),m=await vqt({pluginId:a,entry:d.entry,scope:p??"user",marketplaceInstallLocation:d.marketplaceInstallLocation,trigger:"dependency-resolution",auto:p!==void 0,requiredByEnabledDependent:!0});if(m.ok){for(let f of m.closure)if(!o.includes(f))o.push(f)}else logForDebugging(`resolveMissingDependencies: install of "${a}" did not complete (${m.reason})`,{level:"warn"}),s.push(a)}catch(d){logForDebugging(`resolveMissingDependencies: install of "${a}" threw: ${Se(d)}`,{level:"warn"}),s.push(a)}}return{installed:o,stillUnresolved:s,marketplaceMissing:i}}
async function USo(e){let{errors:t}=await loadAllPluginsCacheOnly();return t.filter(q3r).filter((n)=>n.source===e)}
async function cmt(e){let t=await USo(e);if(t.length===0)return null;let{installed:n,marketplaceMissing:r}=await sye(t),o=new Set(n),s=fs(t.map((i)=>i.dependency)).filter((i)=>!o.has(i));return{suffix:`${jie(n)}${aDi(s,r)}`,changed:n.length>0}}
function cYp(e,t){for(let[n,r]of t)for(let o of e)if(r.has(o))return n;return}
var lYp;
var CDe=b(()=>{N5();qe();bt();HAe();hS();sh();tue();gg();nI();lYp=["user","project","local"]});
export {sye,USo,cmt,cYp,lYp,CDe};
