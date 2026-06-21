// @ts-nocheck
import {X} from "../runtime.ts";
var Gji=X((m9h,Wji)=>{function oPd(e){let t={keyword:"rec with let in inherit assert if else then",literal:"true false or and null",built_in:"import abort baseNameOf dirOf isNull builtins map removeAttrs throw toString derivation"},n={className:"subst",begin:/\$\{/,end:/\}/,keywords:t},r={begin:/[a-zA-Z0-9-_]+(\s*=)/,returnBegin:!0,relevance:0,contains:[{className:"attr",begin:/\S+/}]},o={className:"string",contains:[n],variants:[{begin:"''",end:"''"},{begin:'"',end:'"'}]},s=[e.NUMBER_MODE,e.HASH_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,o,r];return n.contains=s,{name:"Nix",aliases:["nixos"],keywords:t,contains:s}}Wji.exports=oPd});
export {Gji};
