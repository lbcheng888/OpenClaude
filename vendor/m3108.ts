// @ts-nocheck
import {X} from "../runtime.ts";
import {EC} from "./m3064.ts";
import {mT} from "./m1464.ts";
import {Eee} from "./m3098.ts";
var EJi=X((Ujh,bJi)=>{var tUd=EC().fromCallback,TJi=require("path"),Oxe=mT(),SJi=Eee();function nUd(e,t){function n(){Oxe.writeFile(e,"",(r)=>{if(r)return t(r);t()})}Oxe.stat(e,(r,o)=>{if(!r&&o.isFile())return t();let s=TJi.dirname(e);Oxe.stat(s,(i,a)=>{if(i){if(i.code==="ENOENT")return SJi.mkdirs(s,(l)=>{if(l)return t(l);n()});return t(i)}if(a.isDirectory())n();else Oxe.readdir(s,(l)=>{if(l)return t(l)})})})}function rUd(e){let t;try{t=Oxe.statSync(e)}catch{}if(t&&t.isFile())return;let n=TJi.dirname(e);try{if(!Oxe.statSync(n).isDirectory())Oxe.readdirSync(n)}catch(r){if(r&&r.code==="ENOENT")SJi.mkdirsSync(n);else throw r}Oxe.writeFileSync(e,"")}bJi.exports={createFile:tUd(nUd),createFileSync:rUd}});
export {EJi};
