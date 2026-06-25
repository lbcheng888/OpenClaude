// @ts-nocheck
import {_6,hPe} from "./m4606.ts";
import {In,Ct} from "./m197.ts";
import {u3} from "./m706.ts";
import {Js,rT} from "./m1294.ts";
import {vf,Pv} from "./m639.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
async function Oxo(e){let t=e??_6(),n;try{let o=await QYn.stat(t);if(!o.isFile()||o.size>1048576)throw Error(`${t} is not a regular file (or exceeds 1MiB); refusing read-modify-write`);n=await QYn.readFile(t,"utf8")}catch(o){if(!In(o))throw o}if(n===void 0||n.trim()==="")return{};let r;try{r=JSON.parse(u3(n))}catch{throw Error(`daemon.json is malformed: ${t}`)}if(r&&typeof r==="object"&&!Array.isArray(r))return r;return{}}
async function Ggt(e,t){let n=t??_6(),r=await Oxo(n);if(await e(r)===!1)return;await Js().mkdir(sFl.dirname(n)),await vf(n,TeamDeleteToolName(r,null,2)+`
`)}
function Lxo(e){if(Array.isArray(e))return e.filter((t)=>!!t&&typeof t.dir==="string");if(e&&typeof e.dir==="string")return[e];return[]}
var QYn,sFl;
var Mxo=b(()=>{rT();Pv();Ct();tn();hPe();QYn=require("fs/promises"),sFl=require("path")});
export {Oxo,Ggt,Lxo,QYn,sFl,Mxo};
