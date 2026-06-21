// @ts-nocheck
import {X} from "../runtime.ts";
var s4i=X((v2h,o4i)=>{function ZHd(e){let t={className:"literal",begin:/[+-]/,relevance:0};return{name:"Brainfuck",aliases:["bf"],contains:[e.COMMENT(`[^\\[\\]\\.,\\+\\-<> \r
]`,`[\\[\\]\\.,\\+\\-<> \r
]`,{returnEnd:!0,relevance:0}),{className:"title",begin:"[\\[\\]]",relevance:0},{className:"string",begin:"[\\.,]",relevance:0},{begin:/(?:\+\+|--)/,contains:[t]},t]}}o4i.exports=ZHd});
export {s4i};
