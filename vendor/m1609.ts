// @ts-nocheck
import {b} from "../runtime.ts";
import {$7s} from "./m1584.ts";
import {czs} from "./m1600.ts";
import {uzs} from "./m1601.ts";
import {pzs} from "./m1603.ts";
import {mzs,uPr} from "./m1604.ts";
import {gzs} from "./m1607.ts";
import {_zs} from "./m1608.ts";
import {cPr} from "./m1602.ts";
function GXe(e,t,n){let r,o,s;if(typeof t>"u"&&typeof n>"u")r={},s=e;else if(r=e,typeof t==="function")return o=t,s=n,Y4u(r,o,s);else s=t;for(let i of Object.keys(s)){if(!Array.isArray(s[i])){r[i]=s[i];continue}yzs(r,null,s,i)}return r}
var VXe=(e,t)=>{let n={};for(let r in t)yzs(n,e,t,r);return n},Y4u=(e,t,n)=>GXe(e,Object.entries(n).reduce((r,[o,s])=>{if(Array.isArray(s))r[o]=s;else if(typeof s==="function")r[o]=[t,s()];else r[o]=[t,s];return r},{})),yzs=(e,t,n,r)=>{if(t!==null){let i=n[r];if(typeof i==="function")i=[,i];let[a=J4u,l=X4u,c=r]=i;if(typeof a==="function"&&a(t[c])||typeof a!=="function"&&!!a)e[r]=l(t[c]);return}let[o,s]=n[r];if(typeof s==="function"){let i,a=o===void 0&&(i=s())!=null,l=typeof o==="function"&&!!o(void 0)||typeof o!=="function"&&!!o;if(a)e[r]=i;else if(l)e[r]=s()}else{let i=o===void 0&&s!=null,a=typeof o==="function"&&!!o(s)||typeof o!=="function"&&!!o;if(i||a)e[r]=s}},J4u=(e)=>e!=null,X4u=(e)=>e;
var Tzs=()=>{};
var Szs=b(()=>{$7s();czs();uzs();pzs();mzs();gzs();uPr();_zs();cPr();Tzs()});
export {GXe,VXe,Y4u,yzs,J4u,X4u,Tzs,Szs};
