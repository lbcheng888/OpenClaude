// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {_coercedString,_coercedNumber,_coercedBoolean,_coercedBigint,_coercedDate} from "./m302.ts";
import {UTt,$Tt,qTt,jTt,UXt,OXt} from "./m316.ts";
import {isLocalAgentTask} from "./m305.ts";
var GTt={};
isFullscreenWithTTY(GTt,{string:()=>pEc,number:()=>mEc,date:()=>hEc,boolean:()=>fEc,bigint:()=>AEc});
function pEc(e){return _coercedString(UTt,e)}
function mEc(e){return _coercedNumber($Tt,e)}
function fEc(e){return _coercedBoolean(qTt,e)}
function AEc(e){return _coercedBigint(jTt,e)}
function hEc(e){return _coercedDate(UXt,e)}
var p6o=b(()=>{isLocalAgentTask();OXt()});
export {GTt,pEc,mEc,fEc,AEc,hEc,p6o};
