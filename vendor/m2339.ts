// @ts-nocheck
import {Q} from "../runtime.ts";
import {OF} from "./m2308.ts";
import {dz} from "./m2333.ts";
import {XDt} from "./m2324.ts";
var wwi=Q((ohg,vwi)=>{var K3r=OF(),nfd=dz(),Rwi=XDt(),rfd=(e,t)=>{e=new nfd(e,t);let n=new K3r("0.0.0");if(e.test(n))return n;if(n=new K3r("0.0.0-0"),e.test(n))return n;n=null;for(let r=0;r<e.set.length;++r){let o=e.set[r],s=null;if(o.forEach((i)=>{let a=new K3r(i.semver.version);switch(i.operator){case">":if(a.prerelease.length===0)a.patch++;else a.prerelease.push(0);a.raw=a.format();case"":case">=":if(!s||Rwi(a,s))s=a;break;case"<":case"<=":break;default:throw Error(`Unexpected operation: ${i.operator}`)}}),s&&(!n||Rwi(n,s)))n=s}if(n&&e.test(n))return n;return null};vwi.exports=rfd});
export {wwi};
