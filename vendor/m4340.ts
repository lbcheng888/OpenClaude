// @ts-nocheck
import {jae,Yae} from "../src/config/3274_errors.ts";
import {b} from "../runtime.ts";
import {mqn,q4t} from "./m4171.ts";
function W4p(e){return Object.entries(jae).filter(([,t])=>e.has(t.toLowerCase())).map(([t])=>t)}
var cTo,uTo,dTo,q4p,G4p,V4p,K4p,z4p,Qel;
var pTo=b(()=>{mqn();Yae();cTo=new Set(["invoke-command","start-job","start-threadjob","register-scheduledjob"]),uTo=new Set(["invoke-command","invoke-expression","start-job","start-threadjob","register-scheduledjob","register-engineevent","register-objectevent","register-wmievent","new-pssession","enter-pssession"]),dTo=new Set(["import-module","ipmo","install-module","save-module","update-module","install-script","save-script"]),q4p=["pwsh","powershell","cmd","bash","wsl","sh","start-process","start","add-type","new-object"];G4p=new Set(["invoke-webrequest","invoke-restmethod"]),V4p=new Set(["set-alias","sal","new-alias","nal","set-variable","sv","new-variable","nv"]),K4p=new Set(["invoke-wmimethod","iwmi","invoke-cimmethod"]),z4p=new Set(["select-object","sort-object","group-object","where-object","measure-object","write-output","write-host","start-sleep","format-table","format-list","format-wide","format-custom","out-string","out-host","ipconfig","hostname","route","arp"]),Qel=(()=>{let e=new Set([...q4p,...cTo,...uTo,...dTo,...G4p,...V4p,...K4p,...z4p,"foreach-object",...q4t.filter((t)=>!t.includes(" "))]);return new Set([...e,...W4p(e)])})()});
export {W4p,cTo,uTo,dTo,q4p,G4p,V4p,K4p,z4p,Qel,pTo};
