// @ts-nocheck
import {Ume} from "./m1590.ts";
import {b} from "../runtime.ts";
import {azs} from "./m1599.ts";
var lzs=async(e=new Uint8Array,t)=>{if(e instanceof Uint8Array)return Ume.mutate(e);if(!e)return Ume.mutate(new Uint8Array);let n=t.streamCollector(e);return Ume.mutate(await n)};
var czs=b(()=>{azs()});
export {lzs,czs};
