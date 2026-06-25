// @ts-nocheck
import {b} from "../runtime.ts";
import {YH,Qs} from "./m137.ts";
import {plr,Vbe} from "./m150.ts";
import {XSt} from "../src/core/0140_key.ts";
var QKe;
var Dlr=b(()=>{YH();plr();QKe=class QKe{constructor(e,t){this.iterator=e,this.controller=t}async*decoder(){let e=new Vbe;for await(let t of this.iterator)for(let n of e.decode(t))yield JSON.parse(n);for(let t of e.flush())yield JSON.parse(t)}[Symbol.asyncIterator](){return this.decoder()}static fromResponse(e,t){if(!e.body){if(t.abort(),typeof globalThis.navigator<"u"&&globalThis.navigator.product==="ReactNative")throw new Qs("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api");throw new Qs("Attempted to iterate over a response with no body")}return new QKe(XSt(e.body),t)}}});
export {QKe,Dlr};
