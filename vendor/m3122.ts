// @ts-nocheck
import {Q} from "../runtime.ts";
import {AC} from "./m3074.ts";
import {x9e} from "./m3105.ts";
import {Tee} from "./m3108.ts";
import {Cra} from "./m3120.ts";
import {vra} from "./m3121.ts";
import {bHe} from "./m3109.ts";
import {D9e} from "./m3111.ts";
var Ora=Q((PZg,Pra)=>{var jWd=AC().fromCallback,kra=require("path"),See=x9e(),Hra=Tee(),YWd=Hra.mkdirs,JWd=Hra.mkdirsSync,Ira=Cra(),XWd=Ira.symlinkPaths,QWd=Ira.symlinkPathsSync,xra=vra(),ZWd=xra.symlinkType,eGd=xra.symlinkTypeSync,tGd=bHe().pathExists,{areIdentical:Dra}=D9e();function nGd(e,t,n,r){r=typeof n==="function"?n:r,n=typeof n==="function"?!1:n,See.lstat(t,(o,s)=>{if(!o&&s.isSymbolicLink())Promise.all([See.stat(e),See.stat(t)]).then(([i,a])=>{if(Dra(i,a))return r(null);wra(e,t,n,r)});else wra(e,t,n,r)})}function wra(e,t,n,r){XWd(e,t,(o,s)=>{if(o)return r(o);e=s.toDst,ZWd(s.toCwd,n,(i,a)=>{if(i)return r(i);let l=kra.dirname(t);tGd(l,(c,u)=>{if(c)return r(c);if(u)return See.symlink(e,t,a,r);YWd(l,(d)=>{if(d)return r(d);See.symlink(e,t,a,r)})})})})}function rGd(e,t,n){let r;try{r=See.lstatSync(t)}catch{}if(r&&r.isSymbolicLink()){let a=See.statSync(e),l=See.statSync(t);if(Dra(a,l))return}let o=QWd(e,t);e=o.toDst,n=eGd(o.toCwd,n);let s=kra.dirname(t);if(See.existsSync(s))return See.symlinkSync(e,t,n);return JWd(s),See.symlinkSync(e,t,n)}Pra.exports={createSymlink:jWd(nGd),createSymlinkSync:rGd}});
export {Ora};
