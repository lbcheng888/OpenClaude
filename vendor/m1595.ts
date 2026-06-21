// @ts-nocheck
import {Ime} from "./m1585.ts";
import {b} from "../runtime.ts";
import {p8s} from "./m1594.ts";
var m8s=async(e=new Uint8Array,t)=>{if(e instanceof Uint8Array)return Ime.mutate(e);if(!e)return Ime.mutate(new Uint8Array);let n=t.streamCollector(e);return Ime.mutate(await n)};
var f8s=b(()=>{p8s()});
export {m8s,f8s};
