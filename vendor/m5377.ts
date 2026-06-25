// @ts-nocheck
import {formatRelativeTimeAgo,formatNumber,Xo} from "./m240.ts";
import {getGitDir,ia} from "./m698.ts";
import {getCommonDir,VP} from "./m696.ts";
import {b} from "../runtime.ts";
function kjl(e){let t=[`This session was opened by an external deep link in ${LFm(e.cwd)}`];if(e.repo){let n=e.lastFetch?formatRelativeTimeAgo(e.lastFetch):"never",r=!e.lastFetch||Date.now()-e.lastFetch.getTime()>OFm;t.push(`Resolved ${e.repo} from local clones \xB7 last fetched ${n}${r?" \u2014 CLAUDE.md may be stale":""}`)}if(e.prefillLength)t.push(e.prefillLength>HFo?`The prompt below (${formatNumber(e.prefillLength)} chars) was supplied by the link \u2014 scroll to review the entire prompt before pressing Enter.`:"The prompt below was supplied by the link \u2014 review carefully before pressing Enter.");return t.join(`
`)}
async function Hjl(e){let t=await getGitDir(e);if(!t)return;let n=await getCommonDir(t),[r,o]=await Promise.all([Rjl(U7t.join(t,"FETCH_HEAD")),n?Rjl(U7t.join(n,"FETCH_HEAD")):Promise.resolve(void 0)]);if(r&&o)return r>o?r:o;return r??o}
async function Rjl(e){try{let{mtime:t}=await vjl.stat(e);return t}catch{return}}
function LFm(e){let t=wjl.homedir();if(e===t)return"~";if(e.startsWith(t+U7t.sep))return"~"+e.slice(t.length);return e}
var vjl,wjl,U7t,OFm=604800000,HFo=1000;
var Oer=b(()=>{Xo();VP();ia();vjl=require("fs/promises"),wjl=require("os"),U7t=require("path")});
export {kjl,Hjl,Rjl,LFm,vjl,wjl,U7t,OFm,HFo,Oer};
