// @ts-nocheck
import {X} from "../runtime.ts";
import {EC} from "./m3064.ts";
import {mT} from "./m1464.ts";
import {See} from "./m3068.ts";
var Rzi=X((cjh,wzi)=>{var nBd=EC().fromCallback,Czi=require("path"),kxe=mT(),vzi=See();function rBd(e,t){function n(){kxe.writeFile(e,"",(r)=>{if(r)return t(r);t()})}kxe.stat(e,(r,o)=>{if(!r&&o.isFile())return t();let s=Czi.dirname(e);kxe.stat(s,(i,a)=>{if(i){if(i.code==="ENOENT")return vzi.mkdirs(s,(l)=>{if(l)return t(l);n()});return t(i)}if(a.isDirectory())n();else kxe.readdir(s,(l)=>{if(l)return t(l)})})})}function oBd(e){let t;try{t=kxe.statSync(e)}catch{}if(t&&t.isFile())return;let n=Czi.dirname(e);try{if(!kxe.statSync(n).isDirectory())kxe.readdirSync(n)}catch(r){if(r&&r.code==="ENOENT")vzi.mkdirsSync(n);else throw r}kxe.writeFileSync(e,"")}wzi.exports={createFile:nBd(rBd),createFileSync:oBd}});
export {Rzi};
