// @ts-nocheck
import {lHe,b0n} from "./m3039.ts";
import {$Qi,qQi} from "./m3056.ts";
import {A0n,R0n} from "./m3055.ts";
import {b} from "../runtime.ts";
function WQi({active:e,pageSize:t,total:n}){let r=Math.floor(t/2);if(n<=t||e<r)return e;if(e>=n-r)return e+t-n;return r}
function GQi({active:e,lastActive:t,total:n,pageSize:r,pointer:o}){if(n<=r)return e;if(t<e&&e-t<r)return Math.min(Math.floor(r/2),o+e-t);return o}
function hYr({items:e,active:t,renderItem:n,pageSize:r,loop:o=!0}){let s=lHe({position:0,lastActive:0}),i=o?GQi({active:t,lastActive:s.current.lastActive,total:e.length,pageSize:r,pointer:s.current.position}):WQi({active:t,total:e.length,pageSize:r});return s.current.position=i,s.current.lastActive=t,$Qi({items:e,width:A0n(),renderItem:n,active:t,position:i,pageSize:r}).join(`
`)}
var VQi=b(()=>{b0n();R0n();qQi()});
export {WQi,GQi,hYr,VQi};
