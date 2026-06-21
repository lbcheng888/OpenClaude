// @ts-nocheck
import {X} from "../runtime.ts";
var tri=X((Ghn)=>{Object.defineProperty(Ghn,"__esModule",{value:!0});Ghn.BaggageImpl=void 0;class PXe{constructor(e){this._entries=e?new Map(e):new Map}getEntry(e){let t=this._entries.get(e);if(!t)return;return Object.assign({},t)}getAllEntries(){return Array.from(this._entries.entries()).map(([e,t])=>[e,t])}setEntry(e,t){let n=new PXe(this._entries);return n._entries.set(e,t),n}removeEntry(e){let t=new PXe(this._entries);return t._entries.delete(e),t}removeEntries(...e){let t=new PXe(this._entries);for(let n of e)t._entries.delete(n);return t}clear(){return new PXe}}Ghn.BaggageImpl=PXe});
export {tri};
