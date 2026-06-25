// @ts-nocheck
import {b} from "../runtime.ts";
import {yte,Mut,dG} from "../src/config/3910_claude_haiku_4_5.ts";
import {vMl,RMl} from "../src/tui/5033_call.ts";
var wMl;
var kMl=b(()=>{yte();wMl={type:"local-jsx",name:"advisor",description:"Let Claude consult a stronger model at key moments",get argumentHint(){return`[${[...Mut(),"off"].join("|")}]`},isEnabled:()=>dG(),get isHidden(){return!dG()},load:()=>Promise.resolve().then(() => (vMl(),RMl))}});
export {wMl,kMl};
