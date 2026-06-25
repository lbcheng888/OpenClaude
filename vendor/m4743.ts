// @ts-nocheck
import {Q} from "../runtime.ts";
import {IPe} from "./m4729.ts";
import {Vwo} from "./m4736.ts";
import {azn} from "./m4730.ts";
import {DPe} from "./m4742.ts";
import {jwo} from "./m4740.ts";
var mCl=Q((TWe)=>{var mzn=IPe(),Cim=Vwo(),uCl=azn(),PPe=DPe(),Xwo=jwo(),dCl=mzn.getBCHDigit(7973);function Aim(e,t,n){for(let r=1;r<=40;r++)if(t<=TWe.getCapacity(r,n,e))return r;return}function pCl(e,t){return PPe.getCharCountIndicator(e,t)+4}function Rim(e,t){let n=0;return e.forEach(function(r){let o=pCl(r.mode,t);n+=o+r.getBitsLength()}),n}function vim(e,t){for(let n=1;n<=40;n++)if(Rim(e,n)<=TWe.getCapacity(n,t,PPe.MIXED))return n;return}TWe.from=function(t,n){if(Xwo.isValid(t))return parseInt(t,10);return n};TWe.getCapacity=function(t,n,r){if(!Xwo.isValid(t))throw Error("Invalid QR Code version");if(typeof r>"u")r=PPe.BYTE;let o=mzn.getSymbolTotalCodewords(t),s=Cim.getTotalCodewordsCount(t,n),i=(o-s)*8;if(r===PPe.MIXED)return i;let a=i-pCl(r,t);switch(r){case PPe.NUMERIC:return Math.floor(a/10*3);case PPe.ALPHANUMERIC:return Math.floor(a/11*2);case PPe.KANJI:return Math.floor(a/13);case PPe.BYTE:default:return Math.floor(a/8)}};TWe.getBestVersionForData=function(t,n){let r,o=uCl.from(n,uCl.M);if(Array.isArray(t)){if(t.length>1)return vim(t,o);if(t.length===0)return 1;r=t[0]}else r=t;return Aim(r.mode,r.getLength(),o)};TWe.getEncodedBits=function(t){if(!Xwo.isValid(t)||t<7)throw Error("Invalid QR Code version");let n=t<<12;while(mzn.getBCHDigit(n)-dCl>=0)n^=7973<<mzn.getBCHDigit(n)-dCl;return t<<12|n}});
export {mCl};
