// @ts-nocheck
import {iHt,TKs,hFe} from "./m1542.ts";
import {SDr} from "./m1537.ts";
import {VAe} from "./m1539.ts";
import {AQ,rHt} from "./m1519.ts";
import {b} from "../runtime.ts";
import {sHt} from "./m1541.ts";
var aHt=async({headers:e,body:t},n)=>{for(let r of Object.keys(e))if(r.toLowerCase()===iHt)return e[r];if(t==null)return"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";else if(typeof t==="string"||ArrayBuffer.isView(t)||SDr(t)){let r=new n;return r.update(VAe(t)),AQ(await r.digest())}return TKs};
var xDr=b(()=>{rHt();sHt();hFe()});
export {aHt,xDr};
