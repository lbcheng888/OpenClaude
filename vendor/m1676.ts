// @ts-nocheck
import {rQe} from "./m1674.ts";
import {b} from "../runtime.ts";
import {TOr} from "./m1675.ts";
function LYs(e,t){let{cleanupBeforeAbort:n,abortSignal:r,abortErrorMsg:o}=t!==null&&t!==void 0?t:{};return new Promise((s,i)=>{function a(){i(new rQe(o!==null&&o!==void 0?o:"The operation was aborted."))}function l(){r===null||r===void 0||r.removeEventListener("abort",c)}function c(){n===null||n===void 0||n(),l(),a()}if(r===null||r===void 0?void 0:r.aborted)return a();try{e((u)=>{l(),s(u)},(u)=>{l(),i(u)})}catch(u){i(u)}r===null||r===void 0||r.addEventListener("abort",c)})}
var MYs=b(()=>{TOr()});
export {LYs,MYs};
