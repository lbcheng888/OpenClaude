// @ts-nocheck
import {b} from "../runtime.ts";
import {Mwt} from "./m1607.ts";
function Nwt(){}
function lpn(e,t,n){if(!t||H8s[e]>H8s[n])return Nwt;else return t[e].bind(t)}
function cpn(e){let t=e.logger,n=e.logLevel??"off";if(!t)return GMu;let r=I8s.get(t);if(r&&r[0]===n)return r[1];let o={error:lpn("error",t,n),warn:lpn("warn",t,n),info:lpn("info",t,n),debug:lpn("debug",t,n)};return I8s.set(t,[n,o]),o}
var H8s,GMu,I8s;
var Bkr=b(()=>{Mwt();H8s={off:0,error:200,warn:300,info:400,debug:500};GMu={error:Nwt,warn:Nwt,info:Nwt,debug:Nwt},I8s=new WeakMap});
export {Nwt,lpn,cpn,H8s,GMu,I8s,Bkr};
