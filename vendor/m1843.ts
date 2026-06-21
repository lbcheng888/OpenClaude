// @ts-nocheck
import {X} from "../runtime.ts";
import {JB} from "./m1820.ts";
import {_Be} from "./m1821.ts";
import {MJe} from "./m1817.ts";
var Vzs=X((GNA,Gzs)=>{var S$u=JB(),b$u=_Be(),{safeRe:Efn,t:Cfn}=MJe(),E$u=(e,t)=>{if(e instanceof S$u)return e;if(typeof e==="number")e=String(e);if(typeof e!=="string")return null;t=t||{};let n=null;if(!t.rtl)n=e.match(t.includePrerelease?Efn[Cfn.COERCEFULL]:Efn[Cfn.COERCE]);else{let l=t.includePrerelease?Efn[Cfn.COERCERTLFULL]:Efn[Cfn.COERCERTL],c;while((c=l.exec(e))&&(!n||n.index+n[0].length!==e.length)){if(!n||c.index+c[0].length!==n.index+n[0].length)n=c;l.lastIndex=c.index+c[1].length+c[2].length}l.lastIndex=-1}if(n===null)return null;let r=n[2],o=n[3]||"0",s=n[4]||"0",i=t.includePrerelease&&n[5]?`-${n[5]}`:"",a=t.includePrerelease&&n[6]?`+${n[6]}`:"";return b$u(`${r}.${o}.${s}${i}${a}`,t)};Gzs.exports=E$u});
export {Vzs};
