// @ts-nocheck
import {b} from "../runtime.ts";
import {Lr} from "./m578.ts";
import {je} from "./m577.ts";
import {Cwe,rHi} from "./m2517.ts";
var eCl,Dsm,Evo;
var tCl=b(()=>{Lr();eCl={ghostty:"Ghostty",kitty:"Kitty",WarpTerminal:"Warp",WezTerm:"WezTerm","windows-terminal":"Windows Terminal"},Dsm={type:"local-jsx",name:"terminal-setup",get description(){if(je.terminal==="Apple_Terminal")return"Enable Option+Enter key binding for newlines and visual bell";if(je.terminal!==null&&Object.hasOwn(eCl,je.terminal))return`Check terminal setup (Shift+Enter is natively supported in ${eCl[je.terminal]})`;if(process.env.__CFBundleIdentifier==="com.googlecode.iterm2"&&(je.terminal==="iTerm.app"||je.terminal==="tmux"||je.terminal==="screen"||je.terminal===null))return"Enable iTerm2 clipboard access for /copy";return"Install Shift+Enter key binding for newlines"},requires:{ink:!0},load:()=>Promise.resolve().then(() => (Cwe(),rHi))},Evo=Dsm});
export {eCl,Dsm,Evo,tCl};
