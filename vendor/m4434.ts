// @ts-nocheck
import {toJSONSchema} from "./m306.ts";
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {jn} from "../src/api/2204_stopPeriodicGrowthBookRefresh.ts";
function HDe(e){let t=mal.get(e);if(t)return t;let n=toJSONSchema(e);return mal.set(e,n),n}
var mal;
var QWn=b(()=>{Qr();jn();mal=new WeakMap});
export {HDe,mal,QWn};
