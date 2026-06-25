// @ts-nocheck
import {b} from "../runtime.ts";
import {cW} from "../src/config/2712_isKairosCronEnabled.ts";
import {EPl,SPl} from "../src/telemetry/4962_call.ts";
var pgm,CPl;
var APl=b(()=>{cW();pgm={type:"local-jsx",name:"loops",description:"List, create, and delete loops",immediate:!0,isEnabled:()=>!1,load:()=>Promise.resolve().then(() => (EPl(),SPl))},CPl=pgm});
export {pgm,CPl,APl};
