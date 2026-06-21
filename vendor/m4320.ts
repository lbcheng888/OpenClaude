// @ts-nocheck
import {Yae,Jae} from "../src/config/3258_errors.ts";
import {b} from "../runtime.ts";
import {f9n,R9t} from "./m4158.ts";
function lNp(e){return Object.entries(Yae).filter(([,t])=>e.has(t.toLowerCase())).map(([t])=>t)}
var pfo,mfo,ffo,aNp,cNp,uNp,dNp,pNp,Pza;
var Afo=b(()=>{f9n();Jae();pfo=new Set(["invoke-command","start-job","start-threadjob","register-scheduledjob"]),mfo=new Set(["invoke-command","invoke-expression","start-job","start-threadjob","register-scheduledjob","register-engineevent","register-objectevent","register-wmievent","new-pssession","enter-pssession"]),ffo=new Set(["import-module","ipmo","install-module","save-module","update-module","install-script","save-script"]),aNp=["pwsh","powershell","cmd","bash","wsl","sh","start-process","start","add-type","new-object"];cNp=new Set(["invoke-webrequest","invoke-restmethod"]),uNp=new Set(["set-alias","sal","new-alias","nal","set-variable","sv","new-variable","nv"]),dNp=new Set(["invoke-wmimethod","iwmi","invoke-cimmethod"]),pNp=new Set(["select-object","sort-object","group-object","where-object","measure-object","write-output","write-host","start-sleep","format-table","format-list","format-wide","format-custom","out-string","out-host","ipconfig","hostname","route","arp"]),Pza=(()=>{let e=new Set([...aNp,...pfo,...mfo,...ffo,...cNp,...uNp,...dNp,...pNp,"foreach-object",...R9t.filter((t)=>!t.includes(" "))]);return new Set([...e,...lNp(e)])})()});
export {lNp,pfo,mfo,ffo,aNp,cNp,uNp,dNp,pNp,Pza,Afo};
