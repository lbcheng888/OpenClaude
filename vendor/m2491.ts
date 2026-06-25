// @ts-nocheck
import {Q} from "../runtime.ts";
import {ent} from "./m2489.ts";
import {rPi} from "./m2490.ts";
import {XPt} from "./m2486.ts";
var sPi=Q((qRg,oPi)=>{var bSd=ent(),ESd=rPi(),{safeRe:pRn,t:mRn}=XPt(),CSd=(e,t)=>{if(e instanceof bSd)return e;if(typeof e==="number")e=String(e);if(typeof e!=="string")return null;t=t||{};let n=null;if(!t.rtl)n=e.match(t.includePrerelease?pRn[mRn.COERCEFULL]:pRn[mRn.COERCE]);else{let l=t.includePrerelease?pRn[mRn.COERCERTLFULL]:pRn[mRn.COERCERTL],c;while((c=l.exec(e))&&(!n||n.index+n[0].length!==e.length)){if(!n||c.index+c[0].length!==n.index+n[0].length)n=c;l.lastIndex=c.index+c[1].length+c[2].length}l.lastIndex=-1}if(n===null)return null;let r=n[2],o=n[3]||"0",s=n[4]||"0",i=t.includePrerelease&&n[5]?`-${n[5]}`:"",a=t.includePrerelease&&n[6]?`+${n[6]}`:"";return ESd(`${r}.${o}.${s}${i}${a}`,t)};oPi.exports=CSd});
export {sPi};
