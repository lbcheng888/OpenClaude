// @ts-nocheck
import {sJe} from "./m1669.ts";
import {b} from "../runtime.ts";
import {jHr} from "./m1670.ts";
function UWs(e,t){let{cleanupBeforeAbort:n,abortSignal:r,abortErrorMsg:o}=t!==null&&t!==void 0?t:{};return new Promise((s,i)=>{function a(){i(new sJe(o!==null&&o!==void 0?o:"The operation was aborted."))}function l(){r===null||r===void 0||r.removeEventListener("abort",c)}function c(){n===null||n===void 0||n(),l(),a()}if(r===null||r===void 0?void 0:r.aborted)return a();try{e((u)=>{l(),s(u)},(u)=>{l(),i(u)})}catch(u){i(u)}r===null||r===void 0||r.addEventListener("abort",c)})}
var $Ws=b(()=>{jHr()});
export {UWs,$Ws};
