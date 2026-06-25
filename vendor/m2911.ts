// @ts-nocheck
import {Q} from "../runtime.ts";
var k7i=Q((Pzg,w7i)=>{function Y2d(e){let t={literal:"true false null"},n=[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],r=[e.QUOTE_STRING_MODE,e.C_NUMBER_MODE],o={end:",",endsWithParent:!0,excludeEnd:!0,contains:r,keywords:t},s={begin:/\{/,end:/\}/,contains:[{className:"attr",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE],illegal:"\\n"},e.inherit(o,{begin:/:/})].concat(n),illegal:"\\S"},i={begin:"\\[",end:"\\]",contains:[e.inherit(o)],illegal:"\\S"};return r.push(s,i),n.forEach(function(a){r.push(a)}),{name:"JSON",contains:r,keywords:t,illegal:"\\S"}}w7i.exports=Y2d});
export {k7i};
