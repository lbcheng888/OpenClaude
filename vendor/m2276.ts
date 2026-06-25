// @ts-nocheck
import {setTerminalFocusForState,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
function X9r(e){J9r=e?"focused":"blurred",setTerminalFocusForState(e);for(let t of Y9r)t();if(!e){for(let t of mAi)t();mAi.clear()}}
function Wet(){return J9r!=="blurred"}
function iz(){return J9r}
function WUe(e){return Y9r.add(e),()=>{Y9r.delete(e)}}
var J9r="unknown",mAi,Y9r;
var GUe=b(()=>{lt();mAi=new Set,Y9r=new Set});
export {X9r,Wet,iz,WUe,J9r,mAi,Y9r,GUe};
