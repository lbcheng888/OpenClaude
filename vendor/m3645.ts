// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
import {N2t} from "./m3642.ts";
import {xio} from "./m3643.ts";
import {Dio} from "./m3644.ts";
var aHa=Q((hFn)=>{Object.defineProperty(hFn,"__esModule",{value:!0});hFn.W3CBaggagePropagator=void 0;var Pio=xi(),$gp=N2t(),O4e=xio(),Oio=Dio();class iHa{inject(e,t,n){let r=Pio.propagation.getBaggage(e);if(!r||(0,$gp.isTracingSuppressed)(e))return;let o=(0,Oio.getKeyPairs)(r).filter((i)=>i.length<=O4e.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS).slice(0,O4e.BAGGAGE_MAX_NAME_VALUE_PAIRS),s=(0,Oio.serializeKeyPairs)(o);if(s.length>0)n.set(t,O4e.BAGGAGE_HEADER,s)}extract(e,t,n){let r=n.get(t,O4e.BAGGAGE_HEADER),o=Array.isArray(r)?r.join(O4e.BAGGAGE_ITEMS_SEPARATOR):r;if(!o)return e;let s={};if(o.length===0)return e;if(o.split(O4e.BAGGAGE_ITEMS_SEPARATOR).forEach((a)=>{let l=(0,Oio.parsePairKeyValue)(a);if(l){let c={value:l.value};if(l.metadata)c.metadata=l.metadata;s[l.key]=c}}),Object.entries(s).length===0)return e;return Pio.propagation.setBaggage(e,Pio.propagation.createBaggage(s))}fields(){return[O4e.BAGGAGE_HEADER]}}hFn.W3CBaggagePropagator=iHa});
export {aHa};
