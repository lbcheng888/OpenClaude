// @ts-nocheck
import {Q} from "../runtime.ts";
import {TF} from "./m1825.ts";
import {x7} from "./m1850.ts";
import {ZIt} from "./m1841.ts";
var uti=Q((bWh,cti)=>{var e1r=TF(),SKu=x7(),lti=ZIt(),bKu=(e,t)=>{e=new SKu(e,t);let n=new e1r("0.0.0");if(e.test(n))return n;if(n=new e1r("0.0.0-0"),e.test(n))return n;n=null;for(let r=0;r<e.set.length;++r){let o=e.set[r],s=null;if(o.forEach((i)=>{let a=new e1r(i.semver.version);switch(i.operator){case">":if(a.prerelease.length===0)a.patch++;else a.prerelease.push(0);a.raw=a.format();case"":case">=":if(!s||lti(a,s))s=a;break;case"<":case"<=":break;default:throw Error(`Unexpected operation: ${i.operator}`)}}),s&&(!n||lti(n,s)))n=s}if(n&&e.test(n))return n;return null};cti.exports=bKu});
export {uti};
