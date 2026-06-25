// @ts-nocheck
import {Lwt} from "./m1204.ts";
import {eHr,X1s} from "./m1245.ts";
import {b} from "../runtime.ts";
import {Ukr} from "./m1209.ts";
class tHr{messageSigner;eventStreamCodec;systemClockOffsetProvider;constructor(e){this.messageSigner=e.messageSigner,this.eventStreamCodec=new Lwt(e.utf8Encoder,e.utf8Decoder),this.systemClockOffsetProvider=async()=>e.systemClockOffset??0}async handle(e,t,n={}){let r=t.request,{body:o,query:s}=r;if(!(o instanceof MJe.Readable))throw Error("Eventstream payload must be a Readable stream.");let i=o;r.body=new MJe.PassThrough({objectMode:!0});let l=r.headers?.authorization?.match(/Signature=([\w]+)$/)?.[1]??s?.["X-Amz-Signature"]??"",c=new eHr({priorSignature:l,eventStreamCodec:this.eventStreamCodec,messageSigner:await this.messageSigner(),systemClockOffsetProvider:this.systemClockOffsetProvider});MJe.pipeline(i,c,r.body,(d)=>{if(d)throw d});let u;try{u=await e(t)}catch(d){throw r.body.end(),d}return u}}
var MJe;
var Q1s=b(()=>{Ukr();X1s();MJe=require("stream")});
export {tHr,MJe,Q1s};
