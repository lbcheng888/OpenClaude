// @ts-nocheck
import {Q} from "../runtime.ts";
var ZGi=Q((b7g,QGi)=>{function BBd(e){let t={className:"literal",begin:/[+-]/,relevance:0};return{name:"Brainfuck",aliases:["bf"],contains:[e.COMMENT(`[^\\[\\]\\.,\\+\\-<> \r
]`,`[\\[\\]\\.,\\+\\-<> \r
]`,{returnEnd:!0,relevance:0}),{className:"title",begin:"[\\[\\]]",relevance:0},{className:"string",begin:"[\\.,]",relevance:0},{begin:/(?:\+\+|--)/,contains:[t]},t]}}QGi.exports=BBd});
export {ZGi};
