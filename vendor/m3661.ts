// @ts-nocheck
import {Q} from "../runtime.ts";
var LHa=Q(($lt)=>{Object.defineProperty($lt,"__esModule",{value:!0});$lt.validateValue=$lt.validateKey=void 0;var Fio="[_0-9a-z-*/]",g_p=`[a-z]${Fio}{0,255}`,__p=`[a-z0-9]${Fio}{0,240}@[a-z]${Fio}{0,13}`,y_p=new RegExp(`^(?:${g_p}|${__p})$`),T_p=/^[ -~]{0,255}[!-~]$/,S_p=/,|=/;function b_p(e){return y_p.test(e)}$lt.validateKey=b_p;function E_p(e){return T_p.test(e)&&!S_p.test(e)}$lt.validateValue=E_p});
export {LHa};
