// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {setBgExitCause,mK} from "./m231.ts";
var g7e={};
ft(g7e,{writeToStdout:()=>writeToStdout,writeToStderr:()=>writeToStderr,registerProcessIOErrorHandlers:()=>registerProcessIOErrorHandlers,peekForStdinData:()=>peekForStdinData,iterateStreamUntilClose:()=>iterateStreamUntilClose,handleStreamGoneErrors:()=>handleStreamGoneErrors,exitWithError:()=>exitWithError});
function handleStreamGoneErrors(e,t){e.on("error",(n)=>{if(n.code!==void 0&&zkc.has(n.code)){try{e.destroy?.()}catch{}t?.(n.code)}})}
function registerProcessIOErrorHandlers(e){handleStreamGoneErrors(process.stdin,(t)=>e("stdin",t)),handleStreamGoneErrors(process.stdout,(t)=>e("stdout",t)),handleStreamGoneErrors(process.stderr)}
function eWo(e,t){if(e.destroyed)return;e.write(t)}
function writeToStdout(e){eWo(process.stdout,e)}
function writeToStderr(e){eWo(process.stderr,e)}
function exitWithError(e){console.error(e),setBgExitCause("exit_with_error"),process.exit(1)}
function peekForStdinData(e,t){let n=e;if(n.readableEnded||n.destroyed)return Promise.resolve(!1);return new Promise((r)=>{let o=(l)=>{clearTimeout(a),e.off("end",s),e.off("close",s),e.off("data",i),r(l)},s=()=>o(!1),i=()=>{if(clearTimeout(a),n.readableEnded||n.destroyed)o(!1)},a=setTimeout(o,t,!0);e.once("end",s),e.once("close",s),e.once("data",i)})}
async function*iterateStreamUntilClose(e){if(e.readableEnded||e.destroyed)return;let t=Symbol("stream-closed"),n=!1,r=null,o=()=>{n=!0,r?.()};e.once("close",o);let s=e[Symbol.asyncIterator]();try{while(!n){let i=s.next();i.catch(()=>{});let a=new Promise((c)=>{r=()=>c(t)}),l=await Promise.race([i,a]);if(r=null,l===t||l.done)return;yield String(l.value)}}finally{e.off("close",o),s.return?.().catch(()=>{})}}
var zkc;
var LP=b(()=>{mK();zkc=new Set(["EPIPE","EIO","ENXIO","EBADF"])});
export {g7e,handleStreamGoneErrors,registerProcessIOErrorHandlers,eWo,writeToStdout,writeToStderr,exitWithError,peekForStdinData,iterateStreamUntilClose,zkc,LP};
