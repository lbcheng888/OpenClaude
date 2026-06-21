// @ts-nocheck
import {lvt} from "./m1199.ts";
import {vCr,rDs} from "./m1240.ts";
import {b} from "../runtime.ts";
import {dCr} from "./m1204.ts";
class wCr{messageSigner;eventStreamCodec;systemClockOffsetProvider;constructor(e){this.messageSigner=e.messageSigner,this.eventStreamCodec=new lvt(e.utf8Encoder,e.utf8Decoder),this.systemClockOffsetProvider=async()=>e.systemClockOffset??0}async handle(e,t,n={}){let r=t.request,{body:o,query:s}=r;if(!(o instanceof Bze.Readable))throw Error("Eventstream payload must be a Readable stream.");let i=o;r.body=new Bze.PassThrough({objectMode:!0});let l=r.headers?.authorization?.match(/Signature=([\w]+)$/)?.[1]??s?.["X-Amz-Signature"]??"",c=new vCr({priorSignature:l,eventStreamCodec:this.eventStreamCodec,messageSigner:await this.messageSigner(),systemClockOffsetProvider:this.systemClockOffsetProvider});Bze.pipeline(i,c,r.body,(d)=>{if(d)throw d});let u;try{u=await e(t)}catch(d){throw r.body.end(),d}return u}}
var Bze;
var oDs=b(()=>{dCr();rDs();Bze=require("stream")});
export {wCr,Bze,oDs};
