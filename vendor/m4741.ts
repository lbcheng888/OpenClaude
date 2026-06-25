// @ts-nocheck
import {Q} from "../runtime.ts";
var Ywo=Q((PTe)=>{var UWt="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";UWt=UWt.replace(/u/g,"\\u");var _im="(?:(?![A-Z0-9 $%*+\\-./:]|"+UWt+`)(?:.|[\r
]))+`;PTe.KANJI=new RegExp(UWt,"g");PTe.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");PTe.BYTE=new RegExp(_im,"g");PTe.NUMERIC=new RegExp("[0-9]+","g");PTe.ALPHANUMERIC=new RegExp("[A-Z $%*+\\-./:]+","g");var yim=new RegExp("^"+UWt+"$"),Tim=new RegExp("^[0-9]+$"),Sim=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");PTe.testKanji=function(t){return yim.test(t)};PTe.testNumeric=function(t){return Tim.test(t)};PTe.testAlphanumeric=function(t){return Sim.test(t)}});
export {Ywo};
