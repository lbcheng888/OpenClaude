// @ts-nocheck
import {Q} from "../runtime.ts";
import {AC} from "./m3074.ts";
import {oT} from "./m1469.ts";
import {_ee} from "./m3078.ts";
var Sta=Q((QQg,Tta)=>{var N5d=AC().fromCallback,_ta=require("path"),_He=oT(),yta=_ee();function F5d(e,t){function n(){_He.writeFile(e,"",(r)=>{if(r)return t(r);t()})}_He.stat(e,(r,o)=>{if(!r&&o.isFile())return t();let s=_ta.dirname(e);_He.stat(s,(i,a)=>{if(i){if(i.code==="ENOENT")return yta.mkdirs(s,(l)=>{if(l)return t(l);n()});return t(i)}if(a.isDirectory())n();else _He.readdir(s,(l)=>{if(l)return t(l)})})})}function B5d(e){let t;try{t=_He.statSync(e)}catch{}if(t&&t.isFile())return;let n=_ta.dirname(e);try{if(!_He.statSync(n).isDirectory())_He.readdirSync(n)}catch(r){if(r&&r.code==="ENOENT")yta.mkdirsSync(n);else throw r}_He.writeFileSync(e,"")}Tta.exports={createFile:N5d(F5d),createFileSync:B5d}});
export {Sta};
