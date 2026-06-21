// @ts-nocheck
import {npn} from "./m1568.ts";
import {rpn} from "./m1571.ts";
import {opn} from "./m1576.ts";
import {b,M} from "../runtime.ts";
import {Fjs} from "./m1570.ts";
import {vkr} from "./m1577.ts";
import {Lzt} from "./m173.ts";
import {zde} from "./m168.ts";
import {LD} from "./m194.ts";
import {R8s,w8s} from "./m1605.ts";
import {Mwt,k8s} from "./m1607.ts";
import {Bkr,cpn} from "./m1608.ts";
import {SKe} from "./m809.ts";
import {g2} from "../src/core/0150_event.ts";
import {mi,es} from "./m135.ts";
import {x8s} from "./m1606.ts";
function KMu(e){return typeof e==="object"&&e!==null&&(("name"in e)&&e.name==="AbortError"||("message"in e)&&String(e.message).includes("FetchRequestCanceledException"))}
var P8s,Fkr=(e)=>new TextDecoder("utf-8").decode(e),D8s=(e)=>new TextEncoder().encode(e),VMu=()=>{let e=new npn({utf8Encoder:Fkr,utf8Decoder:D8s});return{base64Decoder:rpn,base64Encoder:opn,utf8Decoder:D8s,utf8Encoder:Fkr,eventStreamMarshaller:e,streamCollector:P8s.streamCollector}},upn;
var O8s=b(()=>{Fjs();vkr();Lzt();zde();LD();R8s();Mwt();Bkr();P8s=M(SKe(),1);upn=class upn extends g2{static fromSSEResponse(e,t,n){let r=!1,o=n?cpn(n):console;async function*s(){if(!e.body)throw t.abort(),new mi("Attempted to iterate over a response with no body");let a=x8s(e.body),l=w8s(a,VMu());for await(let c of l)if(c.chunk&&c.chunk.bytes)yield{event:"chunk",data:Fkr(c.chunk.bytes),raw:[]};else if(c.internalServerException)yield{event:"error",data:"InternalServerException",raw:[]};else if(c.modelStreamErrorException)yield{event:"error",data:"ModelStreamErrorException",raw:[]};else if(c.validationException)yield{event:"error",data:"ValidationException",raw:[]};else if(c.throttlingException)yield{event:"error",data:"ThrottlingException",raw:[]}}async function*i(){if(r)throw Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");r=!0;let a=!1;try{for await(let l of s()){if(l.event==="chunk"){let c;try{c=JSON.parse(l.data)}catch(u){throw o.error("Could not parse message into JSON:",l.data),o.error("From chunk:",l.raw),u}if(c&&typeof c==="object"&&c.type==="error")throw new es(void 0,c,void 0,e.headers,c.error?.type);yield c}if(l.event==="error"){let c=l.data,u=k8s(c),d=u?void 0:c;throw es.generate(void 0,u,d,e.headers)}}a=!0}catch(l){if(KMu(l))return;throw l}finally{if(!a)t.abort()}}return new upn(i,t)}}});
export {KMu,P8s,Fkr,D8s,VMu,upn,O8s};
