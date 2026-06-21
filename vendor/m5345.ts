// @ts-nocheck
import {formatRelativeTimeAgo,formatNumber,ps} from "./m238.ts";
import {getGitDir,Ba} from "./m693.ts";
import {getCommonDir,vO} from "./m691.ts";
import {b} from "../runtime.ts";
function J6l(e){let t=[`This session was opened by an external deep link in ${RIm(e.cwd)}`];if(e.repo){let n=e.lastFetch?formatRelativeTimeAgo(e.lastFetch):"never",r=!e.lastFetch||Date.now()-e.lastFetch.getTime()>wIm;t.push(`Resolved ${e.repo} from local clones \xB7 last fetched ${n}${r?" \u2014 CLAUDE.md may be stale":""}`)}if(e.prefillLength)t.push(e.prefillLength>uOo?`The prompt below (${formatNumber(e.prefillLength)} chars) was supplied by the link \u2014 scroll to review the entire prompt before pressing Enter.`:"The prompt below was supplied by the link \u2014 review carefully before pressing Enter.");return t.join(`
`)}
async function X6l(e){let t=await getGitDir(e);if(!t)return;let n=await getCommonDir(t),[r,o]=await Promise.all([K6l(fGt.join(t,"FETCH_HEAD")),n?K6l(fGt.join(n,"FETCH_HEAD")):Promise.resolve(void 0)]);if(r&&o)return r>o?r:o;return r??o}
async function K6l(e){try{let{mtime:t}=await z6l.stat(e);return t}catch{return}}
function RIm(e){let t=Y6l.homedir();if(e===t)return"~";if(e.startsWith(t+fGt.sep))return"~"+e.slice(t.length);return e}
var z6l,Y6l,fGt,wIm=604800000,uOo=1000;
var LJn=b(()=>{ps();vO();Ba();z6l=require("fs/promises"),Y6l=require("os"),fGt=require("path")});
export {J6l,X6l,K6l,RIm,z6l,Y6l,fGt,wIm,uOo,LJn};
