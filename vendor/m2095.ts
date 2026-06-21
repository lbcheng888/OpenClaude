// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
import {nHt} from "./m2092.ts";
import {g1r} from "./m2093.ts";
import {_1r} from "./m2094.ts";
var ooi=X((ggn)=>{Object.defineProperty(ggn,"__esModule",{value:!0});ggn.W3CBaggagePropagator=void 0;var y1r=Xi(),AKu=nHt(),nFe=g1r(),T1r=_1r();class roi{inject(e,t,n){let r=y1r.propagation.getBaggage(e);if(!r||(0,AKu.isTracingSuppressed)(e))return;let o=(0,T1r.getKeyPairs)(r).filter((i)=>i.length<=nFe.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS).slice(0,nFe.BAGGAGE_MAX_NAME_VALUE_PAIRS),s=(0,T1r.serializeKeyPairs)(o);if(s.length>0)n.set(t,nFe.BAGGAGE_HEADER,s)}extract(e,t,n){let r=n.get(t,nFe.BAGGAGE_HEADER),o=Array.isArray(r)?r.join(nFe.BAGGAGE_ITEMS_SEPARATOR):r;if(!o)return e;let s={};if(o.length===0)return e;if(o.split(nFe.BAGGAGE_ITEMS_SEPARATOR).forEach((a)=>{let l=(0,T1r.parsePairKeyValue)(a);if(l){let c={value:l.value};if(l.metadata)c.metadata=l.metadata;s[l.key]=c}}),Object.entries(s).length===0)return e;return y1r.propagation.setBaggage(e,y1r.propagation.createBaggage(s))}fields(){return[nFe.BAGGAGE_HEADER]}}ggn.W3CBaggagePropagator=roi});
export {ooi};
