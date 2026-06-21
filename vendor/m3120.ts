// @ts-nocheck
import {X} from "../runtime.ts";
import {mT} from "./m1464.ts";
import {mkn} from "./m3104.ts";
import {QLt} from "./m3106.ts";
import {Eee} from "./m3098.ts";
import {k$e} from "./m3101.ts";
var hXi=X((Qjh,AXi)=>{var mXi=mT(),YVr=require("path"),$Ud=mkn().copySync,fXi=QLt().removeSync,qUd=Eee().mkdirpSync,pXi=k$e();function jUd(e,t,n){n=n||{};let r=n.overwrite||n.clobber||!1,{srcStat:o,isChangingCase:s=!1}=pXi.checkPathsSync(e,t,"move",n);if(pXi.checkParentPathsSync(e,o,t,"move"),!WUd(t))qUd(YVr.dirname(t));return GUd(e,t,r,s)}function WUd(e){let t=YVr.dirname(e);return YVr.parse(t).root===t}function GUd(e,t,n,r){if(r)return zVr(e,t,n);if(n)return fXi(t),zVr(e,t,n);if(mXi.existsSync(t))throw Error("dest already exists.");return zVr(e,t,n)}function zVr(e,t,n){try{mXi.renameSync(e,t)}catch(r){if(r.code!=="EXDEV")throw r;return VUd(e,t,n)}}function VUd(e,t,n){return $Ud(e,t,{overwrite:n,errorOnExist:!0}),fXi(e)}AXi.exports=jUd});
export {hXi};
