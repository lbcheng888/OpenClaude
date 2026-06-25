// @ts-nocheck
import {Q} from "../runtime.ts";
var IPe=Q((_We)=>{var Wwo,pim=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];_We.getSymbolSize=function(t){if(!t)throw Error('"version" cannot be null or undefined');if(t<1||t>40)throw Error('"version" should be in range from 1 to 40');return t*4+17};_We.getSymbolTotalCodewords=function(t){return pim[t]};_We.getBCHDigit=function(e){let t=0;while(e!==0)t++,e>>>=1;return t};_We.setToSJISFunction=function(t){if(typeof t!=="function")throw Error('"toSJISFunc" is not a valid function.');Wwo=t};_We.isKanjiModeEnabled=function(){return typeof Wwo<"u"};_We.toSJIS=function(t){return Wwo(t)}});
export {IPe};
