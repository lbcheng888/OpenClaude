// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {fK,p0} from "./m236.ts";
var L3r={};
ft(L3r,{stopCapturingEarlyInput:()=>stopCapturingEarlyInput,startCapturingEarlyInput:()=>startCapturingEarlyInput,seedEarlyInput:()=>seedEarlyInput,processChunk:()=>processChunk,isCapturingEarlyInput:()=>isCapturingEarlyInput,hasEarlyInput:()=>hasEarlyInput,consumeEarlyInput:()=>consumeEarlyInput});
function startCapturingEarlyInput(){if(!process.stdin.isTTY||ntt||process.argv.includes("-p")||process.argv.includes("--print"))return;ntt=!0,SZ="";try{process.stdin.setEncoding("utf8"),process.stdin.setRawMode(!0),process.stdin.ref(),jDt=()=>{let e=process.stdin.read();while(e!==null){if(typeof e==="string")processChunk(e);e=process.stdin.read()}},process.stdin.on("readable",jDt)}catch{ntt=!1}}
function processChunk(e){let t=0;while(t<e.length){let n=e[t],r=n.charCodeAt(0);if(r===3){stopCapturingEarlyInput(),process.exit(130);return}if(r===4){stopCapturingEarlyInput();return}if(r===127||r===8){if(SZ.length>0){let o=fK(SZ);SZ=SZ.slice(0,-(o.length||1))}t++;continue}if(r===27){t++;let o=t<e.length?e.charCodeAt(t):-1;if(o===91){t++;while(t<e.length&&e.charCodeAt(t)<64)t++;if(t<e.length)t++}else if(o===93||o===80||o===88||o===94||o===95){t++;while(t<e.length){let s=e.charCodeAt(t);if(s===7){t++;break}if(s===27&&t+1<e.length&&e.charCodeAt(t+1)===92){t+=2;break}t++}}else if(o===79)t+=2;else if(o!==-1&&o!==27)t++;continue}if(r<32&&r!==9&&r!==10&&r!==13){t++;continue}if(r===13){SZ+=`
`,t++;continue}SZ+=n,t++}}
function stopCapturingEarlyInput(){if(!ntt)return;if(ntt=!1,jDt)process.stdin.removeListener("readable",jDt),jDt=null}
function consumeEarlyInput(){stopCapturingEarlyInput();let e=SZ.trim();return SZ="",e}
function hasEarlyInput(){return SZ.trim().length>0}
function seedEarlyInput(e){SZ=e}
function isCapturingEarlyInput(){return ntt}
var SZ="",ntt=!1,jDt=null;
var e2e=b(()=>{p0()});
export {L3r,startCapturingEarlyInput,processChunk,stopCapturingEarlyInput,consumeEarlyInput,hasEarlyInput,seedEarlyInput,isCapturingEarlyInput,SZ,ntt,jDt,e2e};
