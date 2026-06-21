// @ts-nocheck
import {b} from "../runtime.ts";
function LAe(e){if(typeof globalThis.Bun<"u")return globalThis.Bun.which(e);let t=rLi.spawnSync("which",[e],{encoding:"utf8",stdio:["ignore","pipe","ignore"],timeout:1000});if(t.status===0&&t.stdout)return t.stdout.trim();return null}
var rLi;
var UDt=b(()=>{rLi=require("child_process")});
export {LAe,rLi,UDt};
