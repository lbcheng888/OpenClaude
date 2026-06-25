// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
import {Hxt} from "./m2097.ts";
import {GUr} from "./m2098.ts";
import {VUr} from "./m2099.ts";
var Zci=Q((JTn)=>{Object.defineProperty(JTn,"__esModule",{value:!0});JTn.W3CBaggagePropagator=void 0;var KUr=xi(),Ord=Hxt(),ZBe=GUr(),zUr=VUr();class Qci{inject(e,t,n){let r=KUr.propagation.getBaggage(e);if(!r||(0,Ord.isTracingSuppressed)(e))return;let o=(0,zUr.getKeyPairs)(r).filter((i)=>i.length<=ZBe.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS).slice(0,ZBe.BAGGAGE_MAX_NAME_VALUE_PAIRS),s=(0,zUr.serializeKeyPairs)(o);if(s.length>0)n.set(t,ZBe.BAGGAGE_HEADER,s)}extract(e,t,n){let r=n.get(t,ZBe.BAGGAGE_HEADER),o=Array.isArray(r)?r.join(ZBe.BAGGAGE_ITEMS_SEPARATOR):r;if(!o)return e;let s={};if(o.length===0)return e;if(o.split(ZBe.BAGGAGE_ITEMS_SEPARATOR).forEach((a)=>{let l=(0,zUr.parsePairKeyValue)(a);if(l){let c={value:l.value};if(l.metadata)c.metadata=l.metadata;s[l.key]=c}}),Object.entries(s).length===0)return e;return KUr.propagation.setBaggage(e,KUr.propagation.createBaggage(s))}fields(){return[ZBe.BAGGAGE_HEADER]}}JTn.W3CBaggagePropagator=Qci});
export {Zci};
