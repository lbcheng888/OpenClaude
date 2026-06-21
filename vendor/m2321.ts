// @ts-nocheck
import {X} from "../runtime.ts";
import {dF} from "./m2298.ts";
import {rUe} from "./m2299.ts";
import {oZe} from "./m2295.ts";
var JTi=X((hnh,YTi)=>{var Ynd=dF(),Jnd=rUe(),{safeRe:MTn,t:NTn}=oZe(),Xnd=(e,t)=>{if(e instanceof Ynd)return e;if(typeof e==="number")e=String(e);if(typeof e!=="string")return null;t=t||{};let n=null;if(!t.rtl)n=e.match(t.includePrerelease?MTn[NTn.COERCEFULL]:MTn[NTn.COERCE]);else{let l=t.includePrerelease?MTn[NTn.COERCERTLFULL]:MTn[NTn.COERCERTL],c;while((c=l.exec(e))&&(!n||n.index+n[0].length!==e.length)){if(!n||c.index+c[0].length!==n.index+n[0].length)n=c;l.lastIndex=c.index+c[1].length+c[2].length}l.lastIndex=-1}if(n===null)return null;let r=n[2],o=n[3]||"0",s=n[4]||"0",i=t.includePrerelease&&n[5]?`-${n[5]}`:"",a=t.includePrerelease&&n[6]?`+${n[6]}`:"";return Jnd(`${r}.${o}.${s}${i}${a}`,t)};YTi.exports=Xnd});
export {JTi};
