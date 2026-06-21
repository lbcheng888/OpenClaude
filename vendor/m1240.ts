// @ts-nocheck
import {b} from "../runtime.ts";
function PRu(e){let t=Buffer.from(e,"hex");return new Uint8Array(t.buffer,t.byteOffset,t.byteLength/Uint8Array.BYTES_PER_ELEMENT)}
var nDs,vCr;
var rDs=b(()=>{nDs=require("stream");vCr=class vCr extends nDs.Transform{priorSignature;messageSigner;eventStreamCodec;systemClockOffsetProvider;constructor(e){super({autoDestroy:!0,readableObjectMode:!0,writableObjectMode:!0,...e});this.priorSignature=e.priorSignature,this.eventStreamCodec=e.eventStreamCodec,this.messageSigner=e.messageSigner,this.systemClockOffsetProvider=e.systemClockOffsetProvider}async _transform(e,t,n){try{let r=new Date(Date.now()+await this.systemClockOffsetProvider()),o={":date":{type:"timestamp",value:r}},s=await this.messageSigner.sign({message:{body:e,headers:o},priorSignature:this.priorSignature},{signingDate:r});this.priorSignature=s.signature;let i=this.eventStreamCodec.encode({headers:{...o,":chunk-signature":{type:"binary",value:PRu(s.signature)}},body:e});return this.push(i),n()}catch(r){n(r)}}}});
export {PRu,nDs,vCr,rDs};
