// @ts-nocheck
import {X} from "../runtime.ts";
var zkt=X((LXe)=>{Object.defineProperty(LXe,"__esModule",{value:!0});LXe.ROOT_CONTEXT=LXe.createContextKey=void 0;function GVu(e){return Symbol.for(e)}LXe.createContextKey=GVu;class Khn{constructor(e){let t=this;t._currentContext=e?new Map(e):new Map,t.getValue=(n)=>t._currentContext.get(n),t.setValue=(n,r)=>{let o=new Khn(t._currentContext);return o._currentContext.set(n,r),o},t.deleteValue=(n)=>{let r=new Khn(t._currentContext);return r._currentContext.delete(n),r}}}LXe.ROOT_CONTEXT=new Khn});
export {zkt};
