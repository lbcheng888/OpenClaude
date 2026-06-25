// @ts-nocheck
import {Q} from "../runtime.ts";
import {AC} from "./m3074.ts";
import {H9e} from "./m3075.ts";
import {_ee} from "./m3078.ts";
import {wta} from "./m3090.ts";
import {Ita} from "./m3091.ts";
import {gHe} from "./m3079.ts";
import {I9e} from "./m3081.ts";
var Fta=Q((nZg,Nta)=>{var Y5d=AC().fromCallback,Dta=require("path"),yee=H9e(),Pta=_ee(),J5d=Pta.mkdirs,X5d=Pta.mkdirsSync,Ota=wta(),Q5d=Ota.symlinkPaths,Z5d=Ota.symlinkPathsSync,Lta=Ita(),e8d=Lta.symlinkType,t8d=Lta.symlinkTypeSync,n8d=gHe().pathExists,{areIdentical:Mta}=I9e();function r8d(e,t,n,r){r=typeof n==="function"?n:r,n=typeof n==="function"?!1:n,yee.lstat(t,(o,s)=>{if(!o&&s.isSymbolicLink())Promise.all([yee.stat(e),yee.stat(t)]).then(([i,a])=>{if(Mta(i,a))return r(null);xta(e,t,n,r)});else xta(e,t,n,r)})}function xta(e,t,n,r){Q5d(e,t,(o,s)=>{if(o)return r(o);e=s.toDst,e8d(s.toCwd,n,(i,a)=>{if(i)return r(i);let l=Dta.dirname(t);n8d(l,(c,u)=>{if(c)return r(c);if(u)return yee.symlink(e,t,a,r);J5d(l,(d)=>{if(d)return r(d);yee.symlink(e,t,a,r)})})})})}function o8d(e,t,n){let r;try{r=yee.lstatSync(t)}catch{}if(r&&r.isSymbolicLink()){let a=yee.statSync(e),l=yee.statSync(t);if(Mta(a,l))return}let o=Z5d(e,t);e=o.toDst,n=t8d(o.toCwd,n);let s=Dta.dirname(t);if(yee.existsSync(s))return yee.symlinkSync(e,t,n);return X5d(s),yee.symlinkSync(e,t,n)}Nta.exports={createSymlink:Y5d(r8d),createSymlinkSync:o8d}});
export {Fta};
