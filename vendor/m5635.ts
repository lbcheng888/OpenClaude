// @ts-nocheck
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function Orc(){let e=process.env.TERM_PROGRAM;if(!e)return;let t=O9m[e.toLowerCase()];if(!t)return;if(getGlobalConfig().deepLinkTerminal===t)return;saveGlobalConfig((r)=>({...r,deepLinkTerminal:t})),logForDebugging(`Stored deep link terminal preference: ${t}`)}
var O9m;
var Lrc=b(()=>{Qn();qe();O9m={iterm:"iTerm","iterm.app":"iTerm",ghostty:"Ghostty",kitty:"kitty",alacritty:"Alacritty",wezterm:"WezTerm",apple_terminal:"Terminal"}});
export {Orc,O9m,Lrc};
