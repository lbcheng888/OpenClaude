// @ts-nocheck
import {b} from "../runtime.ts";
import {kWe,rgt,tgt} from "./m4827.ts";
import {ODl,DDl} from "../src/telemetry/4947_call.ts";
var a0o;
var LDl=b(()=>{kWe();a0o={type:"local-jsx",name:"passes",get description(){if(rgt())return"Share a free week of Claude Code with friends and earn usage credits";return"Share a free week of Claude Code with friends"},get isHidden(){let{eligible:e,hasCache:t}=tgt();return!e||!t},requires:{ink:!0},load:()=>Promise.resolve().then(() => (ODl(),DDl))}});
export {a0o,LDl};
