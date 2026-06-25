// @ts-nocheck
import {Q} from "../runtime.ts";
var Jli=Q((ATn)=>{Object.defineProperty(ATn,"__esModule",{value:!0});ATn.BaggageImpl=void 0;class DZe{constructor(e){this._entries=e?new Map(e):new Map}getEntry(e){let t=this._entries.get(e);if(!t)return;return Object.assign({},t)}getAllEntries(){return Array.from(this._entries.entries()).map(([e,t])=>[e,t])}setEntry(e,t){let n=new DZe(this._entries);return n._entries.set(e,t),n}removeEntry(e){let t=new DZe(this._entries);return t._entries.delete(e),t}removeEntries(...e){let t=new DZe(this._entries);for(let n of e)t._entries.delete(n);return t}clear(){return new DZe}}ATn.BaggageImpl=DZe});
export {Jli};
