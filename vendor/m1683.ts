// @ts-nocheck
import {b} from "../runtime.ts";
function cGs(e={}){let t=new Xwt(e.parentContext);if(e.span)t=t.setValue(aJe.span,e.span);if(e.namespace)t=t.setValue(aJe.namespace,e.namespace);return t}
class Xwt{constructor(e){this._contextMap=e instanceof Xwt?new Map(e._contextMap):new Map}setValue(e,t){let n=new Xwt(this);return n._contextMap.set(e,t),n}getValue(e){return this._contextMap.get(e)}deleteValue(e){let t=new Xwt(this);return t._contextMap.delete(e),t}}
var aJe;
var KHr=b(()=>{aJe={span:Symbol.for("@azure/core-tracing span"),namespace:Symbol.for("@azure/core-tracing namespace")}});
export {cGs,Xwt,aJe,KHr};
