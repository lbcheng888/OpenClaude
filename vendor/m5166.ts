// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {LPo,K$l} from "../src/tui/5166_spawnBackgroundFork.ts";
var z$l={};
ft(z$l,{default:()=>ZRm});
var QRm,ZRm;
var j$l=b(()=>{QRm={type:"local-jsx",name:"background",aliases:["bg"],description:"Send this session to the background and free the terminal",argumentHint:"[prompt]",immediate:(e)=>!e.trim(),isEnabled:()=>!0,load:()=>Promise.resolve().then(() => (LPo(),K$l))},ZRm=QRm});
export {z$l,QRm,ZRm,j$l};
