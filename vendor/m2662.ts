// @ts-nocheck
import {b} from "../runtime.ts";
function jhe(e){if(typeof globalThis.Bun<"u")return globalThis.Bun.which(e);let t=LUi.spawnSync("which",[e],{encoding:"utf8",stdio:["ignore","pipe","ignore"],timeout:1000});if(t.status===0&&t.stdout)return t.stdout.trim();return null}
var LUi;
var yLt=b(()=>{LUi=require("child_process")});
export {jhe,LUi,yLt};
