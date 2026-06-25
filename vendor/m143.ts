// @ts-nocheck
import {N6o,Wbe} from "./m138.ts";
import {b} from "../runtime.ts";
function QSt(){}
function eXt(e,t,n){if(!t||tXt[e]>tXt[n])return QSt;else return t[e].bind(t)}
function JH(e){let t=e.logger,n=e.logLevel??"off";if(!t)return yvc;let r=r5o.get(t);if(r&&r[0]===n)return r[1];let o={error:eXt("error",t,n),warn:eXt("warn",t,n),info:eXt("info",t,n),debug:eXt("debug",t,n)};return r5o.set(t,[n,o]),o}
var tXt,llr=(e,t,n)=>{if(!e)return;if(N6o(tXt,e))return e;JH(n).warn(`${t} was set to ${JSON.stringify(e)}, expected one of ${JSON.stringify(Object.keys(tXt))}`);return},yvc,r5o,tpe=(e)=>{if(e.options)e.options={...e.options},delete e.options.headers;if(e.headers)e.headers=Object.fromEntries((e.headers instanceof Headers?[...e.headers]:Object.entries(e.headers)).map(([t,n])=>[t,t.toLowerCase()==="x-api-key"||t.toLowerCase()==="authorization"||t.toLowerCase()==="cookie"||t.toLowerCase()==="set-cookie"?"***":n]));if("retryOfRequestLogID"in e){if(e.retryOfRequestLogID)e.retryOf=e.retryOfRequestLogID;delete e.retryOfRequestLogID}return e};
var ZSt=b(()=>{Wbe();tXt={off:0,error:200,warn:300,info:400,debug:500};yvc={error:QSt,warn:QSt,info:QSt,debug:QSt},r5o=new WeakMap});
export {QSt,eXt,JH,tXt,llr,yvc,r5o,tpe,ZSt};
