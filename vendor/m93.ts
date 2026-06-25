// @ts-nocheck
import {fre,FTt} from "./m48.ts";
import {CKe,$Yt} from "./m92.ts";
import {b} from "../runtime.ts";
function XAc(e,t,n,r){var o=n.length,s=o,i=!r;if(e==null)return!s;e=Object(e);while(o--){var a=n[o];if(i&&a[2]?a[1]!==e[a[0]]:!(a[0]in e))return!1}while(++o<s){a=n[o];var l=a[0],c=e[l],u=a[1];if(i&&a[2]){if(c===void 0&&!(l in e))return!1}else{var d=new fre;if(r)var p=r(c,u,l,e,t,d);if(!(p===void 0?CKe(u,c,YAc|JAc,r,d):p))return!1}}return!0}
var YAc=1,JAc=2,oqo;
var sqo=b(()=>{FTt();$Yt();oqo=XAc});
export {XAc,YAc,JAc,oqo,sqo};
