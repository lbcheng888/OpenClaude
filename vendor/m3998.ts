// @ts-nocheck
import {useTerminalFocus} from "./m2390.ts";
import {useAnimationFrame} from "../src/config/2452_isVisible.ts";
import {b} from "../runtime.ts";
import {je} from "./m2462.ts";
function F9a(e,t=w0p){let n=useTerminalFocus(),[r,o]=useAnimationFrame(e&&n?t:null);if(!e||!n)return[r,!0];let s=Math.floor(o/t)%2===0;return[r,s]}
var w0p=600;
var B9a=b(()=>{je()});
export {F9a,w0p,B9a};
