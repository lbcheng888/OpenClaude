// @ts-nocheck
import {Mbt,Nbt} from "./m670.ts";
import {b} from "../runtime.ts";
import {Ifr,Etn,Ctn,Pfr} from "./m671.ts";
async function Mfr(e,t){return Mbt(e,tJc,t)}
var XYc=()=>({contents:"",textDecoder:new TextDecoder}),wtn=(e,{textDecoder:t})=>t.decode(e,{stream:!0}),QYc=(e,{contents:t})=>t+e,ZYc=(e,t)=>e.slice(0,t),eJc=({textDecoder:e})=>{let t=e.decode();return t===""?void 0:t},tJc;
var NZo=b(()=>{Nbt();tJc={init:XYc,convertChunk:{string:Ifr,buffer:wtn,arrayBuffer:wtn,dataView:wtn,typedArray:wtn,others:Etn},getSize:Ctn,truncateChunk:ZYc,addChunk:QYc,getFinalChunk:eJc,finalize:Pfr}});
export {Mfr,XYc,wtn,QYc,ZYc,eJc,tJc,NZo};
