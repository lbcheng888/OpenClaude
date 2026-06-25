// @ts-nocheck
import {Ffn} from "./m1573.ts";
import {Bfn} from "./m1576.ts";
import {Ufn} from "./m1581.ts";
import {b,x} from "../runtime.ts";
import {O7s} from "./m1575.ts";
import {tPr} from "./m1582.ts";
import {fXt} from "./m175.ts";
import {npe} from "./m170.ts";
import {jx} from "./m196.ts";
import {Ezs,bzs} from "./m1610.ts";
import {cHt,Azs} from "./m1612.ts";
import {fPr,Vfn} from "./m1613.ts";
import {TYe} from "./m814.ts";
import {FU} from "../src/core/0152_event.ts";
import {Qs,Uo} from "./m137.ts";
import {Czs} from "./m1611.ts";
function pqu(e){return typeof e==="object"&&e!==null&&(("name"in e)&&e.name==="AbortError"||("message"in e)&&String(e.message).includes("FetchRequestCanceledException"))}
var kzs,hPr=(e)=>new TextDecoder("utf-8").decode(e),wzs=(e)=>new TextEncoder().encode(e),dqu=()=>{let e=new Ffn({utf8Encoder:hPr,utf8Decoder:wzs});return{base64Decoder:Bfn,base64Encoder:Ufn,utf8Decoder:wzs,utf8Encoder:hPr,eventStreamMarshaller:e,streamCollector:kzs.streamCollector}},Kfn;
var Hzs=b(()=>{O7s();tPr();fXt();npe();jx();Ezs();cHt();fPr();kzs=x(TYe(),1);Kfn=class Kfn extends FU{static fromSSEResponse(e,t,n){let r=!1,o=n?Vfn(n):console;async function*s(){if(!e.body)throw t.abort(),new Qs("Attempted to iterate over a response with no body");let a=Czs(e.body),l=bzs(a,dqu());for await(let c of l)if(c.chunk&&c.chunk.bytes)yield{event:"chunk",data:hPr(c.chunk.bytes),raw:[]};else if(c.internalServerException)yield{event:"error",data:"InternalServerException",raw:[]};else if(c.modelStreamErrorException)yield{event:"error",data:"ModelStreamErrorException",raw:[]};else if(c.validationException)yield{event:"error",data:"ValidationException",raw:[]};else if(c.throttlingException)yield{event:"error",data:"ThrottlingException",raw:[]}}async function*i(){if(r)throw Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");r=!0;let a=!1;try{for await(let l of s()){if(l.event==="chunk"){let c;try{c=JSON.parse(l.data)}catch(u){throw o.error("Could not parse message into JSON:",l.data),o.error("From chunk:",l.raw),u}if(c&&typeof c==="object"&&c.type==="error")throw new Uo(void 0,c,void 0,e.headers,c.error?.type);yield c}if(l.event==="error"){let c=l.data,u=Azs(c),d=u?void 0:c;throw Uo.generate(void 0,u,d,e.headers)}}a=!0}catch(l){if(pqu(l))return;throw l}finally{if(!a)t.abort()}}return new Kfn(i,t)}}});
export {pqu,kzs,hPr,wzs,dqu,Kfn,Hzs};
