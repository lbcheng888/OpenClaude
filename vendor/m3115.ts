// @ts-nocheck
import {X} from "../runtime.ts";
import {EC} from "./m3064.ts";
import {mT} from "./m1464.ts";
import {Eee} from "./m3098.ts";
import {Pxe} from "./m3099.ts";
var hkn=X((Kjh,eXi)=>{var EUd=EC().fromCallback,eMt=mT(),QJi=require("path"),ZJi=Eee(),CUd=Pxe().pathExists;function vUd(e,t,n,r){if(typeof n==="function")r=n,n="utf8";let o=QJi.dirname(e);CUd(o,(s,i)=>{if(s)return r(s);if(i)return eMt.writeFile(e,t,n,r);ZJi.mkdirs(o,(a)=>{if(a)return r(a);eMt.writeFile(e,t,n,r)})})}function wUd(e,...t){let n=QJi.dirname(e);if(eMt.existsSync(n))return eMt.writeFileSync(e,...t);ZJi.mkdirsSync(n),eMt.writeFileSync(e,...t)}eXi.exports={outputFile:EUd(vUd),outputFileSync:wUd}});
export {hkn};
