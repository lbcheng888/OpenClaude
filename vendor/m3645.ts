// @ts-nocheck
import {X} from "../runtime.ts";
var Tba=X((Wit)=>{Object.defineProperty(Wit,"__esModule",{value:!0});Wit.validateValue=Wit.validateKey=void 0;var nno="[_0-9a-z-*/]",xip=`[a-z]${nno}{0,255}`,kip=`[a-z0-9]${nno}{0,240}@[a-z]${nno}{0,13}`,Hip=new RegExp(`^(?:${xip}|${kip})$`),Iip=/^[ -~]{0,255}[!-~]$/,Dip=/,|=/;function Pip(e){return Hip.test(e)}Wit.validateKey=Pip;function Oip(e){return Iip.test(e)&&!Dip.test(e)}Wit.validateValue=Oip});
export {Tba};
