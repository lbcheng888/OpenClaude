// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {execFileNoThrow,oa} from "./m684.ts";
import {b} from "../runtime.ts";
import {lwe} from "./m2421.ts";
import {U4} from "./m2426.ts";
import {pT} from "./m1289.ts";
import {bt} from "./m195.ts";
function Bmd(){let e=process.env.SHELL||"",t=Xki.homedir(),n=Pie.join(t,".claude");if(e.endsWith("/zsh")||e.endsWith("/zsh.exe")){let r=Pie.join(n,"completion.zsh");return{name:"zsh",rcFile:Pie.join(t,".zshrc"),cacheFile:r,completionLine:`[[ -f "${r}" ]] && source "${r}"`,shellFlag:"zsh"}}if(e.endsWith("/bash")||e.endsWith("/bash.exe")){let r=Pie.join(n,"completion.bash");return{name:"bash",rcFile:Pie.join(t,".bashrc"),cacheFile:r,completionLine:`[ -f "${r}" ] && source "${r}"`,shellFlag:"bash"}}if(e.endsWith("/fish")||e.endsWith("/fish.exe")){let r=process.env.XDG_CONFIG_HOME||Pie.join(t,".config"),o=Pie.join(n,"completion.fish");return{name:"fish",rcFile:Pie.join(r,"fish","config.fish"),cacheFile:o,completionLine:`[ -f "${o}" ] && source "${o}"`,shellFlag:"fish"}}return null}
async function L9r(){let e=Bmd();if(!e)return;logForDebugging(`update: Regenerating ${e.name} completion cache`);let t=process.argv[1]||"claude";if((await execFileNoThrow(t,["completion",e.shellFlag,"--output",e.cacheFile])).code!==0){logForDebugging(`update: Failed to regenerate ${e.name} completion cache`);return}logForDebugging(`update: Regenerated ${e.name} completion cache at ${e.cacheFile}`)}
var Xki,Pie;
var M9r=b(()=>{lwe();U4();pT();qe();bt();oa();Xki=require("os"),Pie=require("path")});
export {Bmd,L9r,Xki,Pie,M9r};
