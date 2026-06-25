// @ts-nocheck
import {Q} from "../runtime.ts";
var bji=Q((vjg,Sji)=>{function a9d(e){return{name:"Python profiler",contains:[e.C_NUMBER_MODE,{begin:"[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}",end:":",excludeEnd:!0},{begin:"(ncalls|tottime|cumtime)",end:"$",keywords:"ncalls tottime|10 cumtime|10 filename",relevance:10},{begin:"function calls",end:"$",contains:[e.C_NUMBER_MODE],relevance:10},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,{className:"string",begin:"\\(",end:"\\)$",excludeBegin:!0,excludeEnd:!0,relevance:0}]}}Sji.exports=a9d});
export {bji};
