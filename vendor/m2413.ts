// @ts-nocheck
import {Zyn,hZ} from "./m2267.ts";
import {Jfe,lie,T5,zO} from "./m2268.ts";
import {HIt,qTn,$Tn,N1,BK} from "./m2339.ts";
import {oUe,XS} from "../src/config/2341_XS.ts";
import {rTn,supportsTabStatus,Sk,oTn,lg} from "./m2269.ts";
import {qp,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function PSn(){try{if(MZ.writeSync(1,Zyn),MZ.writeSync(1,Jfe),MZ.writeSync(1,lie),MZ.writeSync(1,HIt),MZ.writeSync(1,qTn),MZ.writeSync(1,$Tn),MZ.writeSync(1,N1),MZ.writeSync(1,"\x1B7"+T5+"\x1B8"),oUe())MZ.writeSync(1,rTn);if(supportsTabStatus())MZ.writeSync(1,Sk(oTn))}catch(e){if(qp(e))logForDebugging(`restoreTerminalModes writeSync failed: ${e}`,{level:"error"});else throw e}}
var MZ;
var g$r=b(()=>{qe();bt();XS();hZ();zO();BK();lg();MZ=require("fs")});
export {PSn,MZ,g$r};
