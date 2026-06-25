// @ts-nocheck
import {getFastModeModelDisplayName,lr} from "./m233.ts";
import {b} from "../runtime.ts";
function vPn(e){return e.replace(/`[^`\n]+`/g,(t,n)=>{let r=e[n-1];return r==="!"||r==="`"?t:"`"+getFastModeModelDisplayName(" ",t.length-2)+"`"})}
function PW(e){return e.replace(/`!/g,"` !").replace(/!`/g,"! `").replace(/(^|\s)!/gm,"$1\\!")}
var _3e=b(()=>{lr()});
export {vPn,PW,_3e};
