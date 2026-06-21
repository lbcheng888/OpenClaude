// @ts-nocheck
import {w2e,OA,Wtt} from "./m2708.ts";
import {rIe,lo} from "../src/tools/5190_userPromptCount.ts";
import {JR,U4} from "./m2426.ts";
import {_t,cu} from "./m582.ts";
import {zts,sl} from "./m715.ts";
import {Ec} from "./m2449.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {No,lwe} from "./m2421.ts";
import {MF,s$e} from "./m2801.ts";
import {tn,Hc} from "./m235.ts";
import {Pt,Go} from "./m632.ts";
import {getCachedRepositoryHost,ZI} from "./m692.ts";
import {uf,dr} from "./m231.ts";
import {b} from "../runtime.ts";
function pUn(){if(YLa)return;YLa=!0;let e=w2e.prototype.table;OA.use({tokenizer:{del(){return},def(){return},table(t){let n=this.rules.block.table.exec(t);if(!n)return;let r=n[0],o=r.split(`
`).map(gSp).join(`
`);if(o===r)return e.call(this,t);let s=e.call(this,o+t.slice(r.length));if(s)s.raw=r;return s}}})}
function mUn(e,t,n=null){return pUn(),OA.lexer(rIe(e)).map((r)=>z0(r,t,0,null,null,n)).join("").trim()}
function z0(e,t,n=0,r=null,o=null,s=null,i=!1,a=JR()){switch(e.type){case"blockquote":{let l=(e.tokens??[]).map((u)=>z0(u,t,0,null,null,s,!1,a)).join(""),c=_t.dim(zts);return l.split($L).map((u)=>Ec(u).trim()?`${c} ${_t.italic(u)}`:u).join($L)}case"code":{if(!s)return e.text+$L;let l="plaintext";if(e.lang)if(s.supportsLanguage(e.lang))l=e.lang;else logForDebugging(`Language not supported while highlighting code, falling back to plaintext: ${e.lang}`);return s.highlight(e.text,{language:l})+$L}case"codespan":return No("permission",t)(e.text);case"em":return _t.italic((e.tokens??[]).map((l)=>z0(l,t,0,null,o,s,i,a)).join(""));case"strong":return _t.bold((e.tokens??[]).map((l)=>z0(l,t,0,null,o,s,i,a)).join(""));case"heading":switch(e.depth){case 1:return _t.bold.italic.underline((e.tokens??[]).map((l)=>z0(l,t,0,null,null,s,!1,a)).join(""))+$L+$L;case 2:return _t.bold((e.tokens??[]).map((l)=>z0(l,t,0,null,null,s,!1,a)).join(""))+$L+$L;default:return _t.bold((e.tokens??[]).map((l)=>z0(l,t,0,null,null,s,!1,a)).join(""))+$L+$L}case"hr":return"---";case"image":{if(!e.text&&!e.title)return e.href;let l=e.text?`${e.text} `:"",c=e.title?` "${e.title}"`:"";return`${l}(${e.href}${c})`}case"link":{let l=e.title?` ("${e.title}")`:"";if(e.href.startsWith("mailto:")){let p=e.href.replace(/^mailto:/,"");return(e.text&&e.text!==p?`${e.text} (${p})`:p)+l}let c=a?ASp(e.href):e.href,u=(e.tokens??[]).map((p)=>z0(p,t,0,null,e,s,!1,a)).join(""),d=Ec(u);if(d&&d!==e.href)return MF(c,u,{themeName:t,supportsHyperlinks:a})+l;return MF(c,e.href,{themeName:t,supportsHyperlinks:a})+l}case"list":return e.items.map((l,c)=>z0(l,t,n,e.ordered?e.start+c:null,e,s,!1,a)).join("");case"list_item":return(e.tokens??[]).map((l)=>{let c=z0(l,t,n+1,r,e,s,!1,a);if(l.type==="code"||l.type==="blockquote"||l.type==="hr")return c;return`${"  ".repeat(n)}${c}`}).join("");case"paragraph":return(e.tokens??[]).map((l)=>z0(l,t,0,null,null,s,!1,a)).join("")+$L;case"space":return $L;case"br":return $L;case"text":if(o?.type==="link")return e.text;if(o?.type==="list_item"){let l=e.tokens?e.tokens.map((p)=>z0(p,t,n,r,e,s,!0,a)).join(""):JLa(wio(e.text,t,a)),c=r===null?"-":`${SSp(n,r)}.`,u=o.tokens?.[0]===e,d=o.task&&u?`[${o.checked?"x":" "}] `:"";return`${c} ${d}${l}${$L}`}return i?JLa(wio(e.text,t,a)):wio(e.text,t,a);case"table":{let c=function(p){return Ec(p?.map((m)=>z0(m,t,0,null,null,s,!1,a)).join("")??"")},l=e,u=l.header.map((p,m)=>{let f=tn(c(p.tokens));for(let A of l.rows){let h=tn(c(A[m]?.tokens));f=Math.max(f,h)}return Math.max(f,3)}),d="| ";return l.header.forEach((p,m)=>{let f=p.tokens?.map((_)=>z0(_,t,0,null,null,s,!1,a)).join("")??"",A=c(p.tokens),h=u[m],g=l.align?.[m];d+=dUn(f,tn(A),h,g)+" | "}),d=d.trimEnd()+$L,d+="|",u.forEach((p)=>{let m="-".repeat(p+2);d+=m+"|"}),d+=$L,l.rows.forEach((p)=>{d+="| ",p.forEach((m,f)=>{let A=m.tokens?.map((y)=>z0(y,t,0,null,null,s,!1,a)).join("")??"",h=c(m.tokens),g=u[f],_=l.align?.[f];d+=dUn(A,tn(h),g,_)+" | "}),d=d.trimEnd()+$L}),d+$L}case"escape":return e.text;case"html":return e.text;case"def":case"del":return""}return e.raw}
function ASp(e){if(!/^file:/i.test(e))return e;let t=e.slice(5);if(t.startsWith("//")){if(t=t.slice(2),t==="localhost")t="/";else if(t.startsWith("localhost/"))t=t.slice(9)}let n=t.search(/[#?]/),r=n===-1?"":t.slice(n),o=n===-1?t:t.slice(0,n);if(o==="")return e;try{o=decodeURIComponent(o)}catch{}o=hSp(o);let s=G2t.isAbsolute(o)?o:G2t.resolve(Pt(),o);return XLa.pathToFileURL(s).href+r}
function hSp(e,t=G2t.isAbsolute){if(/^\/[A-Za-z]:(?=[\\/]|$)/.test(e)&&t(e.slice(1)))return e.slice(1);return e}
function gSp(e){if(!e.includes("`")||!e.includes("|"))return e;let t="",n=0;while(n<e.length){if(e[n]!=="`"){t+=e[n++];continue}let r=0;while(e[n+r]==="`")r++;let o=e.slice(n,n+r),s=n+r,i=-1;while(s<e.length){if(e[s]!=="`"){s++;continue}let a=0;while(e[s+a]==="`")a++;if(a===r){i=s;break}s+=a}if(i===-1){t+=o,n+=r;continue}t+=o;for(let a=n+r;a<i;a++){let l=e[a];if(l!=="|"){t+=l;continue}let c=0;while(e[a-1-c]==="\\")c++;t+=c%2===0?"\\|":"|"}t+=o,n=i+r}return t}
function wio(e,t,n=JR()){if(!n)return e;let r=getCachedRepositoryHost(),o=r&&!fSp.has(r)?r:"github.com";return e.replace(mSp,(s,i,a,l)=>i+MF(`https://${o}/${a}/issues/${l}`,`${a}#${l}`,{themeName:t,supportsHyperlinks:n}))}
function _Sp(e){let t="";while(e>0)e--,t=String.fromCharCode(97+e%26)+t,e=Math.floor(e/26);return t}
function TSp(e){let t="";for(let[n,r]of ySp)while(e>=n)t+=r,e-=n;return t}
function JLa(e){return e.replace(/ (\d{1,9}[.)])(?!\w)/g,"\xA0$1")}
function SSp(e,t){switch(e){case 0:case 1:return t.toString();case 2:return _Sp(t);case 3:return TSp(t);default:return t.toString()}}
function dUn(e,t,n,r){let o=Math.max(0,n-t);if(r==="center"){let s=Math.floor(o/2);return" ".repeat(s)+e+uf(" ",o-s)}if(r==="right")return" ".repeat(o)+e;return e+" ".repeat(o)}
var G2t,XLa,$L=`
`,YLa=!1,mSp,fSp,ySp;
var V2t=b(()=>{cu();Wtt();lwe();sl();Hc();U4();Go();qe();ZI();s$e();lo();dr();G2t=require("path"),XLa=require("url");mSp=/(^|[^\w./-])([A-Za-z0-9][\w-]*\/[A-Za-z0-9][\w.-]*)#(\d+)\b/g,fSp=new Set(["gitlab.com","bitbucket.org","codeberg.org","gitea.com","git.sr.ht","dev.azure.com"]);ySp=[[1000,"m"],[900,"cm"],[500,"d"],[400,"cd"],[100,"c"],[90,"xc"],[50,"l"],[40,"xl"],[10,"x"],[9,"ix"],[5,"v"],[4,"iv"],[1,"i"]]});
export {pUn,mUn,z0,ASp,hSp,gSp,wio,_Sp,TSp,JLa,SSp,dUn,G2t,XLa,$L,YLa,mSp,fSp,ySp,V2t};
