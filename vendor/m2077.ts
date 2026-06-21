// @ts-nocheck
import {X} from "../runtime.ts";
var Eri=X((BXe)=>{Object.defineProperty(BXe,"__esModule",{value:!0});BXe.validateValue=BXe.validateKey=void 0;var t1r="[_0-9a-z-*/]",C7u=`[a-z]${t1r}{0,255}`,v7u=`[a-z0-9]${t1r}{0,240}@[a-z]${t1r}{0,13}`,w7u=new RegExp(`^(?:${C7u}|${v7u})$`),R7u=/^[ -~]{0,255}[!-~]$/,x7u=/,|=/;function k7u(e){return w7u.test(e)}BXe.validateKey=k7u;function H7u(e){return R7u.test(e)&&!x7u.test(e)}BXe.validateValue=H7u});
export {Eri};
