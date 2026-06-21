// @ts-nocheck
import {b} from "../runtime.ts";
import {lt,getIsNonInteractiveSession} from "../src/session/0131_sent.ts";
import {Kxl,Vxl} from "../src/computer-use/4997_call.ts";
var ncm,zxl;
var Yxl=b(()=>{lt();ncm={name:"chrome",description:"Open Claude in Chrome (beta) settings",availability:["claude-ai"],isEnabled:()=>!getIsNonInteractiveSession(),type:"local-jsx",load:()=>Promise.resolve().then(() => (Kxl(),Vxl))},zxl=ncm});
export {ncm,zxl,Yxl};
