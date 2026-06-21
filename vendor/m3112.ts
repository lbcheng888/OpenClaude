// @ts-nocheck
import {X} from "../runtime.ts";
import {EC} from "./m3064.ts";
import {x$e} from "./m3095.ts";
import {Eee} from "./m3098.ts";
import {HJi} from "./m3110.ts";
import {PJi} from "./m3111.ts";
import {Pxe} from "./m3099.ts";
import {k$e} from "./m3101.ts";
var $Ji=X((Wjh,UJi)=>{var mUd=EC().fromCallback,LJi=require("path"),Cee=x$e(),MJi=Eee(),fUd=MJi.mkdirs,AUd=MJi.mkdirsSync,NJi=HJi(),hUd=NJi.symlinkPaths,gUd=NJi.symlinkPathsSync,BJi=PJi(),_Ud=BJi.symlinkType,yUd=BJi.symlinkTypeSync,TUd=Pxe().pathExists,{areIdentical:FJi}=k$e();function SUd(e,t,n,r){r=typeof n==="function"?n:r,n=typeof n==="function"?!1:n,Cee.lstat(t,(o,s)=>{if(!o&&s.isSymbolicLink())Promise.all([Cee.stat(e),Cee.stat(t)]).then(([i,a])=>{if(FJi(i,a))return r(null);OJi(e,t,n,r)});else OJi(e,t,n,r)})}function OJi(e,t,n,r){hUd(e,t,(o,s)=>{if(o)return r(o);e=s.toDst,_Ud(s.toCwd,n,(i,a)=>{if(i)return r(i);let l=LJi.dirname(t);TUd(l,(c,u)=>{if(c)return r(c);if(u)return Cee.symlink(e,t,a,r);fUd(l,(d)=>{if(d)return r(d);Cee.symlink(e,t,a,r)})})})})}function bUd(e,t,n){let r;try{r=Cee.lstatSync(t)}catch{}if(r&&r.isSymbolicLink()){let a=Cee.statSync(e),l=Cee.statSync(t);if(FJi(a,l))return}let o=gUd(e,t);e=o.toDst,n=yUd(o.toCwd,n);let s=LJi.dirname(t);if(Cee.existsSync(s))return Cee.symlinkSync(e,t,n);return AUd(s),Cee.symlinkSync(e,t,n)}UJi.exports={createSymlink:mUd(SUd),createSymlinkSync:bUd}});
export {$Ji};
