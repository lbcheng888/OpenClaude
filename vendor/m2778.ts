// @ts-nocheck
import {b} from "../runtime.ts";
function VOt(e){return e.match(/^(.+):\*$/)?.[1]??null}
function z5r(e){if(e.endsWith(":*"))return!1;for(let t=0;t<e.length;t++)if(e[t]==="*"){let n=0,r=t-1;while(r>=0&&e[r]==="\\")n++,r--;if(n%2===0)return!0}return!1}
function L$i(e){let t=e.trimEnd();if(!t.endsWith("*"))return!1;let n=0,r=t.length-2;while(r>=0&&t[r]==="\\")n++,r--;return n%2===0}
function oW(e,t,n=!1,r=!1){let o=e.trim(),s=r?o.replace(/[ \t]+/g," "):o,i=r?t.replace(/[ \t]+/g," "):t,a="",l=0;while(l<s.length){let h=s[l];if(h==="\\"&&l+1<s.length){let g=s[l+1];if(g==="*"){a+="\x00ESCAPED_STAR\x00",l+=2;continue}else if(g==="\\"){a+="\x00ESCAPED_BACKSLASH\x00",l+=2;continue}}a+=h,l++}let p=a.replace(/[.+?^${}()|[\]\\'"]/g,"\\$&").replace(xkd,"\x00GLOBSTAR\x00").replaceAll("*",".*").replace(kkd,"/(?:.*/)?").replace(wkd,"\\*").replace(Rkd,"\\\\"),m=(a.match(/\*/g)||[]).length;if(p.endsWith(" .*")&&m===1)p=p.slice(0,-3)+"( .*)?";let f="s"+(n?"i":"");return new RegExp(`^${p}$`,f).test(i)}
function $Rn(e){let t=VOt(e);if(t!==null)return{type:"prefix",prefix:t};if(z5r(e))return{type:"wildcard",pattern:e};return{type:"exact",command:e}}
function qRn(e,t){return[{type:"addRules",rules:[{toolName:e,ruleContent:t}],behavior:"allow",destination:"localSettings"}]}
function KOt(e,t){return[{type:"addRules",rules:[{toolName:e,ruleContent:`${t} *`}],behavior:"allow",destination:"localSettings"}]}
var wkd,Rkd,xkd,kkd;
var X2e=b(()=>{wkd=new RegExp("\x00ESCAPED_STAR\x00","g"),Rkd=new RegExp("\x00ESCAPED_BACKSLASH\x00","g"),xkd=/\/(?:\*\*\/)+/g,kkd=new RegExp("\x00GLOBSTAR\x00","g")});
export {VOt,z5r,L$i,oW,$Rn,qRn,KOt,wkd,Rkd,xkd,kkd,X2e};
