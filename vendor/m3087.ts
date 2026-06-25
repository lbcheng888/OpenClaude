// @ts-nocheck
import {Q} from "../runtime.ts";
import {AC} from "./m3074.ts";
import {H9e} from "./m3075.ts";
import {_ee} from "./m3078.ts";
import {yNt} from "./m3086.ts";
var gta=Q((XQg,hta)=>{var M5d=AC().fromPromise,dta=H9e(),pta=require("path"),mta=_ee(),fta=yNt(),cta=M5d(async function(t){let n;try{n=await dta.readdir(t)}catch{return mta.mkdirs(t)}return Promise.all(n.map((r)=>fta.remove(pta.join(t,r))))});function uta(e){let t;try{t=dta.readdirSync(e)}catch{return mta.mkdirsSync(e)}t.forEach((n)=>{n=pta.join(e,n),fta.removeSync(n)})}hta.exports={emptyDirSync:uta,emptydirSync:uta,emptyDir:cta,emptydir:cta}});
export {gta};
