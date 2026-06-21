// @ts-nocheck
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
import {qs,zt} from "./m635.ts";
var dts,RR,rEt;
var h7=b(()=>{ta();qs();dts=require("path"),RR=wn(function(){switch(zt()){case"macos":return"/Library/Application Support/ClaudeCode";case"windows":return"C:\\Program Files\\ClaudeCode";default:return"/etc/claude-code"}}),rEt=wn(function(){return dts.join(RR(),"managed-settings.d")})});
export {dts,RR,rEt,h7};
