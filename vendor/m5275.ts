// @ts-nocheck
import {IAt,Q9,FPe} from "./m5273.ts";
import {Iqe,d$n} from "./m4074.ts";
import {_i,hp} from "../src/session/1460_promise.ts";
import {spt} from "../src/config/4391_stopRendezvousServer.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function s3l(){let e=IAt(),t=e?.kind===Iqe.kind;o3l.useEffect(()=>{if(!_i()){spt(null);return}if(t&&e){let n=e.payload;return spt((r)=>{let o=r.trim();if(!o||o.startsWith("!")||o.startsWith("/"))return!1;let s=n.questions[0];if(!s)return!1;spt(null);let a=s.options?.find((l)=>l.label.toLowerCase()===o.toLowerCase())?.label??o;return Q9.answer(e.id,{behavior:"allow",updatedInput:{...n.input,answers:{[s.question]:a}}}),!0}),()=>spt(null)}spt(null)},[e,t])}
var o3l;
var i3l=b(()=>{d$n();FPe();hp();o3l=M(Te(),1)});
export {s3l,o3l,i3l};
