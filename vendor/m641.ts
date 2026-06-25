// @ts-nocheck
import {Wt,ps} from "./m230.ts";
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
import {qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {vn,Ie} from "../src/session/0621_length.ts";
function Nrn(e){switch(e){case"darwin":return"macOS";case"win32":return"Windows";case"linux":return"Linux";default:return e}}
async function Irs(e){let t=new Set;if(process.env.P4PORT)t.add("perforce");try{let n=e??Wt().cwd(),r=new Set(await Mrn.readdir(n));for(let[o,s]of Hou)if(r.has(o))t.add(s)}catch{}return[...t]}
var Mrn,Hyr,Iyr,Yt,O1e,krs,Hou,Hrs;
var Es=b(()=>{Wi();qe();ps();vn();Mrn=require("fs/promises"),Hyr=require("os"),Iyr=["macos","wsl"],Yt=Hn(()=>{try{return"macos"}catch(e){return Ie(e),"unknown"}});O1e=Hn(()=>{return}),krs=Hn(async()=>{return}),Hou=[[".git","git"],[".hg","mercurial"],[".svn","svn"],[".p4config","perforce"],["$tf","tfs"],[".tfvc","tfs"],[".jj","jujutsu"],[".sl","sapling"]],Hrs=Hn(()=>{let t=Hyr.release().match(/^(\d+)\./);if(!t||!t[1])return;return parseInt(t[1],10)-9})});
export {Nrn,Irs,Mrn,Hyr,Iyr,Yt,O1e,krs,Hou,Hrs,Es};
