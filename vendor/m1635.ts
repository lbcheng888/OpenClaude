// @ts-nocheck
import {b} from "../runtime.ts";
function bpn(e){return e.toLowerCase()}
function*m1u(e){for(let t of e.values())yield[t.name,t.value]}
function ase(e){return new v5s(e)}
var v5s;
var $wt=b(()=>{v5s=class v5s{constructor(e){if(this._headersMap=new Map,e)for(let t of Object.keys(e))this.set(t,e[t])}set(e,t){this._headersMap.set(bpn(e),{name:e,value:String(t).trim()})}get(e){var t;return(t=this._headersMap.get(bpn(e)))===null||t===void 0?void 0:t.value}has(e){return this._headersMap.has(bpn(e))}delete(e){this._headersMap.delete(bpn(e))}toJSON(e={}){let t={};if(e.preserveCase)for(let n of this._headersMap.values())t[n.name]=n.value;else for(let[n,r]of this._headersMap)t[n]=r.value;return t}toString(){return JSON.stringify(this.toJSON({preserveCase:!0}))}[Symbol.iterator](){return m1u(this._headersMap)}}});
export {bpn,m1u,ase,v5s,$wt};
