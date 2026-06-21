// @ts-nocheck
import {b,M} from "../runtime.ts";
import {I2} from "./m600.ts";
var yAs,TAs,ppu,SAs=(e,t)=>{let n=yAs.getSSOTokenFilepath(e),r=JSON.stringify(t,null,2);return ppu(n,r)};
var bAs=b(()=>{yAs=M(I2(),1),TAs=require("fs"),{writeFile:ppu}=TAs.promises});
export {yAs,TAs,ppu,SAs,bAs};
