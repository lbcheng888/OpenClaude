// @ts-nocheck
import {b} from "../runtime.ts";
import {j7s,z7s,K7s} from "./m1589.ts";
var Ume;
var sPr=b(()=>{j7s();Ume=class Ume extends Uint8Array{static fromString(e,t="utf-8"){switch(typeof e){case"string":return z7s(e,t);default:throw Error(`Unsupported conversion from ${typeof e} to Uint8ArrayBlobAdapter.`)}}static mutate(e){return Object.setPrototypeOf(e,Ume.prototype),e}transformToString(e="utf-8"){return K7s(this,e)}}});
export {Ume,sPr};
