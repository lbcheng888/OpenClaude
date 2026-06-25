// @ts-nocheck
import {b} from "../runtime.ts";
import {lt,getIsNonInteractiveSession} from "../src/session/0132_sent.ts";
import {mMl,pMl} from "../src/computer-use/5027_call.ts";
var fym,fMl;
var hMl=b(()=>{lt();fym={name:"chrome",description:"Open Claude in Chrome (beta) settings",availability:["claude-ai"],isEnabled:()=>!getIsNonInteractiveSession(),type:"local-jsx",load:()=>Promise.resolve().then(() => (mMl(),pMl))},fMl=fym});
export {fym,fMl,hMl};
