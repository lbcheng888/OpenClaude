// @ts-nocheck
import {b} from "../runtime.ts";
import {Sz,ix} from "../src/config/2704_Sz.ts";
import {mwl,pwl} from "./m4934.ts";
var fwl;
var Awl=b(()=>{Sz();fwl={type:"local-jsx",name:"fork",description:"Spawn a background agent that inherits the full conversation",argumentHint:"<directive>",isEnabled:()=>!ix(),load:()=>Promise.resolve().then(() => (mwl(),pwl))}});
export {fwl,Awl};
