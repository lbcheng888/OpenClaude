// @ts-nocheck
import {jt,ws} from "./m228.ts";
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
import {qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Rn,De} from "../src/session/0615_length.ts";
function ntn(e){switch(e){case"darwin":return"macOS";case"win32":return"Windows";case"linux":return"Linux";default:return e}}
async function PXo(e){let t=new Set;if(process.env.P4PORT)t.add("perforce");try{let n=e??jt().cwd(),r=new Set(await ttn.readdir(n));for(let[o,s]of pzc)if(r.has(o))t.add(s)}catch{}return[...t]}
var ttn,efr,tfr,zt,$Me,IXo,pzc,DXo;
var qs=b(()=>{ta();qe();ws();Rn();ttn=require("fs/promises"),efr=require("os"),tfr=["macos","wsl"],zt=wn(()=>{try{return"macos"}catch(e){return De(e),"unknown"}});$Me=wn(()=>{return}),IXo=wn(async()=>{return}),pzc=[[".git","git"],[".hg","mercurial"],[".svn","svn"],[".p4config","perforce"],["$tf","tfs"],[".tfvc","tfs"],[".jj","jujutsu"],[".sl","sapling"]],DXo=wn(()=>{let t=efr.release().match(/^(\d+)\./);if(!t||!t[1])return;return parseInt(t[1],10)-9})});
export {ntn,PXo,ttn,efr,tfr,zt,$Me,IXo,pzc,DXo,qs};
