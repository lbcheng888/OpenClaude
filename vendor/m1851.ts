// @ts-nocheck
import {X} from "../runtime.ts";
import {JB} from "./m1820.ts";
import {initSessionMetadataPersistence} from "./m1845.ts";
import {wxt} from "./m1836.ts";
var AYs=X((ZNA,fYs)=>{var CDr=JB(),t9u=initSessionMetadataPersistence(),mYs=wxt(),n9u=(e,t)=>{e=new t9u(e,t);let n=new CDr("0.0.0");if(e.test(n))return n;if(n=new CDr("0.0.0-0"),e.test(n))return n;n=null;for(let r=0;r<e.set.length;++r){let o=e.set[r],s=null;if(o.forEach((i)=>{let a=new CDr(i.semver.version);switch(i.operator){case">":if(a.prerelease.length===0)a.patch++;else a.prerelease.push(0);a.raw=a.format();case"":case">=":if(!s||mYs(a,s))s=a;break;case"<":case"<=":break;default:throw Error(`Unexpected operation: ${i.operator}`)}}),s&&(!n||mYs(n,s)))n=s}if(n&&e.test(n))return n;return null};fYs.exports=n9u});
export {AYs};
