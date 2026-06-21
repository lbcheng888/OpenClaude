// @ts-nocheck
import {wLt,Mxn} from "./m3045.ts";
import {b} from "../runtime.ts";
function b1d(e,t){return wLt(e,t).split(`
`)}
function E1d(e,t){let n=t.length,r=(e%n+n)%n;return[...t.slice(r),...t.slice(0,r)]}
function zVi({items:e,width:t,renderItem:n,active:r,position:o,pageSize:s}){let i=e.map((f,A)=>({item:f,index:A,isActive:A===r})),a=E1d(r-o,i).slice(0,s),l=(f)=>a[f]==null?[]:b1d(n(a[f]),t),c=Array.from({length:s}),u=l(o).slice(0,s),d=o+u.length<=s?o:s-u.length;c.splice(d,u.length,...u);let p=d+u.length,m=o+1;while(p<s&&m<a.length){for(let f of l(m))if(c[p++]=f,p>=s)break;m++}p=d-1,m=o-1;while(p>=0&&m>=0){for(let f of l(m).reverse())if(c[p--]=f,p<0)break;m--}return c.filter((f)=>typeof f==="string")}
var YVi=b(()=>{Mxn()});
export {b1d,E1d,zVi,YVi};
