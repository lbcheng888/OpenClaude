// @ts-nocheck
import {X} from "../runtime.ts";
import {dF} from "./m2298.ts";
import {MK} from "./m2323.ts";
import {EIt} from "./m2314.ts";
var ySi=X((Cnh,_Si)=>{var AUr=dF(),krd=MK(),gSi=EIt(),Hrd=(e,t)=>{e=new krd(e,t);let n=new AUr("0.0.0");if(e.test(n))return n;if(n=new AUr("0.0.0-0"),e.test(n))return n;n=null;for(let r=0;r<e.set.length;++r){let o=e.set[r],s=null;if(o.forEach((i)=>{let a=new AUr(i.semver.version);switch(i.operator){case">":if(a.prerelease.length===0)a.patch++;else a.prerelease.push(0);a.raw=a.format();case"":case">=":if(!s||gSi(a,s))s=a;break;case"<":case"<=":break;default:throw Error(`Unexpected operation: ${i.operator}`)}}),s&&(!n||gSi(n,s)))n=s}if(n&&e.test(n))return n;return null};_Si.exports=Hrd});
export {ySi};
