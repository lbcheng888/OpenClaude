// @ts-nocheck
import {b} from "../runtime.ts";
function Adt(e){let t=e.toUpperCase();return J0p[t]??`${t} `}
function initY_(e,t,n="precise"){let r=t.toUpperCase(),o=Adt(r);if(X0p.has(r))return`${o}${Math.round(e)}`;let s=e/100;if(n==="whole")return`${o}${Math.round(s)}`;if(n==="fit"&&s%1===0)return`${o}${s}`;return`${o}${s.toFixed(2)}`}
var J0p,X0p;
var bye=b(()=>{J0p={USD:"$",EUR:"\u20AC",GBP:"\xA3",JPY:"\xA5",BRL:"R$",CAD:"CA$",AUD:"A$",NZD:"NZ$",SGD:"S$"},X0p=new Set(["JPY","KRW","VND"])});
export {Adt,initY_,J0p,X0p,bye};
