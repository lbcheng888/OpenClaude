// @ts-nocheck
import {X} from "../runtime.ts";
import {EC} from "./m3064.ts";
import {w$e} from "./m3065.ts";
import {See} from "./m3068.ts";
import {Ozi} from "./m3080.ts";
import {Nzi} from "./m3081.ts";
import {xxe} from "./m3069.ts";
import {R$e} from "./m3071.ts";
var Gzi=X((mjh,Wzi)=>{var fBd=EC().fromCallback,Fzi=require("path"),bee=w$e(),Uzi=See(),ABd=Uzi.mkdirs,hBd=Uzi.mkdirsSync,$zi=Ozi(),gBd=$zi.symlinkPaths,_Bd=$zi.symlinkPathsSync,qzi=Nzi(),yBd=qzi.symlinkType,TBd=qzi.symlinkTypeSync,SBd=xxe().pathExists,{areIdentical:jzi}=R$e();function bBd(e,t,n,r){r=typeof n==="function"?n:r,n=typeof n==="function"?!1:n,bee.lstat(t,(o,s)=>{if(!o&&s.isSymbolicLink())Promise.all([bee.stat(e),bee.stat(t)]).then(([i,a])=>{if(jzi(i,a))return r(null);Bzi(e,t,n,r)});else Bzi(e,t,n,r)})}function Bzi(e,t,n,r){gBd(e,t,(o,s)=>{if(o)return r(o);e=s.toDst,yBd(s.toCwd,n,(i,a)=>{if(i)return r(i);let l=Fzi.dirname(t);SBd(l,(c,u)=>{if(c)return r(c);if(u)return bee.symlink(e,t,a,r);ABd(l,(d)=>{if(d)return r(d);bee.symlink(e,t,a,r)})})})})}function EBd(e,t,n){let r;try{r=bee.lstatSync(t)}catch{}if(r&&r.isSymbolicLink()){let a=bee.statSync(e),l=bee.statSync(t);if(jzi(a,l))return}let o=_Bd(e,t);e=o.toDst,n=TBd(o.toCwd,n);let s=Fzi.dirname(t);if(bee.existsSync(s))return bee.symlinkSync(e,t,n);return hBd(s),bee.symlinkSync(e,t,n)}Wzi.exports={createSymlink:fBd(bBd),createSymlinkSync:EBd}});
export {Gzi};
