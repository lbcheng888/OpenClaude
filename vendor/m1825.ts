// @ts-nocheck
import {X} from "../runtime.ts";
import {_Be} from "./m1821.ts";
var gzs=X((RNA,hzs)=>{var Azs=_Be(),N2u=(e,t)=>{let n=Azs(e,null,!0),r=Azs(t,null,!0),o=n.compare(r);if(o===0)return null;let s=o>0,i=s?n:r,a=s?r:n,l=!!i.prerelease.length;if(!!a.prerelease.length&&!l){if(!a.patch&&!a.minor)return"major";if(a.compareMain(i)===0){if(a.minor&&!a.patch)return"minor";return"patch"}}let u=l?"pre":"";if(n.major!==r.major)return u+"major";if(n.minor!==r.minor)return u+"minor";if(n.patch!==r.patch)return u+"patch";return"prerelease"};hzs.exports=N2u});
export {gzs};
