// @ts-nocheck
import {X} from "../runtime.ts";
import {rUe} from "./m2299.ts";
var STi=X((Qth,TTi)=>{var yTi=rUe(),dnd=(e,t)=>{let n=yTi(e,null,!0),r=yTi(t,null,!0),o=n.compare(r);if(o===0)return null;let s=o>0,i=s?n:r,a=s?r:n,l=!!i.prerelease.length;if(!!a.prerelease.length&&!l){if(!a.patch&&!a.minor)return"major";if(a.compareMain(i)===0){if(a.minor&&!a.patch)return"minor";return"patch"}}let u=l?"pre":"";if(n.major!==r.major)return u+"major";if(n.minor!==r.minor)return u+"minor";if(n.patch!==r.patch)return u+"patch";return"prerelease"};TTi.exports=dnd});
export {STi};
