// @ts-nocheck
import {Q} from "../runtime.ts";
var j_i=Q(($Ze)=>{Object.defineProperty($Ze,"__esModule",{value:!0});$Ze.validateValue=$Ze.validateKey=void 0;var e2r="[_0-9a-z-*/]",Tod=`[a-z]${e2r}{0,255}`,Sod=`[a-z0-9]${e2r}{0,240}@[a-z]${e2r}{0,13}`,bod=new RegExp(`^(?:${Tod}|${Sod})$`),Eod=/^[ -~]{0,255}[!-~]$/,Cod=/,|=/;function Aod(e){return bod.test(e)}$Ze.validateKey=Aod;function Rod(e){return Eod.test(e)&&!Cod.test(e)}$Ze.validateValue=Rod});
export {j_i};
