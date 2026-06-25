// @ts-nocheck
import {GDa,Q4e} from "./m3769.ts";
import {Jo,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
function a0e(e){let t=e?.homedir??Lao.homedir(),n=e?.env??process.env,r=e?.platform??"darwin",o=e?.fileExists??KDa.existsSync,s=n.ZDOTDIR||t,i=r==="darwin"?[".bash_profile",".bash_login",".profile"].find((a)=>o(yct.join(t,a)))??".bash_profile":".bashrc";return{zsh:yct.join(s,".zshrc"),bash:yct.join(t,i),...r==="darwin"&&{bashrc:yct.join(t,".bashrc")},fish:yct.join(t,".config/fish/config.fish")}}
function lUn(e){let t=!1;return{filtered:e.filter((r)=>{if(zDa.test(r)){let o=r.match(/alias\s+claude\s*=\s*["']([^"']+)["']/);if(!o)o=r.match(/alias\s+claude\s*=\s*([^#\n]+)/);if(o&&o[1]){if(o[1].trim()===GDa())return t=!0,!1}}return!0}),hadAlias:t}}
async function d$t(e){try{return(await Tct.readFile(e,{encoding:"utf8"})).split(`
`)}catch(t){if(Jo(t))return null;throw t}}
async function cUn(e,t){let n=await Tct.open(e,"w");try{await n.writeFile(t.join(`
`),{encoding:"utf8"}),await n.datasync()}finally{await n.close()}}
async function Mao(e){let t=a0e(e);for(let n of Object.values(t)){let r=await d$t(n);if(!r)continue;for(let o of r)if(zDa.test(o)){let s=o.match(/alias\s+claude=["']?([^"'\s]+)/);if(s&&s[1])return s[1]}}return null}
async function jDa(e){let t=await Mao(e);if(!t)return null;let n=e?.homedir??Lao.homedir(),r=t.startsWith("~")?t.replace("~",n):t;try{let o=await Tct.stat(r);if(o.isFile()||o.isSymbolicLink())return t}catch{}return null}
var KDa,Tct,Lao,yct,zDa;
var uUn=b(()=>{Ct();Q4e();KDa=require("fs"),Tct=require("fs/promises"),Lao=require("os"),yct=require("path"),zDa=/^\s*alias\s+claude\s*=/});
export {a0e,lUn,d$t,cUn,Mao,jDa,KDa,Tct,Lao,yct,zDa,uUn};
