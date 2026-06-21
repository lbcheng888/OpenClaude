// @ts-nocheck
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
async function LIa(){let e=new Set,t=process.env.CLOUDSDK_CONFIG??CAp();try{let n=wUt.join(t,"configurations");for(let r of await RUt.readdir(n)){if(!r.startsWith("config_"))continue;try{let o=await RUt.readFile(wUt.join(n,r),"utf8");for(let s of o.matchAll(/^project\s*=\s*(\S+)/gm)){let i=s[1]?.trim();if(i)e.add(i)}}catch{}}}catch{}try{let n=qt(await RUt.readFile(wUt.join(t,"application_default_credentials.json"),"utf8"));if(n.quota_project_id)e.add(n.quota_project_id)}catch{}return[...e].sort()}
function CAp(){return wUt.join(OIa.homedir(),".config","gcloud")}
var RUt,OIa,wUt;
var MIa=b(()=>{Xt();RUt=require("fs/promises"),OIa=require("os"),wUt=require("path")});
export {LIa,CAp,RUt,OIa,wUt,MIa};
