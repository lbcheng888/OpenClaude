// @ts-nocheck
import {Q} from "../runtime.ts";
import {AC} from "./m3074.ts";
import {oT} from "./m1469.ts";
import {Tee} from "./m3108.ts";
var gra=Q((HZg,hra)=>{var MWd=AC().fromCallback,mra=require("path"),EHe=oT(),fra=Tee();function NWd(e,t){function n(){EHe.writeFile(e,"",(r)=>{if(r)return t(r);t()})}EHe.stat(e,(r,o)=>{if(!r&&o.isFile())return t();let s=mra.dirname(e);EHe.stat(s,(i,a)=>{if(i){if(i.code==="ENOENT")return fra.mkdirs(s,(l)=>{if(l)return t(l);n()});return t(i)}if(a.isDirectory())n();else EHe.readdir(s,(l)=>{if(l)return t(l)})})})}function FWd(e){let t;try{t=EHe.statSync(e)}catch{}if(t&&t.isFile())return;let n=mra.dirname(e);try{if(!EHe.statSync(n).isDirectory())EHe.readdirSync(n)}catch(r){if(r&&r.code==="ENOENT")fra.mkdirsSync(n);else throw r}EHe.writeFileSync(e,"")}hra.exports={createFile:MWd(NWd),createFileSync:FWd}});
export {gra};
