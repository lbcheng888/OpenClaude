// @ts-nocheck
import {jK,N4} from "./m2376.ts";
import {zFe,VQe,lg} from "./m2269.ts";
import {b} from "../runtime.ts";
function bGn(e,t,n){let r=e.width,o=n*r,s=-1;for(let c=r-1;c>=0;c--){let u=jK(e,o+c);if(u.width===2)continue;if(u.char===" "&&(u.styleId&1)===0&&u.hyperlink===void 0)continue;s=c;break}if(s<0)return"";let i="",a=t.none,l;for(let c=0;c<=s;c++){let u=jK(e,o+c);if(u.width===2||u.width===3)continue;if(u.hyperlink!==l){if(l!==void 0)i+=zFe;if(u.hyperlink!==void 0)i+=VQe(u.hyperlink);l=u.hyperlink}i+=t.transition(a,u.styleId),a=u.styleId,i+=u.char}if(l!==void 0)i+=zFe;if(a!==t.none)i+=unm;return i}
var unm="\x1B[0m";
var bTl=b(()=>{N4();lg()});
export {bGn,unm,bTl};
