// @ts-nocheck
import {b,M} from "../runtime.ts";
function Kqu(){try{return XDr.default.statSync("/.dockerenv"),!0}catch{return!1}}
function zqu(){try{return XDr.default.readFileSync("/proc/self/cgroup","utf8").includes("docker")}catch{return!1}}
function QDr(){if(JDr===void 0)JDr=Kqu()||zqu();return JDr}
var XDr,JDr;
var gXs=b(()=>{XDr=M(require("fs"))});
export {Kqu,zqu,QDr,XDr,JDr,gXs};
