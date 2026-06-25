// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {s_} from "./m2764.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var u$n;
var Kco=b(()=>{Qr();u$n=s_({kind:"it2_setup",payload:ve(()=>C.object({tmuxAvailable:C.boolean()})),result:ve(()=>C.enum(["installed","use-tmux","cancelled"])),default:"cancelled"})});
export {u$n,Kco};
