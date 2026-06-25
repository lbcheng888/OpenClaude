// @ts-nocheck
import {Q} from "../runtime.ts";
import {TF} from "./m1825.ts";
import {fBe} from "./m1826.ts";
import {OQe} from "./m1822.ts";
var $ei=Q((mWh,Uei)=>{var UVu=TF(),$Vu=fBe(),{safeRe:s_n,t:i_n}=OQe(),qVu=(e,t)=>{if(e instanceof UVu)return e;if(typeof e==="number")e=String(e);if(typeof e!=="string")return null;t=t||{};let n=null;if(!t.rtl)n=e.match(t.includePrerelease?s_n[i_n.COERCEFULL]:s_n[i_n.COERCE]);else{let l=t.includePrerelease?s_n[i_n.COERCERTLFULL]:s_n[i_n.COERCERTL],c;while((c=l.exec(e))&&(!n||n.index+n[0].length!==e.length)){if(!n||c.index+c[0].length!==n.index+n[0].length)n=c;l.lastIndex=c.index+c[1].length+c[2].length}l.lastIndex=-1}if(n===null)return null;let r=n[2],o=n[3]||"0",s=n[4]||"0",i=t.includePrerelease&&n[5]?`-${n[5]}`:"",a=t.includePrerelease&&n[6]?`+${n[6]}`:"";return $Vu(`${r}.${o}.${s}${i}${a}`,t)};Uei.exports=qVu});
export {$ei};
