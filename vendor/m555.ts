// @ts-nocheck
import {b} from "../runtime.ts";
function tVc(e,t){let n=0,r=1000/t,o,s,i=(c,u=Date.now())=>{if(n=u,o=null,s)clearTimeout(s),s=null;e(...c)};return[(...c)=>{let u=Date.now(),d=u-n;if(d>=r)i(c,u);else if(o=c,!s)s=setTimeout(()=>{s=null,i(o)},r-d)},()=>o&&i(o)]}
var tes;
var nes=b(()=>{tes=tVc});
export {tVc,tes,nes};
