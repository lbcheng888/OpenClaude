// @ts-nocheck
import {getSettings_DEPRECATED,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {Zg,AN} from "../src/telemetry/5180_commandWithoutRedirections.ts";
import {HAo,Gq,kAo,L6e,HL} from "../src/tools/4363_stripAllEnvVars.ts";
import {isScrubEnabled,isScrubSandboxAvailable,P1} from "../src/agent/2223_subprocessEnv.ts";
import {SandboxManager,Ag} from "./m2671.ts";
import {b} from "../runtime.ts";
import {zn} from "../src/api/2198_stopPeriodicGrowthBookRefresh.ts";
import {dr} from "./m231.ts";
function JTm(e){let n=getSettings_DEPRECATED().sandbox?.excludedCommands??[];if(n.length===0)return!1;let r;try{r=Zg(e)}catch{r=[e]}for(let o of r){let i=[o.trim()],a=new Set(i),l=0;while(l<i.length){let c=i.length;for(let u=l;u<c;u++){let d=i[u],p=HAo(d,YTm);if(!a.has(p))i.push(p),a.add(p);let m=Gq(d);if(!a.has(m))i.push(m),a.add(m)}l=c}for(let c of n){let u=kAo(c);for(let d of i)switch(u.type){case"prefix":if(d===u.prefix||d.startsWith(u.prefix+" "))return!0;break;case"exact":if(d===u.command)return!0;break;case"wildcard":if(L6e(u.pattern,d))return!0;break}}}return!1}
function KL(e){if(isScrubEnabled()&&isScrubSandboxAvailable())return!0;if(!SandboxManager.isSandboxingEnabled())return!1;if(e.dangerouslyDisableSandbox&&SandboxManager.areUnsandboxedCommandsAllowed())return!1;if(!e.command)return!1;if(JTm(e.command))return!1;return!0}
var YTm;
var t6e=b(()=>{zn();AN();Ag();yr();dr();P1();HL();YTm=/^(LD_|DYLD_|PATH$)/});
export {JTm,KL,YTm,t6e};
