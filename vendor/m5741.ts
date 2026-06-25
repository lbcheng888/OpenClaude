// @ts-nocheck
import {h7t,xNo} from "./m5323.ts";
import {b} from "../runtime.ts";
function z_c(e,t={},n,r){let o=new K_c.URL(e.href);if(o.protocol==="wss:")o.protocol="https:";else if(o.protocol==="ws:")o.protocol="http:";return o.pathname=o.pathname.replace(/\/$/,"")+"/worker/events/stream",new h7t(o,t,n,r)}
var K_c;
var j_c=b(()=>{xNo();K_c=require("url")});
export {z_c,K_c,j_c};
