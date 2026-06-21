// @ts-nocheck
import {hkr} from "./m1559.ts";
import {ykr} from "./m1562.ts";
import {gkr} from "./m1560.ts";
import {_kr} from "./m1561.ts";
import {Tkr} from "./m1563.ts";
import {b} from "../runtime.ts";
import {Ijs} from "./m1564.ts";
function Djs(e){let t=0,n=0,r=null,o=null,s=(a)=>{if(typeof a!=="number")throw Error("Attempted to allocate an event message where size was not a number: "+a);t=a,n=4,r=new Uint8Array(a),new DataView(r.buffer).setUint32(0,a,!1)},i=async function*(){let a=e[Symbol.asyncIterator]();while(!0){let{value:l,done:c}=await a.next();if(c){if(!t)return;else if(t===n)yield r;else throw Error("Truncated event message received.");return}let u=l.length,d=0;while(d<u){if(!r){let m=u-d;if(!o)o=new Uint8Array(4);let f=Math.min(4-n,m);if(o.set(l.slice(d,d+f),n),n+=f,d+=f,n<4)break;s(new DataView(o.buffer).getUint32(0,!1)),o=null}let p=Math.min(t-n,u-d);if(r.set(l.slice(d,d+p),n),n+=p,d+=p,t&&t===n)yield r,r=null,t=0,n=0}}};return{[Symbol.asyncIterator]:i}}
function Pjs(e,t){return async function(n){let{value:r}=n.headers[":message-type"];if(r==="error"){let o=Error(n.headers[":error-message"].value||"UnknownError");throw o.name=n.headers[":error-code"].value,o}else if(r==="exception"){let o=n.headers[":exception-type"].value,s={[o]:n},i=await e(s);if(i.$unknown){let a=Error(t(n.body));throw a.name=o,a}throw i[o]}else if(r==="event"){let o={[n.headers[":event-type"].value]:n},s=await e(o);if(s.$unknown)return;return s}else throw Error(`Unrecognizable event type: ${n.headers[":event-type"].value}`)}}
class tpn{constructor({utf8Encoder:e,utf8Decoder:t}){this.eventStreamCodec=new hkr(e,t),this.utfEncoder=e}deserialize(e,t){let n=Djs(e);return new ykr({messageStream:new gkr({inputStream:n,decoder:this.eventStreamCodec}),deserializer:Pjs(t,this.utfEncoder)})}serialize(e,t){return new _kr({messageStream:new Tkr({inputStream:e,serializer:t}),encoder:this.eventStreamCodec,includeEndFrame:!0})}}
var Skr=b(()=>{Ijs()});
export {Djs,Pjs,tpn,Skr};
