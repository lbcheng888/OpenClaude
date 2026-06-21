// @ts-nocheck
import {X} from "../runtime.ts";
var O6i=X((N$h,P6i)=>{function cDd(e){let t={literal:"true false null"},n=[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],r=[e.QUOTE_STRING_MODE,e.C_NUMBER_MODE],o={end:",",endsWithParent:!0,excludeEnd:!0,contains:r,keywords:t},s={begin:/\{/,end:/\}/,contains:[{className:"attr",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE],illegal:"\\n"},e.inherit(o,{begin:/:/})].concat(n),illegal:"\\S"},i={begin:"\\[",end:"\\]",contains:[e.inherit(o)],illegal:"\\S"};return r.push(s,i),n.forEach(function(a){r.push(a)}),{name:"JSON",contains:r,keywords:t,illegal:"\\S"}}P6i.exports=cDd});
export {O6i};
