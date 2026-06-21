// @ts-nocheck
import {useTerminalFocus} from "./m2380.ts";
import {useAnimationFrame} from "../src/config/2442_isVisible.ts";
import {b} from "../runtime.ts";
import {ze} from "./m2452.ts";
function gMa(e,t=LSp){let n=useTerminalFocus(),[r,o]=useAnimationFrame(e&&n?t:null);if(!e||!n)return[r,!0];let s=Math.floor(o/t)%2===0;return[r,s]}
var LSp=600;
var _Ma=b(()=>{ze()});
export {gMa,LSp,_Ma};
