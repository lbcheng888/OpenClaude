// @ts-nocheck
import {b} from "../runtime.ts";
import {Vjs} from "./m1579.ts";
import {f8s} from "./m1595.ts";
import {A8s} from "./m1596.ts";
import {g8s} from "./m1598.ts";
import {_8s,Okr} from "./m1599.ts";
import {S8s} from "./m1602.ts";
import {b8s} from "./m1603.ts";
import {Pkr} from "./m1597.ts";
function VYe(e,t,n){let r,o,s;if(typeof t>"u"&&typeof n>"u")r={},s=e;else if(r=e,typeof t==="function")return o=t,s=n,HMu(r,o,s);else s=t;for(let i of Object.keys(s)){if(!Array.isArray(s[i])){r[i]=s[i];continue}E8s(r,null,s,i)}return r}
var KYe=(e,t)=>{let n={};for(let r in t)E8s(n,e,t,r);return n},HMu=(e,t,n)=>VYe(e,Object.entries(n).reduce((r,[o,s])=>{if(Array.isArray(s))r[o]=s;else if(typeof s==="function")r[o]=[t,s()];else r[o]=[t,s];return r},{})),E8s=(e,t,n,r)=>{if(t!==null){let i=n[r];if(typeof i==="function")i=[,i];let[a=IMu,l=DMu,c=r]=i;if(typeof a==="function"&&a(t[c])||typeof a!=="function"&&!!a)e[r]=l(t[c]);return}let[o,s]=n[r];if(typeof s==="function"){let i,a=o===void 0&&(i=s())!=null,l=typeof o==="function"&&!!o(void 0)||typeof o!=="function"&&!!o;if(a)e[r]=i;else if(l)e[r]=s()}else{let i=o===void 0&&s!=null,a=typeof o==="function"&&!!o(s)||typeof o!=="function"&&!!o;if(i||a)e[r]=s}},IMu=(e)=>e!=null,DMu=(e)=>e;
var C8s=()=>{};
var v8s=b(()=>{Vjs();f8s();A8s();g8s();_8s();S8s();Okr();b8s();Pkr();C8s()});
export {VYe,KYe,HMu,E8s,IMu,DMu,C8s,v8s};
