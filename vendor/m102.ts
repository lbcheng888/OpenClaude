// @ts-nocheck
import {b} from "../runtime.ts";
import {dqo,uqo} from "./m101.ts";
var uRc,dRc,pRc,pqo;
var mqo=b(()=>{dqo();uRc=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,dRc=/\\(\\)?/g,pRc=uqo(function(e){var t=[];if(e.charCodeAt(0)===46)t.push("");return e.replace(uRc,function(n,r,o,s){t.push(o?s.replace(dRc,"$1"):r||n)}),t}),pqo=pRc});
export {uRc,dRc,pRc,pqo,mqo};
