// @ts-nocheck
import {b} from "../runtime.ts";
import {Zs,Xe} from "./m2216.ts";
import {Uh,SandboxManager} from "./m2682.ts";
import {sMl,rMl} from "./m5023.ts";
var eym,iMl;
var aMl=b(()=>{Zs();Uh();eym={name:"sandbox",get description(){let e=SandboxManager.isSandboxingEnabled(),t=SandboxManager.isAutoAllowBashIfSandboxedEnabled(),n=SandboxManager.areUnsandboxedCommandsAllowed(),r=SandboxManager.areSandboxSettingsLockedByPolicy()||SandboxManager.areUnsandboxedCommandsForbiddenByPolicy(),o=SandboxManager.checkDependencies().errors.length===0,s;if(!o)s=Xe.warning;else s=e?Xe.tick:Xe.circle;let i="sandbox disabled";if(e)i=t?"sandbox enabled (auto-allow)":"sandbox enabled",i+=n?", fallback allowed":"";if(r)i+=" (managed)";return`${s} ${i} (\u23CE to configure)`},argumentHint:'exclude "command pattern"',get isHidden(){return!SandboxManager.isSupportedPlatform()||!SandboxManager.isPlatformInEnabledList()},immediate:!0,type:"local-jsx",load:()=>Promise.resolve().then(() => (sMl(),rMl))},iMl=eym});
export {eym,iMl,aMl};
