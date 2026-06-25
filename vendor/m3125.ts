// @ts-nocheck
import {Q} from "../runtime.ts";
import {AC} from "./m3074.ts";
import {oT} from "./m1469.ts";
import {Tee} from "./m3108.ts";
import {bHe} from "./m3109.ts";
var sxn=Q((MZg,zra)=>{var oGd=AC().fromCallback,kNt=oT(),Vra=require("path"),Kra=Tee(),sGd=bHe().pathExists;function iGd(e,t,n,r){if(typeof n==="function")r=n,n="utf8";let o=Vra.dirname(e);sGd(o,(s,i)=>{if(s)return r(s);if(i)return kNt.writeFile(e,t,n,r);Kra.mkdirs(o,(a)=>{if(a)return r(a);kNt.writeFile(e,t,n,r)})})}function aGd(e,...t){let n=Vra.dirname(e);if(kNt.existsSync(n))return kNt.writeFileSync(e,...t);Kra.mkdirsSync(n),kNt.writeFileSync(e,...t)}zra.exports={outputFile:oGd(iGd),outputFileSync:aGd}});
export {sxn};
