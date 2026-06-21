// @ts-nocheck
import {uf,dr} from "./m231.ts";
import {b} from "../runtime.ts";
function MIn(e){return e.replace(/`[^`\n]+`/g,(t,n)=>{let r=e[n-1];return r==="!"||r==="`"?t:"`"+uf(" ",t.length-2)+"`"})}
function nY(e){return e.replace(/`!/g,"` !").replace(/!`/g,"! `").replace(/(^|\s)!/gm,"$1\\!")}
var Dot=b(()=>{dr()});
export {MIn,nY,Dot};
