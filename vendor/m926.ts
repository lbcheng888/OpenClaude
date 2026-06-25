// @ts-nocheck
import {b,x} from "../runtime.ts";
import {ZU} from "./m606.ts";
var mbs,fbs,kEu,hbs=(e,t)=>{let n=mbs.getSSOTokenFilepath(e),r=JSON.stringify(t,null,2);return kEu(n,r)};
var gbs=b(()=>{mbs=x(ZU(),1),fbs=require("fs"),{writeFile:kEu}=fbs.promises});
export {mbs,fbs,kEu,hbs,gbs};
