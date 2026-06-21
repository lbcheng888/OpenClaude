// @ts-nocheck
import {b,M} from "../runtime.ts";
async function kXs(e,{humanReadableOutput:t=!0,signal:n}={}){if(RXs.default.platform!=="darwin")throw Error("macOS only");let r=t?[]:["-ss"],o={};if(n)o.signal=n;let{stdout:s}=await Zqu("osascript",["-e",e,r],o);return s.trim()}
var RXs,xXs,iPr,Zqu;
var HXs=b(()=>{RXs=M(require("process")),xXs=require("util"),iPr=require("child_process"),Zqu=xXs.promisify(iPr.execFile)});
export {kXs,RXs,xXs,iPr,Zqu,HXs};
