// @ts-nocheck
import {b} from "../runtime.ts";
function s5t(){let e=new Set,t="";return{feed(n,r){let o=t?t+n:n;nOl.lastIndex=0;let s,i=0,a=!1;while((s=nOl.exec(o))!==null){let u=s[2]==="h";for(let d of s[1].split(";")){let p=Number(d);if(tOl.has(p)&&e.has(p)!==u){if(u)e.add(p),r?.(p);else e.delete(p);a=!0}}i=s.index+s[0].length}let l=o.slice(Math.max(i,o.length-16)),c=l.lastIndexOf("\x1B");return t=c>=0&&/^\x1b(\[(\?[\d;]*)?)?$/.test(l.slice(c))?l.slice(c):"",a},seed(n){for(let r of n)if(tOl.has(r))e.add(r)},snapshot(){return[...e]}}}
var tOl,nOl;
var $xo=b(()=>{tOl=new Set([1000,1002,1003,1004,1006,2004,2031]),nOl=/\x1b\[\?([\d;]+)([hl])/g});
export {s5t,tOl,nOl,$xo};
