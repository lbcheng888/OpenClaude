// @ts-nocheck
import {sZo,iZo} from "./m663.ts";
import {b,M} from "../runtime.ts";
var aZo,xYc=({timedOut:e,timeout:t,errorCode:n,signal:r,signalDescription:o,exitCode:s,isCanceled:i})=>{if(e)return`timed out after ${t} milliseconds`;if(i)return"was canceled";if(n!==void 0)return`failed with ${n}`;if(r!==void 0)return`was killed with ${r} (${o})`;if(s!==void 0)return`failed with exit code ${s}`;return"failed"},Lbt=({stdout:e,stderr:t,all:n,error:r,signal:o,exitCode:s,command:i,escapedCommand:a,timedOut:l,isCanceled:c,killed:u,parsed:{options:{timeout:d,cwd:p=aZo.default.cwd()}}})=>{s=s===null?void 0:s,o=o===null?void 0:o;let m=o===void 0?void 0:sZo[o].description,f=r&&r.code,h=`Command ${xYc({timedOut:l,timeout:d,errorCode:f,signal:o,signalDescription:m,exitCode:s,isCanceled:c})}: ${i}`,g=Object.prototype.toString.call(r)==="[object Error]",_=g?`${h}
${r.message}`:h,y=[_,t,e].filter(Boolean).join(`
`);if(g)r.originalMessage=r.message,r.message=y;else r=Error(y);if(r.shortMessage=_,r.command=i,r.escapedCommand=a,r.exitCode=s,r.signal=o,r.signalDescription=m,r.stdout=e,r.stderr=t,r.cwd=p,n!==void 0)r.all=n;if("bufferedData"in r)delete r.bufferedData;return r.failed=!0,r.timedOut=Boolean(l),r.isCanceled=c,r.killed=u&&!l,r};
var lZo=b(()=>{iZo();aZo=M(require("process"))});
export {aZo,xYc,Lbt,lZo};
