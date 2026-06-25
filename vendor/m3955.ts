// @ts-nocheck
import {P$e,Nf,Krt} from "./m2720.ts";
import {oxe,po} from "../src/tools/5224_userPromptCount.ts";
import {lw,a4} from "./m2436.ts";
import {bt,Gc} from "./m588.ts";
import {qas,Pa} from "./m720.ts";
import {cc} from "./m2459.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {color,Kve} from "./m2431.ts";
import {iki,nS} from "../src/config/2351_nS.ts";
import {LD,oHe} from "./m2814.ts";
import {sn,mc} from "./m237.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {getCachedRepositoryHost,_0} from "./m697.ts";
import {getFastModeModelDisplayName,lr} from "./m233.ts";
import {b} from "../runtime.ts";
var w2a=`Use this tool when you are in plan mode and have finished writing your plan to the plan file and are ready for user approval.

## How This Tool Works
- You should have already written your plan to the plan file specified in the plan mode system message
- This tool does NOT take the plan content as a parameter - it will read the plan from the file you wrote
- This tool simply signals that you're done planning and ready for the user to review and approve
- The user will see the contents of your plan file when they review it

## When to Use This Tool
IMPORTANT: Only use this tool when the task requires planning the implementation steps of a task that requires writing code. For research tasks where you're gathering information, searching files, reading files or in general trying to understand the codebase - do NOT use this tool.

## Before Using This Tool
Ensure your plan is complete and unambiguous:
- If you have unresolved questions about requirements or approach, use AskUserQuestion first (in earlier phases)
- Once your plan is finalized, use THIS tool to request approval

**Important:** Do NOT use AskUserQuestion to ask "Is this plan okay?" or "Should I proceed?" - that's exactly what THIS tool does. ExitPlanMode inherently requests user approval of your plan.

## Examples

1. Initial task: "Search for and understand the implementation of vim mode in the codebase" - Do not use the exit plan mode tool because you are not planning the implementation steps of a task.
2. Initial task: "Help me implement yank mode for vim" - Use the exit plan mode tool after you have finished planning the implementation steps of the task.
3. Initial task: "Add a new feature to handle user authentication" - If unsure about auth method (OAuth, JWT, etc.), use AskUserQuestion first, then use exit plan mode tool after clarifying the approach.
`;
function o9n(){if(k2a)return;k2a=!0;let e=P$e.prototype.table;Nf.use({tokenizer:{del(t){let n=/^~~(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))~~(?=[^~]|$)/.exec(t),r=n?.[1];if(!n||r===void 0)return;return{type:"del",raw:n[0],text:r,tokens:this.lexer.inlineTokens(r)}},def(){return},table(t){let n=this.rules.block.table.exec(t);if(!n)return;let r=n[0],o=r.split(`
`).map(HHp).join(`
`);if(o===r)return e.call(this,t);let s=e.call(this,o+t.slice(r.length));if(s)s.raw=r;return s}}})}
function s9n(e,t,n=null){return o9n(),Nf.lexer(oxe(e)).map((r)=>BI(r,t,0,null,null,n)).join("").trim()}
function BI(e,t,n=0,r=null,o=null,s=null,i=!1,a=lw()){switch(e.type){case"blockquote":{let l=(e.tokens??[]).map((u)=>BI(u,t,0,null,null,s,!1,a)).join(""),c=bt.dim(qas);return l.split(lL).map((u)=>cc(u).trim()?`${c} ${bt.italic(u)}`:u).join(lL)}case"code":{if(!s)return e.text+lL;let l="plaintext";if(e.lang)if(s.supportsLanguage(e.lang))l=e.lang;else logForDebugging(`Language not supported while highlighting code, falling back to plaintext: ${e.lang}`);return s.highlight(e.text,{language:l})+lL}case"codespan":return color("permission",t)(e.text);case"em":return bt.italic((e.tokens??[]).map((l)=>BI(l,t,0,null,o,s,i,a)).join(""));case"strong":return bt.bold((e.tokens??[]).map((l)=>BI(l,t,0,null,o,s,i,a)).join(""));case"del":{let l=(e.tokens??[]).map((c)=>BI(c,t,0,null,o,s,i,a)).join("");return iki()&&bt.level>0?bt.strikethrough(l):`~~${l}~~`}case"heading":switch(e.depth){case 1:return bt.bold.italic.underline((e.tokens??[]).map((l)=>BI(l,t,0,null,null,s,!1,a)).join(""))+lL+lL;case 2:return bt.bold((e.tokens??[]).map((l)=>BI(l,t,0,null,null,s,!1,a)).join(""))+lL+lL;default:return bt.bold((e.tokens??[]).map((l)=>BI(l,t,0,null,null,s,!1,a)).join(""))+lL+lL}case"hr":return"---";case"image":{if(!e.text&&!e.title)return e.href;let l=e.text?`${e.text} `:"",c=e.title?` "${e.title}"`:"";return`${l}(${e.href}${c})`}case"link":{let l=e.title?` ("${e.title}")`:"";if(e.href.startsWith("mailto:")){let p=e.href.replace(/^mailto:/,"");return(e.text&&e.text!==p?`${e.text} (${p})`:p)+l}let c=a?wHp(e.href):e.href,u=(e.tokens??[]).map((p)=>BI(p,t,0,null,e,s,!1,a)).join(""),d=cc(u);if(d&&d!==e.href)return LD(c,u,{themeName:t,supportsHyperlinks:a})+l;return LD(c,e.href,{themeName:t,supportsHyperlinks:a})+l}case"list":return e.items.map((l,c)=>BI(l,t,n,e.ordered?e.start+c:null,e,s,!1,a)).join("");case"list_item":return(e.tokens??[]).map((l)=>{let c=BI(l,t,n+1,r,e,s,!1,a);if(l.type==="code"||l.type==="blockquote"||l.type==="hr")return c;return`${"  ".repeat(n)}${c}`}).join("");case"paragraph":return(e.tokens??[]).map((l)=>BI(l,t,0,null,null,s,!1,a)).join("")+lL;case"space":return lL;case"br":return lL;case"text":if(o?.type==="link")return e.text;if(o?.type==="list_item"){let l=e.tokens?e.tokens.map((p)=>BI(p,t,n,r,e,s,!0,a)).join(""):H2a(gdo(e.text,t,a)),c=r===null?"-":`${PHp(n,r)}.`,u=o.tokens?.[0]===e,d=o.task&&u?`[${o.checked?"x":" "}] `:"";return`${c} ${d}${l}${lL}`}return i?H2a(gdo(e.text,t,a)):gdo(e.text,t,a);case"table":{let c=function(p){return cc(p?.map((m)=>BI(m,t,0,null,null,s,!1,a)).join("")??"")},l=e,u=l.header.map((p,m)=>{let f=sn(c(p.tokens));for(let h of l.rows){let g=sn(c(h[m]?.tokens));f=Math.max(f,g)}return Math.max(f,3)}),d="| ";return l.header.forEach((p,m)=>{let f=p.tokens?.map((T)=>BI(T,t,0,null,null,s,!1,a)).join("")??"",h=c(p.tokens),g=u[m],_=l.align?.[m];d+=r9n(f,sn(h),g,_)+" | "}),d=d.trimEnd()+lL,d+="|",u.forEach((p)=>{let m="-".repeat(p+2);d+=m+"|"}),d+=lL,l.rows.forEach((p)=>{d+="| ",p.forEach((m,f)=>{let h=m.tokens?.map((y)=>BI(y,t,0,null,null,s,!1,a)).join("")??"",g=c(m.tokens),_=u[f],T=l.align?.[f];d+=r9n(h,sn(g),_,T)+" | "}),d=d.trimEnd()+lL}),d+lL}case"escape":return e.text;case"html":return e.text;case"def":return""}return e.raw}
function wHp(e){if(!/^file:/i.test(e))return e;let t=e.slice(5);if(t.startsWith("//")){if(t=t.slice(2),t==="localhost")t="/";else if(t.startsWith("localhost/"))t=t.slice(9)}let n=t.search(/[#?]/),r=n===-1?"":t.slice(n),o=n===-1?t:t.slice(0,n);if(o==="")return e;try{o=decodeURIComponent(o)}catch{}o=kHp(o);let s=p3t.isAbsolute(o)?o:p3t.resolve(isTmuxControlMode(),o);return I2a.pathToFileURL(s).href+r}
function kHp(e,t=p3t.isAbsolute){if(/^\/[A-Za-z]:(?=[\\/]|$)/.test(e)&&t(e.slice(1)))return e.slice(1);return e}
function HHp(e){if(!e.includes("`")||!e.includes("|"))return e;let t="",n=0;while(n<e.length){if(e[n]!=="`"){t+=e[n++];continue}let r=0;while(e[n+r]==="`")r++;let o=e.slice(n,n+r),s=n+r,i=-1;while(s<e.length){if(e[s]!=="`"){s++;continue}let a=0;while(e[s+a]==="`")a++;if(a===r){i=s;break}s+=a}if(i===-1){t+=o,n+=r;continue}t+=o;for(let a=n+r;a<i;a++){let l=e[a];if(l!=="|"){t+=l;continue}let c=0;while(e[a-1-c]==="\\")c++;t+=c%2===0?"\\|":"|"}t+=o,n=i+r}return t}
function gdo(e,t,n=lw()){if(!n)return e;let r=getCachedRepositoryHost(),o=r&&!vHp.has(r)?r:"github.com";return e.replace(RHp,(s,i,a,l)=>i+LD(`https://${o}/${a}/issues/${l}`,`${a}#${l}`,{themeName:t,supportsHyperlinks:n}))}
function IHp(e){let t="";while(e>0)e--,t=String.fromCharCode(97+e%26)+t,e=Math.floor(e/26);return t}
function DHp(e){let t="";for(let[n,r]of xHp)while(e>=n)t+=r,e-=n;return t}
function H2a(e){return e.replace(/ (\d{1,9}[.)])(?!\w)/g,"\xA0$1")}
function PHp(e,t){switch(e){case 0:case 1:return t.toString();case 2:return IHp(t);case 3:return DHp(t);default:return t.toString()}}
function r9n(e,t,n,r){let o=Math.max(0,n-t);if(r==="center"){let s=Math.floor(o/2);return" ".repeat(s)+e+getFastModeModelDisplayName(" ",o-s)}if(r==="right")return" ".repeat(o)+e;return e+" ".repeat(o)}
var p3t,I2a,lL=`
`,k2a=!1,RHp,vHp,xHp;
var m3t=b(()=>{Gc();Krt();Kve();Pa();mc();a4();nS();Po();qe();_0();oHe();po();lr();p3t=require("path"),I2a=require("url");RHp=/(^|[^\w./-])([A-Za-z0-9][\w-]*\/[A-Za-z0-9][\w.-]*)#(\d+)\b/g,vHp=new Set(["gitlab.com","bitbucket.org","codeberg.org","gitea.com","git.sr.ht","dev.azure.com"]);xHp=[[1000,"m"],[900,"cm"],[500,"d"],[400,"cd"],[100,"c"],[90,"xc"],[50,"l"],[40,"xl"],[10,"x"],[9,"ix"],[5,"v"],[4,"iv"],[1,"i"]]});
export {w2a,o9n,s9n,BI,wHp,kHp,HHp,gdo,IHp,DHp,H2a,PHp,r9n,p3t,I2a,lL,k2a,RHp,vHp,xHp,m3t};
