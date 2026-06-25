// @ts-nocheck
import {Link} from "./m2437.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function cpo(e){while(e.length>0){let t=e.at(-1);if(".,;:!?".includes(t)){e=e.slice(0,-1);continue}let n=I0p[t];if(!n)break;let r=0,o=0;for(let s of e)if(s===n)r++;else if(s===t)o++;if(o>r)e=e.slice(0,-1);else break}return e}
function H6e(e){let t=K9a.c(9),{children:n,color:r,bold:o}=e,s;if(t[0]!==n){s=[];let a=0;for(let c of n.matchAll(H0p)){let u=cpo(c[0]);if(c.index>a)s.push(n.slice(a,c.index));s.push(lpo.jsx(Link,{url:u,children:u},c.index)),a=c.index+u.length}let l;if(t[2]!==n||t[3]!==a)l=n.slice(a),t[2]=n,t[3]=a,t[4]=l;else l=t[4];s.push(l),t[0]=n,t[1]=s}else s=t[1];let i;if(t[5]!==o||t[6]!==r||t[7]!==s)i=lpo.jsx(Text,{color:r,bold:o,children:s}),t[5]=o,t[6]=r,t[7]=s,t[8]=i;else i=t[8];return i}
var K9a,lpo,H0p,I0p;
var K9n=b(()=>{je();K9a=x(tt(),1),lpo=x(oe(),1),H0p=/https?:\/\/[^\s"'<>\\\u2026\x00-\x1f]+/g,I0p={")":"(","]":"[","}":"{"}});
export {cpo,H6e,K9a,lpo,H0p,I0p,K9n};
