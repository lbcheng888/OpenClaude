// @ts-nocheck
import {X} from "../runtime.ts";
import {EC} from "./m3064.ts";
import {x$e} from "./m3095.ts";
import {Eee} from "./m3098.ts";
import {QLt} from "./m3106.ts";
var yJi=X((Fjh,_Ji)=>{var eUd=EC().fromPromise,fJi=x$e(),AJi=require("path"),hJi=Eee(),gJi=QLt(),pJi=eUd(async function(t){let n;try{n=await fJi.readdir(t)}catch{return hJi.mkdirs(t)}return Promise.all(n.map((r)=>gJi.remove(AJi.join(t,r))))});function mJi(e){let t;try{t=fJi.readdirSync(e)}catch{return hJi.mkdirsSync(e)}t.forEach((n)=>{n=AJi.join(e,n),gJi.removeSync(n)})}_Ji.exports={emptyDirSync:mJi,emptydirSync:mJi,emptyDir:pJi,emptydir:pJi}});
export {yJi};
