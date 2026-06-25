// @ts-nocheck
import {Q} from "../runtime.ts";
import {t2e} from "./m2309.ts";
var Hvi=Q((Dfg,kvi)=>{var wvi=t2e(),Fpd=(e,t)=>{let n=wvi(e,null,!0),r=wvi(t,null,!0),o=n.compare(r);if(o===0)return null;let s=o>0,i=s?n:r,a=s?r:n,l=!!i.prerelease.length;if(!!a.prerelease.length&&!l){if(!a.patch&&!a.minor)return"major";if(a.compareMain(i)===0){if(a.minor&&!a.patch)return"minor";return"patch"}}let u=l?"pre":"";if(n.major!==r.major)return u+"major";if(n.minor!==r.minor)return u+"minor";if(n.patch!==r.patch)return u+"patch";return"prerelease"};kvi.exports=Fpd});
export {Hvi};
