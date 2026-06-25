// @ts-nocheck
import {b} from "../runtime.ts";
function A1t(e){return e.match(/^(.+):\*$/)?.[1]??null}
function wzr(e){if(e.endsWith(":*"))return!1;for(let t=0;t<e.length;t++)if(e[t]==="*"){let n=0,r=t-1;while(r>=0&&e[r]==="\\")n++,r--;if(n%2===0)return!0}return!1}
function v8i(e){let t=e.trimEnd();if(!t.endsWith("*"))return!1;let n=0,r=t.length-2;while(r>=0&&t[r]==="\\")n++,r--;return n%2===0}
function TW(e,t,n=!1,r=!1){let o=e.trim(),s=r?o.replace(/[ \t]+/g," "):o,i=r?t.replace(/[ \t]+/g," "):t,a="",l=0;while(l<s.length){let g=s[l];if(g==="\\"&&l+1<s.length){let _=s[l+1];if(_==="*"){a+="\x00ESCAPED_STAR\x00",l+=2;continue}else if(_==="\\"){a+="\x00ESCAPED_BACKSLASH\x00",l+=2;continue}}a+=g,l++}let p=a.replace(/[.+?^${}()|[\]\\'"]/g,"\\$&").replace(fFd,"\x00GLOBSTAR\x00").replaceAll("*",".*").replace(hFd,"/(?:.*/)?").replace(pFd,"\\*").replace(mFd,"\\\\"),m=(a.match(/\*/g)||[]).length;if(p.endsWith(" .*")&&m===1)p=p.slice(0,-3)+"( .*)?";let f="s"+(n?"i":"");return new RegExp(`^${p}$`,f).test(i)}
function vIn(e){let t=A1t(e);if(t!==null)return{type:"prefix",prefix:t};if(wzr(e))return{type:"wildcard",pattern:e};return{type:"exact",command:e}}
function wIn(e,t){return[{type:"addRules",rules:[{toolName:e,ruleContent:t}],behavior:"allow",destination:"localSettings"}]}
function R1t(e,t){return[{type:"addRules",rules:[{toolName:e,ruleContent:`${t} *`}],behavior:"allow",destination:"localSettings"}]}
var pFd,mFd,fFd,hFd;
var o9e=b(()=>{pFd=new RegExp("\x00ESCAPED_STAR\x00","g"),mFd=new RegExp("\x00ESCAPED_BACKSLASH\x00","g"),fFd=/\/(?:\*\*\/)+/g,hFd=new RegExp("\x00GLOBSTAR\x00","g")});
export {A1t,wzr,v8i,TW,vIn,wIn,R1t,pFd,mFd,fFd,hFd,o9e};
