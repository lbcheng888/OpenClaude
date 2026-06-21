// @ts-nocheck
import {Link} from "./m2427.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function FSp(e){while(e.length>0){let t=e.at(-1);if(".,;:!?".includes(t)){e=e.slice(0,-1);continue}let n=BSp[t];if(!n)break;let r=0,o=0;for(let s of e)if(s===n)r++;else if(s===t)o++;if(o>r)e=e.slice(0,-1);else break}return e}
function J2t(e){let t=vMa.c(9),{children:n,color:r,bold:o}=e,s;if(t[0]!==n){s=[];let a=0;for(let c of n.matchAll(NSp)){let u=FSp(c[0]);if(c.index>a)s.push(n.slice(a,c.index));s.push(Hio.default.createElement(Link,{key:c.index,url:u},u)),a=c.index+u.length}let l;if(t[2]!==n||t[3]!==a)l=n.slice(a),t[2]=n,t[3]=a,t[4]=l;else l=t[4];s.push(l),t[0]=n,t[1]=s}else s=t[1];let i;if(t[5]!==o||t[6]!==r||t[7]!==s)i=Hio.default.createElement(Text,{color:r,bold:o},s),t[5]=o,t[6]=r,t[7]=s,t[8]=i;else i=t[8];return i}
var vMa,Hio,NSp,BSp;
var Iio=b(()=>{ze();vMa=M(rt(),1),Hio=M(Te(),1),NSp=/https?:\/\/[^\s"'<>\\\u2026\x00-\x1f]+/g,BSp={")":"(","]":"[","}":"{"}});
export {FSp,J2t,vMa,Hio,NSp,BSp,Iio};
