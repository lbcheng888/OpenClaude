// @ts-nocheck
import {De,Rn} from "../src/session/0615_length.ts";
import {b} from "../runtime.ts";
function LMi(){return!1}
async function MMi(){if(!LMi())return;try{return OMi.openSync("/proc/self/exe","r")}catch(e){De(Error(`seccomp: failed to open /proc/self/exe: ${e}`));return}}
function NMi(){if(!LMi())return;return{applyPath:`/proc/self/fd/${Kqr}`,argv0:"apply-seccomp"}}
var OMi,Kqr=3;
var zqr=b(()=>{Rn();OMi=require("fs")});
export {LMi,MMi,NMi,OMi,Kqr,zqr};
