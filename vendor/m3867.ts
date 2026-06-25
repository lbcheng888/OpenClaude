// @ts-nocheck
import {qt,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
async function aNa(){let e=new Set,t=process.env.CLOUDSDK_CONFIG??mvp();try{let n=e9t.join(t,"configurations");for(let r of await t9t.readdir(n)){if(!r.startsWith("config_"))continue;try{let o=await t9t.readFile(e9t.join(n,r),"utf8");for(let s of o.matchAll(/^project\s*=\s*(\S+)/gm)){let i=s[1]?.trim();if(i)e.add(i)}}catch{}}}catch{}try{let n=qt(await t9t.readFile(e9t.join(t,"application_default_credentials.json"),"utf8"));if(n.quota_project_id)e.add(n.quota_project_id)}catch{}return[...e].sort()}
function mvp(){return e9t.join(iNa.homedir(),".config","gcloud")}
var t9t,iNa,e9t;
var lNa=b(()=>{tn();t9t=require("fs/promises"),iNa=require("os"),e9t=require("path")});
export {aNa,mvp,t9t,iNa,e9t,lNa};
