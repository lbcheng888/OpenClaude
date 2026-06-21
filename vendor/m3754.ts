// @ts-nocheck
import {Rwa,B3e} from "./m3753.ts";
import {ds,bt} from "./m195.ts";
import {b} from "../runtime.ts";
function yHe(e){let t=e?.homedir??Xno.homedir(),r=(e?.env??process.env).ZDOTDIR||t;return{zsh:hNn.join(r,".zshrc"),bash:hNn.join(t,".bashrc"),fish:hNn.join(t,".config/fish/config.fish")}}
function gNn(e){let t=!1;return{filtered:e.filter((r)=>{if(kwa.test(r)){let o=r.match(/alias\s+claude\s*=\s*["']([^"']+)["']/);if(!o)o=r.match(/alias\s+claude\s*=\s*([^#\n]+)/);if(o&&o[1]){if(o[1].trim()===Rwa())return t=!0,!1}}return!0}),hadAlias:t}}
async function LFt(e){try{return(await Tat.readFile(e,{encoding:"utf8"})).split(`
`)}catch(t){if(ds(t))return null;throw t}}
async function _Nn(e,t){let n=await Tat.open(e,"w");try{await n.writeFile(t.join(`
`),{encoding:"utf8"}),await n.datasync()}finally{await n.close()}}
async function Qno(e){let t=yHe(e);for(let n of Object.values(t)){let r=await LFt(n);if(!r)continue;for(let o of r)if(kwa.test(o)){let s=o.match(/alias\s+claude=["']?([^"'\s]+)/);if(s&&s[1])return s[1]}}return null}
async function Hwa(e){let t=await Qno(e);if(!t)return null;let n=e?.homedir??Xno.homedir(),r=t.startsWith("~")?t.replace("~",n):t;try{let o=await Tat.stat(r);if(o.isFile()||o.isSymbolicLink())return t}catch{}return null}
var Tat,Xno,hNn,kwa;
var yNn=b(()=>{bt();B3e();Tat=require("fs/promises"),Xno=require("os"),hNn=require("path"),kwa=/^\s*alias\s+claude\s*=/});
export {yHe,gNn,LFt,_Nn,Qno,Hwa,Tat,Xno,hNn,kwa,yNn};
