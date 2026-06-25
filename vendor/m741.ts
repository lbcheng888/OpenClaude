// @ts-nocheck
import {getMdmRawReadPromise,fireRawRead,ysn} from "./m740.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {wn,pf} from "../src/config/0693_timestamp.ts";
import {ba,pd} from "./m706.ts";
import {cCe,eNe} from "../src/config/0740_settings.ts";
import {kon,zje,xRt,Hon,uM,ZEe} from "./m710.ts";
import {Fv,qK} from "./m709.ts";
import {IN,tn} from "../src/config/0230_encoding.ts";
import {Ov,GN} from "./m640.ts";
import {jpe,tvt} from "./m738.ts";
import {Wt,ps} from "./m230.ts";
import {b} from "../runtime.ts";
function Klu(){if(Tsn)return;Tsn=(async()=>{let e=Date.now(),t=getMdmRawReadPromise()??fireRawRead(),{mdm:n,hkcu:r,wslInherits:o}=Xls(await t);obr=n,sbr=r,Ssn=o;let s=Date.now()-e;if(logForDebugging(`MDM settings load completed in ${s}ms`),Object.keys(n.settings).length>0){logForDebugging(`MDM settings found: ${Object.keys(n.settings).join(", ")}`);try{wn("info","mdm_settings_loaded",{duration_ms:s,key_count:Object.keys(n.settings).length,error_count:n.errors.length})}catch{}}})()}
async function cYe(){if(!Tsn)Klu();await Tsn}
function Coe(){return obr??pCe}
function mCe(){return sbr??pCe}
function rQ(){return Ssn}
function Yls(e,t,n){obr=e,sbr=t,Ssn=n}
async function Jls(){let e=await fireRawRead();return Xls(e)}
function rbr(e,t){let n=ba(e,!1);if(!n||typeof n!=="object")return{settings:{},errors:[]};let{settings:r,errors:o}=cCe(n,t);return{settings:r??{},errors:o}}
function Kls(e,t="Settings"){let n=e.split(/\r?\n/),r=t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),o=new RegExp(`^\\s+${r}\\s+REG_(?:EXPAND_)?SZ\\s+(.*)$`,"i");for(let s of n){let i=s.match(o);if(i&&i[1])return i[1].trimEnd()}return null}
function Xls(e){let t=[];if(e.plistStdouts&&e.plistStdouts.length>0){let{stdout:i,label:a}=e.plistStdouts[0],l=rbr(i,a),{wslInheritsWindowsSettings:c,...u}=l.settings;if(Object.keys(u).length>0)return{mdm:l,hkcu:pCe,wslInherits:!1};t.push(...l.errors)}let n=null;if(e.hklmStdout){let i=Kls(e.hklmStdout);if(i)n=rbr(i,`Registry: ${kon}\\${zje}`)}if(n)t.push(...n.errors);let r=t.length>0?{settings:{},errors:t}:pCe,o=xRt(),s=!1;if(o){if(s=n?.settings.wslInheritsWindowsSettings===!0||jlu(),!s)return{mdm:r,hkcu:pCe,wslInherits:!1}}if(n){let{wslInheritsWindowsSettings:i,...a}=n.settings;if(Object.keys(a).length>0)return{mdm:n,hkcu:pCe,wslInherits:s}}if(zlu(s))return{mdm:r,hkcu:pCe,wslInherits:s};if(e.hkcuStdout){let i=Kls(e.hkcuStdout);if(i){let a=rbr(i,`Registry: ${Hon}\\${zje}`);if(!o||a.settings.wslInheritsWindowsSettings===!0){let{wslInheritsWindowsSettings:l,...c}=a.settings;return{mdm:r,hkcu:{settings:c,errors:a.errors},wslInherits:s}}if(a.errors.length>0)return{mdm:r,hkcu:{settings:{},errors:a.errors},wslInherits:s}}}return{mdm:r,hkcu:pCe,wslInherits:s}}
function zlu(e){if(e&&jls(uM))return!0;return jls(Fv())}
function zls(e){let t=IN(ba(Ov(e),!1));if(!t||typeof t!=="object")return!1;jpe(t,e);let{wslInheritsWindowsSettings:n,...r}=t;return Object.keys(r).length>0}
function ibr(){if(!xRt()||!Ssn)return"";let e=[];try{e.push(Ov(Eoe.join(uM,"managed-settings.json")))}catch{e.push("")}try{let t=Eoe.join(uM,"managed-settings.d"),n=Wt().readdirSync(t).filter((r)=>(r.isFile()||r.isSymbolicLink())&&r.name.endsWith(".json")&&!r.name.startsWith(".")).map((r)=>r.name).sort();for(let r of n)try{e.push(`${r}\x00${Ov(Eoe.join(t,r))}`)}catch{e.push(`${r}\x00`)}}catch{}return e.join("\x01")}
function jlu(){function e(t){try{let n=ba(Ov(t),!1);return!!n&&typeof n==="object"&&"wslInheritsWindowsSettings"in n&&n.wslInheritsWindowsSettings===!0}catch{return!1}}if(e(Eoe.join(uM,"managed-settings.json")))return!0;try{let t=Eoe.join(uM,"managed-settings.d");for(let n of Wt().readdirSync(t))if((n.isFile()||n.isSymbolicLink())&&n.name.endsWith(".json")&&!n.name.startsWith(".")&&e(Eoe.join(t,n.name)))return!0}catch{}return!1}
function jls(e){try{if(zls(Eoe.join(e,"managed-settings.json")))return!0}catch{}try{let t=Eoe.join(e,"managed-settings.d"),n=Wt().readdirSync(t);for(let r of n){if(!(r.isFile()||r.isSymbolicLink())||!r.name.endsWith(".json")||r.name.startsWith("."))continue;try{if(zls(Eoe.join(t,r.name)))return!0}catch{}}}catch{}return!1}
var Eoe,pCe,obr=null,sbr=null,Ssn=!1,Tsn=null;
var fCe=b(()=>{qe();pf();GN();ps();pd();tn();qK();eNe();tvt();ZEe();ysn();Eoe=require("path"),pCe=Object.freeze({settings:{},errors:[]})});
export {Klu,cYe,Coe,mCe,rQ,Yls,Jls,rbr,Kls,Xls,zlu,zls,ibr,jlu,jls,Eoe,pCe,obr,sbr,Ssn,Tsn,fCe};
