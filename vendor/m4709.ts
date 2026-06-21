// @ts-nocheck
import {X} from "../runtime.ts";
var Hbo=X((cye)=>{var bjt="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";bjt=bjt.replace(/u/g,"\\u");var oXp="(?:(?![A-Z0-9 $%*+\\-./:]|"+bjt+`)(?:.|[\r
]))+`;cye.KANJI=new RegExp(bjt,"g");cye.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");cye.BYTE=new RegExp(oXp,"g");cye.NUMERIC=new RegExp("[0-9]+","g");cye.ALPHANUMERIC=new RegExp("[A-Z $%*+\\-./:]+","g");var sXp=new RegExp("^"+bjt+"$"),iXp=new RegExp("^[0-9]+$"),aXp=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");cye.testKanji=function(t){return sXp.test(t)};cye.testNumeric=function(t){return iXp.test(t)};cye.testAlphanumeric=function(t){return aXp.test(t)}});
export {Hbo};
