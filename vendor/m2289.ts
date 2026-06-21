// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {jV,KI} from "./m234.ts";
var oUr={};
isFullscreenWithTTY(oUr,{stopCapturingEarlyInput:()=>stopCapturingEarlyInput,startCapturingEarlyInput:()=>startCapturingEarlyInput,seedEarlyInput:()=>seedEarlyInput,processChunk:()=>processChunk,isCapturingEarlyInput:()=>isCapturingEarlyInput,hasEarlyInput:()=>hasEarlyInput,consumeEarlyInput:()=>consumeEarlyInput});
function startCapturingEarlyInput(){if(!process.stdin.isTTY||eZe||process.argv.includes("-p")||process.argv.includes("--print"))return;eZe=!0,vZ="";try{process.stdin.setEncoding("utf8"),process.stdin.setRawMode(!0),process.stdin.ref(),TIt=()=>{let e=process.stdin.read();while(e!==null){if(typeof e==="string")processChunk(e);e=process.stdin.read()}},process.stdin.on("readable",TIt)}catch{eZe=!1}}
function processChunk(e){let t=0;while(t<e.length){let n=e[t],r=n.charCodeAt(0);if(r===3){stopCapturingEarlyInput(),process.exit(130);return}if(r===4){stopCapturingEarlyInput();return}if(r===127||r===8){if(vZ.length>0){let o=jV(vZ);vZ=vZ.slice(0,-(o.length||1))}t++;continue}if(r===27){t++;let o=t<e.length?e.charCodeAt(t):-1;if(o===91){t++;while(t<e.length&&e.charCodeAt(t)<64)t++;if(t<e.length)t++}else if(o===93||o===80||o===88||o===94||o===95){t++;while(t<e.length){let s=e.charCodeAt(t);if(s===7){t++;break}if(s===27&&t+1<e.length&&e.charCodeAt(t+1)===92){t+=2;break}t++}}else if(o===79)t+=2;else if(o!==-1&&o!==27)t++;continue}if(r<32&&r!==9&&r!==10&&r!==13){t++;continue}if(r===13){vZ+=`
`,t++;continue}vZ+=n,t++}}
function stopCapturingEarlyInput(){if(!eZe)return;if(eZe=!1,TIt)process.stdin.removeListener("readable",TIt),TIt=null}
function consumeEarlyInput(){stopCapturingEarlyInput();let e=vZ.trim();return vZ="",e}
function hasEarlyInput(){return vZ.trim().length>0}
function seedEarlyInput(e){vZ=e}
function isCapturingEarlyInput(){return eZe}
var vZ="",eZe=!1,TIt=null;
var tZe=b(()=>{KI()});
export {oUr,startCapturingEarlyInput,processChunk,stopCapturingEarlyInput,consumeEarlyInput,hasEarlyInput,seedEarlyInput,isCapturingEarlyInput,vZ,eZe,TIt,tZe};
