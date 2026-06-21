// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {getSettings_DEPRECATED,getSettingsFilePathForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {zt,qs} from "./m635.ts";
import {SandboxManager,addToExcludedCommands,Ag} from "./m2671.ts";
import {No} from "./m2421.ts";
import {Oxl,Lxl} from "./m4992.ts";
import {getCwdState,lt} from "../src/session/0131_sent.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
var Bxl={};
isFullscreenWithTTY(Bxl,{call:()=>$lm});
async function $lm(e,t,n){let o=getSettings_DEPRECATED().theme||"light",s=zt();if(!SandboxManager.isSupportedPlatform()){let l=s==="wsl"?"Error: Sandboxing requires WSL2. WSL1 is not supported.":"Error: Sandboxing is currently only supported on macOS, Linux, and WSL2.",c=No("error",o)(l);return e(c),null}let i=SandboxManager.checkDependencies();if(!SandboxManager.isPlatformInEnabledList()){let l=No("error",o)(`Error: Sandboxing is disabled for this platform (${s}) via the enabledPlatforms setting.`);return e(l),null}if(SandboxManager.areSandboxSettingsLockedByPolicy()){let l=No("error",o)("Error: Sandbox settings are overridden by a higher-priority configuration and cannot be changed locally.");return e(l),null}let a=n?.trim()||"";if(!a)return Nxl.default.createElement(Oxl,{onComplete:e,depCheck:i});if(a){let c=a.split(" ")[0];if(c==="exclude"){let u=a.slice(8).trim();if(!u){let A=No("error",o)('Error: Please provide a command pattern to exclude (e.g., /sandbox exclude "npm run test:*")');return e(A),null}let d=u.replace(/^["']|["']$/g,"");addToExcludedCommands(d);let p=getSettingsFilePathForSource("localSettings"),m=p?Mxl.relative(getCwdState(),p):".claude/settings.local.json",f=No("success",o)(`Added "${d}" to excluded commands in ${m}`);return e(f),null}else{let u=No("error",o)(`Error: Unknown subcommand "${c}". Available subcommand: exclude`);return e(u),null}}return null}
var Mxl,Nxl;
var Fxl=b(()=>{lt();Lxl();ze();qs();Ag();yr();Mxl=require("path"),Nxl=M(Te(),1)});
export {Bxl,$lm,Mxl,Nxl,Fxl};
