// @ts-nocheck
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {zg} from "./m2752.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var uFn;
var eso=b(()=>{Xr();uFn=zg({kind:"it2_setup",payload:we(()=>E.object({tmuxAvailable:E.boolean()})),result:we(()=>E.enum(["installed","use-tmux","cancelled"])),default:"cancelled"})});
export {uFn,eso};
