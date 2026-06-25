// @ts-nocheck
import {zre,Qy} from "../src/tools/0325_ttl.ts";
import {b} from "../runtime.ts";
class lAt{append(e){this._buffer=this._buffer?Buffer.concat([this._buffer,e]):e}readMessage(){if(!this._buffer)return null;let e=this._buffer.indexOf(`
`);if(e===-1)return null;let t=this._buffer.toString("utf8",0,e).replace(/\r$/,"");return this._buffer=this._buffer.subarray(e+1),Yhr(t)}clear(){this._buffer=void 0}}
function Yhr(e){return zre.parse(JSON.parse(e))}
function Gtn(e){return JSON.stringify(e)+`
`}
var Vtn=b(()=>{Qy()});
export {lAt,Yhr,Gtn,Vtn};
