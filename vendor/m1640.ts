// @ts-nocheck
import {b} from "../runtime.ts";
function ohn(e){return e.toLowerCase()}
function*Dqu(e){for(let t of e.values())yield[t.name,t.value]}
function ise(e){return new Sjs(e)}
var Sjs;
var fHt=b(()=>{Sjs=class Sjs{constructor(e){if(this._headersMap=new Map,e)for(let t of Object.keys(e))this.set(t,e[t])}set(e,t){this._headersMap.set(ohn(e),{name:e,value:String(t).trim()})}get(e){var t;return(t=this._headersMap.get(ohn(e)))===null||t===void 0?void 0:t.value}has(e){return this._headersMap.has(ohn(e))}delete(e){this._headersMap.delete(ohn(e))}toJSON(e={}){let t={};if(e.preserveCase)for(let n of this._headersMap.values())t[n.name]=n.value;else for(let[n,r]of this._headersMap)t[n]=r.value;return t}toString(){return JSON.stringify(this.toJSON({preserveCase:!0}))}[Symbol.iterator](){return Dqu(this._headersMap)}}});
export {ohn,Dqu,ise,Sjs,fHt};
