// @ts-nocheck
import {Q} from "../runtime.ts";
import {fBe} from "./m1826.ts";
var pei=Q((Y8h,dei)=>{var uei=fBe(),nVu=(e,t)=>{let n=uei(e,null,!0),r=uei(t,null,!0),o=n.compare(r);if(o===0)return null;let s=o>0,i=s?n:r,a=s?r:n,l=!!i.prerelease.length;if(!!a.prerelease.length&&!l){if(!a.patch&&!a.minor)return"major";if(a.compareMain(i)===0){if(a.minor&&!a.patch)return"minor";return"patch"}}let u=l?"pre":"";if(n.major!==r.major)return u+"major";if(n.minor!==r.minor)return u+"minor";if(n.patch!==r.patch)return u+"patch";return"prerelease"};dei.exports=nVu});
export {pei};
