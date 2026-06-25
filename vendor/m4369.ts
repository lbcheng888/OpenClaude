// @ts-nocheck
import {eie,ket} from "./m2242.ts";
import {nie} from "./m2246.ts";
import {S8n,KTo} from "./m4367.ts";
import {b} from "../runtime.ts";
async function jnl(e,t){let n;try{n=eie()}catch{return null}if(n===null)return null;let r=x6t.resolve(e),o=n.find((a)=>a.scope==="team"&&a.promptIndex!==void 0&&x6t.resolve(x6t.join(t,a.mount,...a.promptIndex.split("/")))===r);if(o===void 0||o.promptIndex===void 0)return null;let s;try{s=(await znl.stat(e)).size}catch{return null}let i=o.promptIndexMaxBytes??nie;return S8n({label:"memory index",displayPath:`team/${o.mount}/${o.promptIndex}`,sizeBytes:s,byteCap:i})}
var znl,x6t;
var Ynl=b(()=>{ket();KTo();znl=require("fs/promises"),x6t=require("path")});
export {jnl,znl,x6t,Ynl};
