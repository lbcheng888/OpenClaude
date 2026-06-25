// @ts-nocheck
import {Q} from "../runtime.ts";
import {OF} from "./m2308.ts";
import {t2e} from "./m2309.ts";
import {ott} from "./m2305.ts";
var owi=Q((Jfg,rwi)=>{var Emd=OF(),Cmd=t2e(),{safeRe:ECn,t:CCn}=ott(),Amd=(e,t)=>{if(e instanceof Emd)return e;if(typeof e==="number")e=String(e);if(typeof e!=="string")return null;t=t||{};let n=null;if(!t.rtl)n=e.match(t.includePrerelease?ECn[CCn.COERCEFULL]:ECn[CCn.COERCE]);else{let l=t.includePrerelease?ECn[CCn.COERCERTLFULL]:ECn[CCn.COERCERTL],c;while((c=l.exec(e))&&(!n||n.index+n[0].length!==e.length)){if(!n||c.index+c[0].length!==n.index+n[0].length)n=c;l.lastIndex=c.index+c[1].length+c[2].length}l.lastIndex=-1}if(n===null)return null;let r=n[2],o=n[3]||"0",s=n[4]||"0",i=t.includePrerelease&&n[5]?`-${n[5]}`:"",a=t.includePrerelease&&n[6]?`+${n[6]}`:"";return Cmd(`${r}.${o}.${s}${i}${a}`,t)};rwi.exports=Amd});
export {owi};
