// @ts-nocheck
import {Q} from "../runtime.ts";
import {xos} from "./m659.ts";
var Pos=Q((ixf,Dos)=>{var Gyr=require("fs"),hsu=xos();function gsu(e){let n=Buffer.alloc(150),r;try{r=Gyr.openSync(e,"r"),Gyr.readSync(r,n,0,150,0),Gyr.closeSync(r)}catch(o){}return hsu(n.toString())}Dos.exports=gsu});
export {Pos};
