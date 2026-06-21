// @ts-nocheck
import {Tre,ugt} from "./m52.ts";
import {HWe,mKt} from "./m96.ts";
import {b} from "../runtime.ts";
function Yfc(e,t,n,r){var o=n.length,s=o,i=!r;if(e==null)return!s;e=Object(e);while(o--){var a=n[o];if(i&&a[2]?a[1]!==e[a[0]]:!(a[0]in e))return!1}while(++o<s){a=n[o];var l=a[0],c=e[l],u=a[1];if(i&&a[2]){if(c===void 0&&!(l in e))return!1}else{var d=new Tre;if(r)var p=r(c,u,l,e,t,d);if(!(p===void 0?HWe(u,c,Kfc|zfc,r,d):p))return!1}}return!0}
var Kfc=1,zfc=2,EUo;
var CUo=b(()=>{ugt();mKt();EUo=Yfc});
export {Yfc,Kfc,zfc,EUo,CUo};
