// @ts-nocheck
import {b} from "../runtime.ts";
function uct(e){let t=e.toUpperCase();return XSp[t]??`${t} `}
function H_(e,t,n="precise"){let r=t.toUpperCase(),o=uct(r);if(QSp.has(r))return`${o}${Math.round(e)}`;let s=e/100;if(n==="whole")return`${o}${Math.round(s)}`;if(n==="fit"&&s%1===0)return`${o}${s}`;return`${o}${s.toFixed(2)}`}
var XSp,QSp;
var Zge=b(()=>{XSp={USD:"$",EUR:"\u20AC",GBP:"\xA3",JPY:"\xA5",BRL:"R$",CAD:"CA$",AUD:"A$",NZD:"NZ$",SGD:"S$"},QSp=new Set(["JPY","KRW","VND"])});
export {uct,H_,XSp,QSp,Zge};
