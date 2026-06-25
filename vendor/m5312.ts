// @ts-nocheck
import {j_t,T9,NOe} from "./m5310.ts";
import {Kqe,C$n} from "./m3903.ts";
import {Ws,vd} from "../src/session/1465_promise.ts";
import {sft} from "../src/config/4413_stopRendezvousServer.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function mKl(){let e=j_t(),t=e?.kind===Kqe.kind;pKl.useEffect(()=>{if(!Ws()){sft(null);return}if(t&&e){let n=e.payload;return sft((r)=>{let o=r.trim();if(!o||o.startsWith("!")||o.startsWith("/"))return!1;let s=n.questions[0];if(!s)return!1;sft(null);let a=s.options?.find((l)=>l.label.toLowerCase()===o.toLowerCase())?.label??o;return T9.answer(e.id,{behavior:"allow",updatedInput:{...n.input,answers:{[s.question]:a}}}),!0}),()=>sft(null)}sft(null)},[e,t])}
var pKl;
var fKl=b(()=>{C$n();NOe();vd();pKl=x(et(),1)});
export {mKl,pKl,fKl};
