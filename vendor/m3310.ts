// @ts-nocheck
import {yA,XI} from "./m459.ts";
import {execFileNoThrow,oa} from "./m684.ts";
import {b} from "../runtime.ts";
function tst(e,t){let n=0,r=[];function o(){if(n<e)return n++,Promise.resolve();return new Promise((i)=>r.push(i))}function s(){let i=r.shift();if(i)i();else n--}return async(...i)=>{await o();try{return await t(...i)}finally{s()}}}
async function hla(e){let t=HJr.get(e);if(t!==void 0)return t;let n=await z5d(e);return HJr.set(e,n),n}
function IJr(e){HJr.delete(e)}
async function z5d(e){let t=e==="github.com"?process.env.GH_TOKEN||process.env.GITHUB_TOKEN:process.env.GH_HOST===e?process.env.GH_ENTERPRISE_TOKEN||process.env.GITHUB_ENTERPRISE_TOKEN:void 0;if(t)return t;if(!await yA("gh"))return null;let{stdout:r,code:o}=await execFileNoThrow("gh",["auth","token","--hostname",e],{timeout:5000,preserveOutputOnError:!1,env:{...process.env,GH_TOKEN:"",GITHUB_TOKEN:"",GH_ENTERPRISE_TOKEN:"",GITHUB_ENTERPRISE_TOKEN:""}});if(o!==0)return null;let s=r.trim();return s.length>0?s:null}
var HJr;
var gla=b(()=>{oa();XI();HJr=new Map});
export {tst,hla,IJr,z5d,HJr,gla};
