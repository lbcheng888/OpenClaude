// @ts-nocheck
import {X} from "../runtime.ts";
import {EC} from "./m3064.ts";
import {mT} from "./m1464.ts";
import {See} from "./m3068.ts";
import {xxe} from "./m3069.ts";
var ckn=X((_jh,lYi)=>{var PBd=EC().fromCallback,VLt=mT(),iYi=require("path"),aYi=See(),OBd=xxe().pathExists;function LBd(e,t,n,r){if(typeof n==="function")r=n,n="utf8";let o=iYi.dirname(e);OBd(o,(s,i)=>{if(s)return r(s);if(i)return VLt.writeFile(e,t,n,r);aYi.mkdirs(o,(a)=>{if(a)return r(a);VLt.writeFile(e,t,n,r)})})}function MBd(e,...t){let n=iYi.dirname(e);if(VLt.existsSync(n))return VLt.writeFileSync(e,...t);aYi.mkdirsSync(n),VLt.writeFileSync(e,...t)}lYi.exports={outputFile:PBd(LBd),outputFileSync:MBd}});
export {ckn};
