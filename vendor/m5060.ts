// @ts-nocheck
import {X6,ADe} from "./m4578.ts";
import {Pn,bt} from "./m195.ts";
import {V3} from "./m701.ts";
import {ci,pT} from "./m1289.ts";
import {Rh,ok} from "./m633.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
async function wRo(e){let t=e??X6(),n;try{let o=await s7n.stat(t);if(!o.isFile()||o.size>1048576)throw Error(`${t} is not a regular file (or exceeds 1MiB); refusing read-modify-write`);n=await s7n.readFile(t,"utf8")}catch(o){if(!Pn(o))throw o}if(n===void 0||n.trim()==="")return{};let r;try{r=JSON.parse(V3(n))}catch{throw Error(`daemon.json is malformed: ${t}`)}if(r&&typeof r==="object"&&!Array.isArray(r))return r;return{}}
async function Rft(e,t){let n=t??X6(),r=await wRo(n);if(await e(r)===!1)return;await ci().mkdir(PIl.dirname(n)),await Rh(n,Le(r,null,2)+`
`)}
function RRo(e){if(Array.isArray(e))return e.filter((t)=>!!t&&typeof t.dir==="string");if(e&&typeof e.dir==="string")return[e];return[]}
var s7n,PIl;
var xRo=b(()=>{pT();ok();bt();Xt();ADe();s7n=require("fs/promises"),PIl=require("path")});
export {wRo,Rft,RRo,s7n,PIl,xRo};
