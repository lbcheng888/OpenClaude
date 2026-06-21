// @ts-nocheck
import {X} from "../runtime.ts";
var k8i=X((I9h,x8i)=>{function bPd(e){let t={begin:/[a-z][A-Za-z0-9_]*/,relevance:0},n={className:"symbol",variants:[{begin:/[A-Z][a-zA-Z0-9_]*/},{begin:/_[A-Za-z0-9_]*/}],relevance:0},r={begin:/\(/,end:/\)/,relevance:0},o={begin:/\[/,end:/\]/},s={className:"comment",begin:/%/,end:/$/,contains:[e.PHRASAL_WORDS_MODE]},i={className:"string",begin:/`/,end:/`/,contains:[e.BACKSLASH_ESCAPE]},a={className:"string",begin:/0'(\\'|.)/},l={className:"string",begin:/0'\\s/},u=[t,n,r,{begin:/:-/},o,s,e.C_BLOCK_COMMENT_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,i,a,l,e.C_NUMBER_MODE];return r.contains=u,o.contains=u,{name:"Prolog",contains:u.concat([{begin:/\.$/}])}}x8i.exports=bPd});
export {k8i};
