// @ts-nocheck
import {b} from "../runtime.ts";
import {Ndl,Mdl} from "./m4505.ts";
var _Yp,SVn;
var Fdl=b(()=>{_Yp={type:"local",name:"clear",description:"Start a new session with empty context; previous session stays on disk (resumable with /resume)",argumentHint:"[name]",aliases:["reset","new"],supportsNonInteractive:!0,thinClientDispatch:"post-text",load:()=>Promise.resolve().then(() => (Ndl(),Mdl))},SVn=_Yp});
export {_Yp,SVn,Fdl};
