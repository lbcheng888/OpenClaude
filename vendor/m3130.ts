// @ts-nocheck
import {Q} from "../runtime.ts";
import {oT} from "./m1469.ts";
import {nxn} from "./m3114.ts";
import {vNt} from "./m3116.ts";
import {Tee} from "./m3108.ts";
import {D9e} from "./m3111.ts";
var coa=Q(($Zg,loa)=>{var ioa=oT(),IJr=require("path"),EGd=nxn().copySync,aoa=vNt().removeSync,CGd=Tee().mkdirpSync,soa=D9e();function AGd(e,t,n){n=n||{};let r=n.overwrite||n.clobber||!1,{srcStat:o,isChangingCase:s=!1}=soa.checkPathsSync(e,t,"move",n);if(soa.checkParentPathsSync(e,o,t,"move"),!RGd(t))CGd(IJr.dirname(t));return vGd(e,t,r,s)}function RGd(e){let t=IJr.dirname(e);return IJr.parse(t).root===t}function vGd(e,t,n,r){if(r)return HJr(e,t,n);if(n)return aoa(t),HJr(e,t,n);if(ioa.existsSync(t))throw Error("dest already exists.");return HJr(e,t,n)}function HJr(e,t,n){try{ioa.renameSync(e,t)}catch(r){if(r.code!=="EXDEV")throw r;return wGd(e,t,n)}}function wGd(e,t,n){return EGd(e,t,{overwrite:n,errorOnExist:!0}),aoa(e)}loa.exports=AGd});
export {coa};
