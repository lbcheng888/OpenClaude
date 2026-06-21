// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
import {aFt} from "./m3626.ts";
import {Yto} from "./m3627.ts";
import {Jto} from "./m3628.ts";
var VSa=X((bMn)=>{Object.defineProperty(bMn,"__esModule",{value:!0});bMn.W3CBaggagePropagator=void 0;var Xto=Xi(),Zsp=aFt(),T3e=Yto(),Qto=Jto();class GSa{inject(e,t,n){let r=Xto.propagation.getBaggage(e);if(!r||(0,Zsp.isTracingSuppressed)(e))return;let o=(0,Qto.getKeyPairs)(r).filter((i)=>i.length<=T3e.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS).slice(0,T3e.BAGGAGE_MAX_NAME_VALUE_PAIRS),s=(0,Qto.serializeKeyPairs)(o);if(s.length>0)n.set(t,T3e.BAGGAGE_HEADER,s)}extract(e,t,n){let r=n.get(t,T3e.BAGGAGE_HEADER),o=Array.isArray(r)?r.join(T3e.BAGGAGE_ITEMS_SEPARATOR):r;if(!o)return e;let s={};if(o.length===0)return e;if(o.split(T3e.BAGGAGE_ITEMS_SEPARATOR).forEach((a)=>{let l=(0,Qto.parsePairKeyValue)(a);if(l){let c={value:l.value};if(l.metadata)c.metadata=l.metadata;s[l.key]=c}}),Object.entries(s).length===0)return e;return Xto.propagation.setBaggage(e,Xto.propagation.createBaggage(s))}fields(){return[T3e.BAGGAGE_HEADER]}}bMn.W3CBaggagePropagator=GSa});
export {VSa};
