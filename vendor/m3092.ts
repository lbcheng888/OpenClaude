// @ts-nocheck
import {X} from "../runtime.ts";
import {mT} from "./m1464.ts";
import {skn} from "./m3074.ts";
import {WLt} from "./m3076.ts";
import {See} from "./m3068.ts";
import {R$e} from "./m3071.ts";
var CYi=X((Ejh,EYi)=>{var SYi=mT(),MVr=require("path"),XBd=skn().copySync,bYi=WLt().removeSync,QBd=See().mkdirpSync,TYi=R$e();function ZBd(e,t,n){n=n||{};let r=n.overwrite||n.clobber||!1,{srcStat:o,isChangingCase:s=!1}=TYi.checkPathsSync(e,t,"move",n);if(TYi.checkParentPathsSync(e,o,t,"move"),!eFd(t))QBd(MVr.dirname(t));return tFd(e,t,r,s)}function eFd(e){let t=MVr.dirname(e);return MVr.parse(t).root===t}function tFd(e,t,n,r){if(r)return LVr(e,t,n);if(n)return bYi(t),LVr(e,t,n);if(SYi.existsSync(t))throw Error("dest already exists.");return LVr(e,t,n)}function LVr(e,t,n){try{SYi.renameSync(e,t)}catch(r){if(r.code!=="EXDEV")throw r;return nFd(e,t,n)}}function nFd(e,t,n){return XBd(e,t,{overwrite:n,errorOnExist:!0}),bYi(e)}EYi.exports=ZBd});
export {CYi};
