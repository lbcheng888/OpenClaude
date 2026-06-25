// @ts-nocheck
import {b,x} from "../runtime.ts";
async function Ari(e,{humanReadableOutput:t=!0,signal:n}={}){if(Eri.default.platform!=="darwin")throw Error("macOS only");let r=t?[]:["-ss"],o={};if(n)o.signal=n;let{stdout:s}=await yYu("osascript",["-e",e,r],o);return s.trim()}
var Eri,Cri,M1r,yYu;
var Rri=b(()=>{Eri=x(require("process")),Cri=require("util"),M1r=require("child_process"),yYu=Cri.promisify(M1r.execFile)});
export {Ari,Eri,Cri,M1r,yYu,Rri};
