// @ts-nocheck
import {toJSONSchema} from "./m304.ts";
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {zn} from "../src/api/2198_stopPeriodicGrowthBookRefresh.ts";
function P0e(e){let t=vel.get(e);if(t)return t;let n=toJSONSchema(e);return vel.set(e,n),n}
var vel;
var P6n=b(()=>{Xr();zn();vel=new WeakMap});
export {P0e,vel,P6n};
