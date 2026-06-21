// @ts-nocheck
import {b} from "../runtime.ts";
function FIi(e){if(e.startsWith("command:"))return{description:e.slice(8)};return SAd[e]}
var SAd;
var UIi=b(()=>{SAd={"confirm:yes":{description:"confirm"},"confirm:no":{description:"cancel"},"confirm:previous":{description:"navigate"},"confirm:next":{description:"navigate"},"confirm:nextField":{description:"next field"},"confirm:previousField":{description:"previous field"},"confirm:toggle":{description:"toggle"},"confirm:cycleMode":{description:"cycle mode"},"confirm:toggleExplanation":{description:"explanation"},"select:next":{description:"navigate"},"select:previous":{description:"navigate"},"select:pageUp":{description:"page up"},"select:pageDown":{description:"page down"},"select:first":{description:"first"},"select:last":{description:"last"},"select:accept":{description:"select"},"select:cancel":{description:"cancel"},"tabs:next":{description:"switch tab"},"tabs:previous":{description:"switch tab"},"app:toggleReplTab":{description:"switch tab"}}});
export {FIi,SAd,UIi};
