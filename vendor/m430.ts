// @ts-nocheck
import {Yre,YT} from "../src/tools/0323_ttl.ts";
import {b} from "../runtime.ts";
class MSt{append(e){this._buffer=this._buffer?Buffer.concat([this._buffer,e]):e}readMessage(){if(!this._buffer)return null;let e=this._buffer.indexOf(`
`);if(e===-1)return null;let t=this._buffer.toString("utf8",0,e).replace(/\r$/,"");return this._buffer=this._buffer.subarray(e+1),bdr(t)}clear(){this._buffer=void 0}}
function bdr(e){return Yre.parse(JSON.parse(e))}
function dZt(e){return JSON.stringify(e)+`
`}
var pZt=b(()=>{YT()});
export {MSt,bdr,dZt,pZt};
