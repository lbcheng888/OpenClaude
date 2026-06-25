// @ts-nocheck
import {FEn,fsModule} from "./m2277.ts";
import {ihe,aie,O8,dO} from "./m2278.ts";
import {oPt,kCn,wCn,JM,mz} from "./m2349.ts";
import {n2e,nS} from "../src/config/2351_nS.ts";
import {WEn,supportsTabStatus,Nk,GEn,hg} from "./m2280.ts";
import {sp,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function SAn(){try{if(DZ.writeSync(1,FEn),DZ.writeSync(1,ihe),DZ.writeSync(1,aie),DZ.writeSync(1,oPt),DZ.writeSync(1,kCn),DZ.writeSync(1,wCn),DZ.writeSync(1,JM),DZ.writeSync(1,"\x1B7"+O8+"\x1B8"),n2e())DZ.writeSync(1,WEn);if(supportsTabStatus())DZ.writeSync(1,Nk(GEn))}catch(e){if(sp(e))logForDebugging(`restoreTerminalModes writeSync failed: ${e}`,{level:"error"});else throw e}}
var DZ;
var jqr=b(()=>{qe();Ct();nS();fsModule();dO();mz();hg();DZ=require("fs")});
export {SAn,DZ,jqr};
