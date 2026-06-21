// @ts-nocheck
import {X} from "../runtime.ts";
import {EC} from "./m3064.ts";
import {w$e} from "./m3065.ts";
import {See} from "./m3068.ts";
import {WLt} from "./m3076.ts";
var Ezi=X((ljh,bzi)=>{var tBd=EC().fromPromise,_zi=w$e(),yzi=require("path"),Tzi=See(),Szi=WLt(),hzi=tBd(async function(t){let n;try{n=await _zi.readdir(t)}catch{return Tzi.mkdirs(t)}return Promise.all(n.map((r)=>Szi.remove(yzi.join(t,r))))});function gzi(e){let t;try{t=_zi.readdirSync(e)}catch{return Tzi.mkdirsSync(e)}t.forEach((n)=>{n=yzi.join(e,n),Szi.removeSync(n)})}bzi.exports={emptyDirSync:gzi,emptydirSync:gzi,emptyDir:hzi,emptydir:hzi}});
export {Ezi};
