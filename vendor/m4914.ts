// @ts-nocheck
import {b} from "../runtime.ts";
import {Ir} from "./m584.ts";
import {Ne} from "./m583.ts";
import {cwe,CLi} from "./m2528.ts";
var cxl,Gfm,$Io;
var uxl=b(()=>{Ir();cxl={ghostty:"Ghostty",kitty:"Kitty",WarpTerminal:"Warp",WezTerm:"WezTerm","windows-terminal":"Windows Terminal"},Gfm={type:"local-jsx",name:"terminal-setup",get description(){if(Ne.terminal==="Apple_Terminal")return"Enable Option+Enter key binding for newlines and visual bell";if(Ne.terminal!==null&&Object.hasOwn(cxl,Ne.terminal))return`Check terminal setup (Shift+Enter is natively supported in ${cxl[Ne.terminal]})`;if(process.env.__CFBundleIdentifier==="com.googlecode.iterm2"&&(Ne.terminal==="iTerm.app"||Ne.terminal==="tmux"||Ne.terminal==="screen"||Ne.terminal===null))return"Enable iTerm2 clipboard access for /copy";return"Install Shift+Enter key binding for newlines"},requires:{ink:!0},load:()=>Promise.resolve().then(() => (cwe(),CLi))},$Io=Gfm});
export {cxl,Gfm,$Io,uxl};
