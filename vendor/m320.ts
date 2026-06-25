// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {_coercedString,_coercedNumber,_coercedBoolean,_coercedBigint,_coercedDate} from "./m304.ts";
import {pCt,mCt,fCt,hCt,Ten,men} from "./m318.ts";
import {NP} from "./m307.ts";
var _Ct={};
ft(_Ct,{string:()=>gDc,number:()=>_Dc,date:()=>SDc,boolean:()=>yDc,bigint:()=>TDc});
function gDc(e){return _coercedString(pCt,e)}
function _Dc(e){return _coercedNumber(mCt,e)}
function yDc(e){return _coercedBoolean(fCt,e)}
function TDc(e){return _coercedBigint(hCt,e)}
function SDc(e){return _coercedDate(Ten,e)}
var aKo=b(()=>{NP();men()});
export {_Ct,gDc,_Dc,yDc,TDc,SDc,aKo};
