// @ts-nocheck
import {b} from "../runtime.ts";
import {Ai,et} from "./m2208.ts";
import {Ag,SandboxManager} from "./m2671.ts";
import {Fxl,Bxl} from "./m4993.ts";
var qlm,Uxl;
var $xl=b(()=>{Ai();Ag();qlm={name:"sandbox",get description(){let e=SandboxManager.isSandboxingEnabled(),t=SandboxManager.isAutoAllowBashIfSandboxedEnabled(),n=SandboxManager.areUnsandboxedCommandsAllowed(),r=SandboxManager.areSandboxSettingsLockedByPolicy(),o=SandboxManager.checkDependencies().errors.length===0,s;if(!o)s=et.warning;else s=e?et.tick:et.circle;let i="sandbox disabled";if(e)i=t?"sandbox enabled (auto-allow)":"sandbox enabled",i+=n?", fallback allowed":"";if(r)i+=" (managed)";return`${s} ${i} (\u23CE to configure)`},argumentHint:'exclude "command pattern"',get isHidden(){return!SandboxManager.isSupportedPlatform()||!SandboxManager.isPlatformInEnabledList()},immediate:!0,type:"local-jsx",load:()=>Promise.resolve().then(() => (Fxl(),Bxl))},Uxl=qlm});
export {qlm,Uxl,$xl};
