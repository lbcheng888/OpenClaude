// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {getSettings_DEPRECATED,getSettingsFilePathForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {Yt,Es} from "./m641.ts";
import {SandboxManager,addToExcludedCommands,Uh} from "./m2682.ts";
import {color} from "./m2431.ts";
import {eMl,tMl} from "./m5022.ts";
import {getCwdState,lt} from "../src/session/0132_sent.ts";
import {je} from "./m2462.ts";
import {oe} from "./m2275.ts";
var rMl={};
ft(rMl,{call:()=>Z_m});
async function Z_m(e,t,n){let o=getSettings_DEPRECATED().theme||"light",s=Yt();if(!SandboxManager.isSupportedPlatform()){let l=s==="wsl"?"Error: Sandboxing requires WSL2. WSL1 is not supported.":"Error: Sandboxing is currently only supported on macOS, Linux, and WSL2.",c=color("error",o)(l);return e(c),null}let i=SandboxManager.checkDependencies();if(!SandboxManager.isPlatformInEnabledList()){let l=color("error",o)(`Error: Sandboxing is disabled for this platform (${s}) via the enabledPlatforms setting.`);return e(l),null}if(SandboxManager.areSandboxSettingsLockedByPolicy()){let l=color("error",o)("Error: Sandbox settings are overridden by a higher-priority configuration and cannot be changed locally.");return e(l),null}let a=n?.trim()||"";if(!a)return oMl.jsx(eMl,{onComplete:e,depCheck:i});if(a){let c=a.split(" ")[0];if(c==="exclude"){let u=a.slice(8).trim();if(!u){let h=color("error",o)('Error: Please provide a command pattern to exclude (e.g., /sandbox exclude "npm run test:*")');return e(h),null}let d=u.replace(/^["']|["']$/g,"");addToExcludedCommands(d);let p=getSettingsFilePathForSource("localSettings"),m=p?nMl.relative(getCwdState(),p):".claude/settings.local.json",f=color("success",o)(`Added "${d}" to excluded commands in ${m}`);return e(f),null}else{let u=color("error",o)(`Error: Unknown subcommand "${c}". Available subcommand: exclude`);return e(u),null}}return null}
var nMl,oMl;
var sMl=b(()=>{lt();tMl();je();Es();Uh();br();nMl=require("path"),oMl=x(oe(),1)});
export {rMl,Z_m,nMl,oMl,sMl};
