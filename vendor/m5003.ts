// @ts-nocheck
import {b} from "../runtime.ts";
import {Hte,oct,VW} from "../src/config/3934_claude_haiku_4_5.ts";
import {ikl,skl} from "../src/tui/5003_call.ts";
var akl;
var lkl=b(()=>{Hte();akl={type:"local-jsx",name:"advisor",description:"Let Claude consult a stronger model at key moments",get argumentHint(){return`[${[...oct(),"off"].join("|")}]`},isEnabled:()=>VW(),get isHidden(){return!VW()},load:()=>Promise.resolve().then(() => (ikl(),skl))}});
export {akl,lkl};
