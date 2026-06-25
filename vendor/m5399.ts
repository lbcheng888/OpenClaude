// @ts-nocheck
import {uwe,VF,J2} from "../src/session/2532_id.ts";
import {b} from "../runtime.ts";
function zBm(e,t,n=!1){if(!n&&e.length<=kYl||e.length<=myt)return{truncatedText:e,placeholderContent:""};let r=Math.floor(myt/2),o=Math.floor(myt/2),s=e.slice(0,r),i=e.slice(-o),a=e.slice(r,-o),l=uwe(a),u=jBm(t,l);return{truncatedText:s+u+i,placeholderContent:a}}
function jBm(e,t){return`[...Truncated text #${e} +${t} lines...]`}
function HYl(e,t){if(e.length<=kYl)return{newInput:e,newPastedContents:t};let n=Object.keys(t).map(Number),r=n.length>0?Math.max(...n)+1:1,o=Math.floor(myt/2),s=e.length-Math.floor(myt/2),i=new Set,a=new Set,l=[],c=e,u=VF(e);for(let h=u.length-1;h>=0;h--){let g=u[h],_=t[g.id];if(!_)continue;let T=g.index+g.match.length,y=T>o&&g.index<s;if(_.type!=="text"){if(y)l.unshift(g.match),c=c.slice(0,g.index)+c.slice(T);continue}if(!y){a.add(g.id);continue}c=c.slice(0,g.index)+_.content+c.slice(T),i.add(g.id)}let{truncatedText:d,placeholderContent:p}=zBm(c,r,!0);if(!p)return{newInput:e,newPastedContents:t};let m=d;if(l.length>0){let h=Math.floor(myt/2);m=d.slice(0,h)+l.join("")+d.slice(h)}let f={};for(let[h,g]of Object.entries(t)){let _=Number(h);if(i.has(_)&&!a.has(_))continue;f[_]=g}return f[r]={id:r,type:"text",content:p},{newInput:m,newPastedContents:f}}
var kYl=1e4,myt=1000;
var IYl=b(()=>{J2()});
export {zBm,jBm,HYl,kYl,myt,IYl};
