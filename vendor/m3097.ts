// @ts-nocheck
import {Q} from "../runtime.ts";
import {AC} from "./m3074.ts";
import {oT} from "./m1469.ts";
import {_ee} from "./m3078.ts";
import {gHe} from "./m3079.ts";
var Q0n=Q((aZg,tna)=>{var f8d=AC().fromCallback,SNt=oT(),Zta=require("path"),ena=_ee(),h8d=gHe().pathExists;function g8d(e,t,n,r){if(typeof n==="function")r=n,n="utf8";let o=Zta.dirname(e);h8d(o,(s,i)=>{if(s)return r(s);if(i)return SNt.writeFile(e,t,n,r);ena.mkdirs(o,(a)=>{if(a)return r(a);SNt.writeFile(e,t,n,r)})})}function _8d(e,...t){let n=Zta.dirname(e);if(SNt.existsSync(n))return SNt.writeFileSync(e,...t);ena.mkdirsSync(n),SNt.writeFileSync(e,...t)}tna.exports={outputFile:f8d(g8d),outputFileSync:_8d}});
export {Q0n};
