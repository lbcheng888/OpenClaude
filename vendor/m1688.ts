// @ts-nocheck
import {b} from "../runtime.ts";
function oJs(e={}){let t=new AHt(e.parentContext);if(e.span)t=t.setValue(sQe.span,e.span);if(e.namespace)t=t.setValue(sQe.namespace,e.namespace);return t}
class AHt{constructor(e){this._contextMap=e instanceof AHt?new Map(e._contextMap):new Map}setValue(e,t){let n=new AHt(this);return n._contextMap.set(e,t),n}getValue(e){return this._contextMap.get(e)}deleteValue(e){let t=new AHt(this);return t._contextMap.delete(e),t}}
var sQe;
var COr=b(()=>{sQe={span:Symbol.for("@azure/core-tracing span"),namespace:Symbol.for("@azure/core-tracing namespace")}});
export {oJs,AHt,sQe,COr};
