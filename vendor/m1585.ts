// @ts-nocheck
import {b} from "../runtime.ts";
import {Zjs,Qjs,Xjs} from "./m1584.ts";
var Ime;
var kkr=b(()=>{Zjs();Ime=class Ime extends Uint8Array{static fromString(e,t="utf-8"){switch(typeof e){case"string":return Qjs(e,t);default:throw Error(`Unsupported conversion from ${typeof e} to Uint8ArrayBlobAdapter.`)}}static mutate(e){return Object.setPrototypeOf(e,Ime.prototype),e}transformToString(e="utf-8"){return Xjs(this,e)}}});
export {Ime,kkr};
