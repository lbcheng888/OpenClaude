// @ts-nocheck
import {Ie,vn} from "../src/session/0621_length.ts";
import {b} from "../runtime.ts";
function T$i(){return!1}
async function S$i(){if(!T$i())return;try{return y$i.openSync("/proc/self/exe","r")}catch(e){Ie(Error(`seccomp: failed to open /proc/self/exe: ${e}`));return}}
function b$i(){if(!T$i())return;return{applyPath:`/proc/self/fd/${RGr}`,argv0:"apply-seccomp"}}
var y$i,RGr=3;
var vGr=b(()=>{vn();y$i=require("fs")});
export {T$i,S$i,b$i,y$i,RGr,vGr};
