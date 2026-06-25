// @ts-nocheck
import {Q} from "../runtime.ts";
var yci=Q((NZe)=>{Object.defineProperty(NZe,"__esModule",{value:!0});NZe.validateValue=NZe.validateKey=void 0;var kUr="[_0-9a-z-*/]",Wnd=`[a-z]${kUr}{0,255}`,Gnd=`[a-z0-9]${kUr}{0,240}@[a-z]${kUr}{0,13}`,Vnd=new RegExp(`^(?:${Wnd}|${Gnd})$`),Knd=/^[ -~]{0,255}[!-~]$/,znd=/,|=/;function jnd(e){return Vnd.test(e)}NZe.validateKey=jnd;function Ynd(e){return Knd.test(e)&&!znd.test(e)}NZe.validateValue=Ynd});
export {yci};
