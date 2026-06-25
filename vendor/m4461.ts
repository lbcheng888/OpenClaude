// @ts-nocheck
import {Jo,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {execFileNoThrowWithCwd,Ii} from "./m690.ts";
import {b} from "../runtime.ts";
async function WGn(e){let t;try{t=await pcl.readdir(e)}catch(r){if(Jo(r))return{ran:!1};throw r}let n=new Set(t);if(!n.has("package.json"))return{ran:!1};for(let r of yzp){if(!n.has(r.lockfile))continue;logForDebugging(`Installing plugin dependencies: ${r.command} ${r.args.join(" ")} in ${e}`);let o=await execFileNoThrowWithCwd(r.command,r.args,{cwd:e,timeout:_zp});if(o.code!==0)return{ran:!0,error:`Plugin dependency install failed (${r.command}): ${o.stderr||o.stdout||o.error||"no output"}`.slice(0,500)};return logForDebugging(`Plugin dependency install succeeded (${r.command}) in ${e}`),{ran:!0}}if(n.has("yarn.lock")||n.has("pnpm-lock.yaml"))return{ran:!1,error:"Skipped: yarn/pnpm lockfiles are not supported (resolution-time hooks bypass --ignore-scripts). Use bun or npm."};return{ran:!1}}
var pcl,_zp=60000,yzp;
var GEo=b(()=>{qe();Ct();Ii();pcl=require("fs/promises"),yzp=[{lockfile:"bun.lock",command:"bun",args:["install","--frozen-lockfile","--ignore-scripts"]},{lockfile:"bun.lockb",command:"bun",args:["install","--frozen-lockfile","--ignore-scripts"]},{lockfile:"npm-shrinkwrap.json",command:"npm",args:["ci","--ignore-scripts"]},{lockfile:"package-lock.json",command:"npm",args:["ci","--ignore-scripts"]}]});
export {WGn,pcl,_zp,yzp,GEo};
