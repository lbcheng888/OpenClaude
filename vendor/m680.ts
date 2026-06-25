// @ts-nocheck
import {lRt,cRt} from "./m676.ts";
import {b} from "../runtime.ts";
import {iTr,oon,son,lTr} from "./m677.ts";
async function dTr(e,t){return lRt(e,yiu,t)}
var fiu=()=>({contents:"",textDecoder:new TextDecoder}),aon=(e,{textDecoder:t})=>t.decode(e,{stream:!0}),hiu=(e,{contents:t})=>t+e,giu=(e,t)=>e.slice(0,t),_iu=({textDecoder:e})=>{let t=e.decode();return t===""?void 0:t},yiu;
var Oss=b(()=>{cRt();yiu={init:fiu,convertChunk:{string:iTr,buffer:aon,arrayBuffer:aon,dataView:aon,typedArray:aon,others:oon},getSize:son,truncateChunk:giu,addChunk:hiu,getFinalChunk:_iu,finalize:lTr}});
export {dTr,fiu,aon,hiu,giu,_iu,yiu,Oss};
