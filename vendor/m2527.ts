// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {execFileNoThrow,Ii} from "./m690.ts";
import {b} from "../runtime.ts";
import {Kve} from "./m2431.ts";
import {a4} from "./m2436.ts";
import {rT} from "./m1294.ts";
import {Ct} from "./m197.ts";
function uAd(){let e=process.env.SHELL||"",t=_Li.homedir(),n=kie.join(t,".claude");if(e.endsWith("/zsh")||e.endsWith("/zsh.exe")){let r=kie.join(n,"completion.zsh");return{name:"zsh",rcFile:kie.join(t,".zshrc"),cacheFile:r,completionLine:`[[ -f "${r}" ]] && source "${r}"`,shellFlag:"zsh"}}if(e.endsWith("/bash")||e.endsWith("/bash.exe")){let r=kie.join(n,"completion.bash");return{name:"bash",rcFile:kie.join(t,".bashrc"),cacheFile:r,completionLine:`[ -f "${r}" ] && source "${r}"`,shellFlag:"bash"}}if(e.endsWith("/fish")||e.endsWith("/fish.exe")){let r=process.env.XDG_CONFIG_HOME||kie.join(t,".config"),o=kie.join(n,"completion.fish");return{name:"fish",rcFile:kie.join(r,"fish","config.fish"),cacheFile:o,completionLine:`[ -f "${o}" ] && source "${o}"`,shellFlag:"fish"}}return null}
async function m5r(){let e=uAd();if(!e)return;logForDebugging(`update: Regenerating ${e.name} completion cache`);let t=process.argv[1]||"claude";if((await execFileNoThrow(t,["completion",e.shellFlag,"--output",e.cacheFile])).code!==0){logForDebugging(`update: Failed to regenerate ${e.name} completion cache`);return}logForDebugging(`update: Regenerated ${e.name} completion cache at ${e.cacheFile}`)}
var _Li,kie;
var f5r=b(()=>{Kve();a4();rT();qe();Ct();Ii();_Li=require("os"),kie=require("path")});
export {uAd,m5r,_Li,kie,f5r};
