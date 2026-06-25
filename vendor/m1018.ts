// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {fromWebToken,fromTokenFile,Mws} from "./m1017.ts";
var svr={};
ft(svr,{fromWebToken:()=>fromWebToken,fromTokenFile:()=>fromTokenFile});
var mwt=b(()=>{Mws()});
export {svr,mwt};
