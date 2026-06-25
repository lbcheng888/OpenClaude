// @ts-nocheck
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function Epc(){let e=process.env.TERM_PROGRAM;if(!e)return;let t=iKm[e.toLowerCase()];if(!t)return;if(getGlobalConfig().deepLinkTerminal===t)return;saveGlobalConfig((r)=>({...r,deepLinkTerminal:t})),logForDebugging(`Stored deep link terminal preference: ${t}`)}
var iKm;
var Cpc=b(()=>{tr();qe();iKm={iterm:"iTerm","iterm.app":"iTerm",ghostty:"Ghostty",kitty:"kitty",alacritty:"Alacritty",wezterm:"WezTerm",apple_terminal:"Terminal"}});
export {Epc,iKm,Cpc};
