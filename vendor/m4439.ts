// @ts-nocheck
import {ds,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {execFileNoThrowWithCwd,oa} from "./m684.ts";
import {b} from "../runtime.ts";
async function Ejn(e){let t;try{t=await wnl.readdir(e)}catch(r){if(ds(r))return{ran:!1};throw r}let n=new Set(t);if(!n.has("package.json"))return{ran:!1};for(let r of Lqp){if(!n.has(r.lockfile))continue;logForDebugging(`Installing plugin dependencies: ${r.command} ${r.args.join(" ")} in ${e}`);let o=await execFileNoThrowWithCwd(r.command,r.args,{cwd:e,timeout:Oqp});if(o.code!==0)return{ran:!0,error:`Plugin dependency install failed (${r.command}): ${o.stderr||o.stdout||o.error||"no output"}`.slice(0,500)};return logForDebugging(`Plugin dependency install succeeded (${r.command}) in ${e}`),{ran:!0}}if(n.has("yarn.lock")||n.has("pnpm-lock.yaml"))return{ran:!1,error:"Skipped: yarn/pnpm lockfiles are not supported (resolution-time hooks bypass --ignore-scripts). Use bun or npm."};return{ran:!1}}
var wnl,Oqp=60000,Lqp;
var Jgo=b(()=>{qe();bt();oa();wnl=require("fs/promises"),Lqp=[{lockfile:"bun.lock",command:"bun",args:["install","--frozen-lockfile","--ignore-scripts"]},{lockfile:"bun.lockb",command:"bun",args:["install","--frozen-lockfile","--ignore-scripts"]},{lockfile:"npm-shrinkwrap.json",command:"npm",args:["ci","--ignore-scripts"]},{lockfile:"package-lock.json",command:"npm",args:["ci","--ignore-scripts"]}]});
export {Ejn,wnl,Oqp,Lqp,Jgo};
