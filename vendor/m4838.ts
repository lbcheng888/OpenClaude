// @ts-nocheck
import {yz,o4} from "./m2386.ts";
import {KUe,Ket,hg} from "./m2280.ts";
import {b} from "../runtime.ts";
function ujn(e,t,n){let r=e.width,o=n*r,s=-1;for(let c=r-1;c>=0;c--){let u=yz(e,o+c);if(u.width===2)continue;if(u.char===" "&&(u.styleId&1)===0&&u.hyperlink===void 0)continue;s=c;break}if(s<0)return"";let i="",a=t.none,l;for(let c=0;c<=s;c++){let u=yz(e,o+c);if(u.width===2||u.width===3)continue;if(u.hyperlink!==l){if(l!==void 0)i+=KUe;if(u.hyperlink!==void 0)i+=Ket(u.hyperlink);l=u.hyperlink}i+=t.transition(a,u.styleId),a=u.styleId,i+=u.char}if(l!==void 0)i+=KUe;if(a!==t.none)i+=Rdm;return i}
var Rdm="\x1B[0m";
var vkl=b(()=>{o4();hg()});
export {ujn,Rdm,vkl};
