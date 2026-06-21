// @ts-nocheck
import {Txe,Dxn} from "./m3029.ts";
import {zVi,YVi} from "./m3046.ts";
import {Lxn,Mxn} from "./m3045.ts";
import {b} from "../runtime.ts";
function JVi({active:e,pageSize:t,total:n}){let r=Math.floor(t/2);if(n<=t||e<r)return e;if(e>=n-r)return e+t-n;return r}
function XVi({active:e,lastActive:t,total:n,pageSize:r,pointer:o}){if(n<=r)return e;if(t<e&&e-t<r)return Math.min(Math.floor(r/2),o+e-t);return o}
function OGr({items:e,active:t,renderItem:n,pageSize:r,loop:o=!0}){let s=Txe({position:0,lastActive:0}),i=o?XVi({active:t,lastActive:s.current.lastActive,total:e.length,pageSize:r,pointer:s.current.position}):JVi({active:t,total:e.length,pageSize:r});return s.current.position=i,s.current.lastActive=t,zVi({items:e,width:Lxn(),renderItem:n,active:t,position:i,pageSize:r}).join(`
`)}
var QVi=b(()=>{Dxn();Mxn();YVi()});
export {JVi,XVi,OGr,QVi};
