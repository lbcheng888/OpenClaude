// @ts-nocheck
import {b} from "../runtime.ts";
import {SH,mi} from "./m135.ts";
import {Nrr,uSe} from "./m148.ts";
import {E_t} from "../src/core/0138_key.ts";
var nGe;
var ror=b(()=>{SH();Nrr();nGe=class nGe{constructor(e,t){this.iterator=e,this.controller=t}async*decoder(){let e=new uSe;for await(let t of this.iterator)for(let n of e.decode(t))yield JSON.parse(n);for(let t of e.flush())yield JSON.parse(t)}[Symbol.asyncIterator](){return this.decoder()}static fromResponse(e,t){if(!e.body){if(t.abort(),typeof globalThis.navigator<"u"&&globalThis.navigator.product==="ReactNative")throw new mi("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api");throw new mi("Attempted to iterate over a response with no body")}return new nGe(E_t(e.body),t)}}});
export {nGe,ror};
