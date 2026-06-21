// @ts-nocheck
import {X} from "../runtime.ts";
var Zdi=X((qXe)=>{Object.defineProperty(qXe,"__esModule",{value:!0});qXe.validateValue=qXe.validateKey=void 0;var R1r="[_0-9a-z-*/]",ZKu=`[a-z]${R1r}{0,255}`,ezu=`[a-z0-9]${R1r}{0,240}@[a-z]${R1r}{0,13}`,tzu=new RegExp(`^(?:${ZKu}|${ezu})$`),nzu=/^[ -~]{0,255}[!-~]$/,rzu=/,|=/;function ozu(e){return tzu.test(e)}qXe.validateKey=ozu;function szu(e){return nzu.test(e)&&!rzu.test(e)}qXe.validateValue=szu});
export {Zdi};
