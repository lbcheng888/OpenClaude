// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Cko,aLl} from "../src/tui/5134_spawnBackgroundFork.ts";
var lLl={};
isFullscreenWithTTY(lLl,{default:()=>Phm});
var Dhm,Phm;
var cLl=b(()=>{Dhm={type:"local-jsx",name:"background",aliases:["bg"],description:"Send this session to the background and free the terminal",argumentHint:"[prompt]",immediate:(e)=>!e.trim(),isEnabled:()=>!0,load:()=>Promise.resolve().then(() => (Cko(),aLl))},Phm=Dhm});
export {lLl,Dhm,Phm,cLl};
