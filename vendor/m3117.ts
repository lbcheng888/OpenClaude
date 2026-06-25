// @ts-nocheck
import {Q} from "../runtime.ts";
import {AC} from "./m3074.ts";
import {x9e} from "./m3105.ts";
import {Tee} from "./m3108.ts";
import {vNt} from "./m3116.ts";
var pra=Q((kZg,dra)=>{var LWd=AC().fromPromise,ara=x9e(),lra=require("path"),cra=Tee(),ura=vNt(),sra=LWd(async function(t){let n;try{n=await ara.readdir(t)}catch{return cra.mkdirs(t)}return Promise.all(n.map((r)=>ura.remove(lra.join(t,r))))});function ira(e){let t;try{t=ara.readdirSync(e)}catch{return cra.mkdirsSync(e)}t.forEach((n)=>{n=lra.join(e,n),ura.removeSync(n)})}dra.exports={emptyDirSync:ira,emptydirSync:ira,emptyDir:sra,emptydir:sra}});
export {pra};
