// @ts-nocheck
import {b} from "../runtime.ts";
import {Jol,Yol} from "./m4483.ts";
var Ojp,Zjn;
var Xol=b(()=>{Ojp={type:"local",name:"clear",description:"Start a new session with empty context; previous session stays on disk (resumable with /resume)",argumentHint:"[name]",aliases:["reset","new"],supportsNonInteractive:!0,thinClientDispatch:"post-text",load:()=>Promise.resolve().then(() => (Jol(),Yol))},Zjn=Ojp});
export {Ojp,Zjn,Xol};
