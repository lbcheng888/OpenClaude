// @ts-nocheck
import {X} from "../runtime.ts";
import {DDe} from "./m4697.ts";
import {wbo} from "./m4704.ts";
import {SWn} from "./m4698.ts";
import {ODe} from "./m4710.ts";
import {kbo} from "./m4708.ts";
var gAl=X((qje)=>{var RWn=DDe(),uXp=wbo(),fAl=SWn(),LDe=ODe(),Dbo=kbo(),AAl=RWn.getBCHDigit(7973);function dXp(e,t,n){for(let r=1;r<=40;r++)if(t<=qje.getCapacity(r,n,e))return r;return}function hAl(e,t){return LDe.getCharCountIndicator(e,t)+4}function pXp(e,t){let n=0;return e.forEach(function(r){let o=hAl(r.mode,t);n+=o+r.getBitsLength()}),n}function mXp(e,t){for(let n=1;n<=40;n++)if(pXp(e,n)<=qje.getCapacity(n,t,LDe.MIXED))return n;return}qje.from=function(t,n){if(Dbo.isValid(t))return parseInt(t,10);return n};qje.getCapacity=function(t,n,r){if(!Dbo.isValid(t))throw Error("Invalid QR Code version");if(typeof r>"u")r=LDe.BYTE;let o=RWn.getSymbolTotalCodewords(t),s=uXp.getTotalCodewordsCount(t,n),i=(o-s)*8;if(r===LDe.MIXED)return i;let a=i-hAl(r,t);switch(r){case LDe.NUMERIC:return Math.floor(a/10*3);case LDe.ALPHANUMERIC:return Math.floor(a/11*2);case LDe.KANJI:return Math.floor(a/13);case LDe.BYTE:default:return Math.floor(a/8)}};qje.getBestVersionForData=function(t,n){let r,o=fAl.from(n,fAl.M);if(Array.isArray(t)){if(t.length>1)return mXp(t,o);if(t.length===0)return 1;r=t[0]}else r=t;return dXp(r.mode,r.getLength(),o)};qje.getEncodedBits=function(t){if(!Dbo.isValid(t)||t<7)throw Error("Invalid QR Code version");let n=t<<12;while(RWn.getBCHDigit(n)-AAl>=0)n^=7973<<RWn.getBCHDigit(n)-AAl;return t<<12|n}});
export {gAl};
