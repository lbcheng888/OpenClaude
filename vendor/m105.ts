// @ts-nocheck
import {b} from "../runtime.ts";
import {HUo,kUo} from "./m104.ts";
var aAc,lAc,cAc,IUo;
var DUo=b(()=>{HUo();aAc=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,lAc=/\\(\\)?/g,cAc=kUo(function(e){var t=[];if(e.charCodeAt(0)===46)t.push("");return e.replace(aAc,function(n,r,o,s){t.push(o?s.replace(lAc,"$1"):r||n)}),t}),IUo=cAc});
export {aAc,lAc,cAc,IUo,DUo};
