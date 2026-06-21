// @ts-nocheck
import {getMdmRawReadPromise,fireRawRead,Lnn} from "./m735.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {kn,SA} from "../src/config/0689_timestamp.ts";
import {Fa,Pd} from "./m701.ts";
import {Rbe,a1e} from "../src/config/0735_settings.ts";
import {ztn,Y7e,oEt,Ytn,XM,_be} from "./m705.ts";
import {RR,h7} from "./m704.ts";
import {cB,Xt} from "../src/config/0228_encoding.ts";
import {ER,bB} from "./m634.ts";
import {Upe,xEt} from "./m733.ts";
import {jt,ws} from "./m228.ts";
import {b} from "../runtime.ts";
function HQc(){if(Mnn)return;Mnn=(async()=>{let e=Date.now(),t=getMdmRawReadPromise()??fireRawRead(),{mdm:n,hkcu:r,wslInherits:o}=rrs(await t);khr=n,Hhr=r,Nnn=o;let s=Date.now()-e;if(logForDebugging(`MDM settings load completed in ${s}ms`),Object.keys(n.settings).length>0){logForDebugging(`MDM settings found: ${Object.keys(n.settings).join(", ")}`);try{kn("info","mdm_settings_loaded",{duration_ms:s,key_count:Object.keys(n.settings).length,error_count:n.errors.length})}catch{}}})()}
async function dKe(){if(!Mnn)HQc();await Mnn}
function voe(){return khr??Hbe}
function Ibe(){return Hhr??Hbe}
function iQ(){return Nnn}
function trs(e,t,n){khr=e,Hhr=t,Nnn=n}
async function nrs(){let e=await fireRawRead();return rrs(e)}
function xhr(e,t){let n=Fa(e,!1);if(!n||typeof n!=="object")return{settings:{},errors:[]};let{settings:r,errors:o}=Rbe(n,t);return{settings:r??{},errors:o}}
function Qns(e,t="Settings"){let n=e.split(/\r?\n/),r=t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),o=new RegExp(`^\\s+${r}\\s+REG_(?:EXPAND_)?SZ\\s+(.*)$`,"i");for(let s of n){let i=s.match(o);if(i&&i[1])return i[1].trimEnd()}return null}
function rrs(e){let t=[];if(e.plistStdouts&&e.plistStdouts.length>0){let{stdout:i,label:a}=e.plistStdouts[0],l=xhr(i,a),{wslInheritsWindowsSettings:c,...u}=l.settings;if(Object.keys(u).length>0)return{mdm:l,hkcu:Hbe,wslInherits:!1};t.push(...l.errors)}let n=null;if(e.hklmStdout){let i=Qns(e.hklmStdout);if(i)n=xhr(i,`Registry: ${ztn}\\${Y7e}`)}if(n)t.push(...n.errors);let r=t.length>0?{settings:{},errors:t}:Hbe,o=oEt(),s=!1;if(o){if(s=n?.settings.wslInheritsWindowsSettings===!0||DQc(),!s)return{mdm:r,hkcu:Hbe,wslInherits:!1}}if(n){let{wslInheritsWindowsSettings:i,...a}=n.settings;if(Object.keys(a).length>0)return{mdm:n,hkcu:Hbe,wslInherits:s}}if(IQc(s))return{mdm:r,hkcu:Hbe,wslInherits:s};if(e.hkcuStdout){let i=Qns(e.hkcuStdout);if(i){let a=xhr(i,`Registry: ${Ytn}\\${Y7e}`);if(!o||a.settings.wslInheritsWindowsSettings===!0){let{wslInheritsWindowsSettings:l,...c}=a.settings;return{mdm:r,hkcu:{settings:c,errors:a.errors},wslInherits:s}}if(a.errors.length>0)return{mdm:r,hkcu:{settings:{},errors:a.errors},wslInherits:s}}}return{mdm:r,hkcu:Hbe,wslInherits:s}}
function IQc(e){if(e&&ers(XM))return!0;return ers(RR())}
function Zns(e){let t=cB(Fa(ER(e),!1));if(!t||typeof t!=="object")return!1;Upe(t,e);let{wslInheritsWindowsSettings:n,...r}=t;return Object.keys(r).length>0}
function Ihr(){if(!oEt()||!Nnn)return"";let e=[];try{e.push(ER(Coe.join(XM,"managed-settings.json")))}catch{e.push("")}try{let t=Coe.join(XM,"managed-settings.d"),n=jt().readdirSync(t).filter((r)=>(r.isFile()||r.isSymbolicLink())&&r.name.endsWith(".json")&&!r.name.startsWith(".")).map((r)=>r.name).sort();for(let r of n)try{e.push(`${r}\x00${ER(Coe.join(t,r))}`)}catch{e.push(`${r}\x00`)}}catch{}return e.join("\x01")}
function DQc(){function e(t){try{let n=Fa(ER(t),!1);return!!n&&typeof n==="object"&&"wslInheritsWindowsSettings"in n&&n.wslInheritsWindowsSettings===!0}catch{return!1}}if(e(Coe.join(XM,"managed-settings.json")))return!0;try{let t=Coe.join(XM,"managed-settings.d");for(let n of jt().readdirSync(t))if((n.isFile()||n.isSymbolicLink())&&n.name.endsWith(".json")&&!n.name.startsWith(".")&&e(Coe.join(t,n.name)))return!0}catch{}return!1}
function ers(e){try{if(Zns(Coe.join(e,"managed-settings.json")))return!0}catch{}try{let t=Coe.join(e,"managed-settings.d"),n=jt().readdirSync(t);for(let r of n){if(!(r.isFile()||r.isSymbolicLink())||!r.name.endsWith(".json")||r.name.startsWith("."))continue;try{if(Zns(Coe.join(t,r.name)))return!0}catch{}}}catch{}return!1}
var Coe,Hbe,khr=null,Hhr=null,Nnn=!1,Mnn=null;
var Dbe=b(()=>{qe();SA();bB();ws();Pd();Xt();h7();a1e();xEt();_be();Lnn();Coe=require("path"),Hbe=Object.freeze({settings:{},errors:[]})});
export {HQc,dKe,voe,Ibe,iQ,trs,nrs,xhr,Qns,rrs,IQc,Zns,Ihr,DQc,ers,Coe,Hbe,khr,Hhr,Nnn,Mnn,Dbe};
