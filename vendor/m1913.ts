// @ts-nocheck
import {b,x} from "../runtime.ts";
function pYu(){try{return w1r.default.statSync("/.dockerenv"),!0}catch{return!1}}
function mYu(){try{return w1r.default.readFileSync("/proc/self/cgroup","utf8").includes("docker")}catch{return!1}}
function k1r(){if(v1r===void 0)v1r=pYu()||mYu();return v1r}
var w1r,v1r;
var pri=b(()=>{w1r=x(require("fs"))});
export {pYu,mYu,k1r,w1r,v1r,pri};
