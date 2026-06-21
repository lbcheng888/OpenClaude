// @ts-nocheck
import {Pwt,C6s,yNe} from "./m1537.ts";
import {Wxr} from "./m1532.ts";
import {lCe} from "./m1534.ts";
import {xQ,Hwt} from "./m1514.ts";
import {b} from "../runtime.ts";
import {Dwt} from "./m1536.ts";
var Owt=async({headers:e,body:t},n)=>{for(let r of Object.keys(e))if(r.toLowerCase()===Pwt)return e[r];if(t==null)return"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";else if(typeof t==="string"||ArrayBuffer.isView(t)||Wxr(t)){let r=new n;return r.update(lCe(t)),xQ(await r.digest())}return C6s};
var tkr=b(()=>{Hwt();Dwt();yNe()});
export {Owt,tkr};
