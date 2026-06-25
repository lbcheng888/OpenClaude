// @ts-nocheck
import {getSettings_DEPRECATED,br} from "../src/config/0745_updateSettingsForSource.ts";
import {u_,H1} from "../src/telemetry/5213_commandWithoutRedirections.ts";
import {bSo,aq,SSo,l8e,jO} from "../src/tools/4385_stripAllEnvVars.ts";
import {isScrubEnabled,isScrubSandboxAvailable,VM} from "../src/agent/2231_subprocessEnv.ts";
import {SandboxManager,Uh} from "./m2682.ts";
import {b} from "../runtime.ts";
import {jn} from "../src/api/2204_stopPeriodicGrowthBookRefresh.ts";
import {lr} from "./m233.ts";
function _Im(e){let n=getSettings_DEPRECATED().sandbox?.excludedCommands??[];if(n.length===0)return!1;let r;try{r=u_(e)}catch{r=[e]}for(let o of r){let i=[o.trim()],a=new Set(i),l=0;while(l<i.length){let c=i.length;for(let u=l;u<c;u++){let d=i[u],p=bSo(d,gIm);if(!a.has(p))i.push(p),a.add(p);let m=aq(d);if(!a.has(m))i.push(m),a.add(m)}l=c}for(let c of n){let u=SSo(c);for(let d of i)switch(u.type){case"prefix":if(d===u.prefix||d.startsWith(u.prefix+" "))return!0;break;case"exact":if(d===u.command)return!0;break;case"wildcard":if(l8e(u.pattern,d))return!0;break}}}return!1}
function buildDefaultSystemPromptSections(e){if(isScrubEnabled()&&isScrubSandboxAvailable())return!0;if(!SandboxManager.isSandboxingEnabled())return!1;if(e.dangerouslyDisableSandbox&&SandboxManager.areUnsandboxedCommandsAllowed())return!1;if(!e.command)return!1;if(_Im(e.command))return!1;return!0}
var gIm;
var A5e=b(()=>{jn();H1();Uh();br();lr();VM();jO();gIm=/^(LD_|DYLD_|PATH$)/});
export {_Im,buildDefaultSystemPromptSections,gIm,A5e};
