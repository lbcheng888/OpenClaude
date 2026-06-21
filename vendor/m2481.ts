// @ts-nocheck
import {X} from "../runtime.ts";
import {QZe} from "./m2479.ts";
import {MRi} from "./m2480.ts";
import {b0t} from "./m2476.ts";
var BRi=X((amh,NRi)=>{var Xcd=QZe(),Qcd=MRi(),{safeRe:vbn,t:wbn}=b0t(),Zcd=(e,t)=>{if(e instanceof Xcd)return e;if(typeof e==="number")e=String(e);if(typeof e!=="string")return null;t=t||{};let n=null;if(!t.rtl)n=e.match(t.includePrerelease?vbn[wbn.COERCEFULL]:vbn[wbn.COERCE]);else{let l=t.includePrerelease?vbn[wbn.COERCERTLFULL]:vbn[wbn.COERCERTL],c;while((c=l.exec(e))&&(!n||n.index+n[0].length!==e.length)){if(!n||c.index+c[0].length!==n.index+n[0].length)n=c;l.lastIndex=c.index+c[1].length+c[2].length}l.lastIndex=-1}if(n===null)return null;let r=n[2],o=n[3]||"0",s=n[4]||"0",i=t.includePrerelease&&n[5]?`-${n[5]}`:"",a=t.includePrerelease&&n[6]?`+${n[6]}`:"";return Qcd(`${r}.${o}.${s}${i}${a}`,t)};NRi.exports=Zcd});
export {BRi};
