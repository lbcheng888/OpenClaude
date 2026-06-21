// @ts-nocheck
import {tie,RQe} from "./m2234.ts";
import {vve} from "./m2238.ts";
import {formatFileSize,ps} from "./m238.ts";
import {b} from "../runtime.ts";
async function yJa(e,t){let n;try{n=tie()}catch{return null}if(n===null)return null;let r=a4t.resolve(e),o=n.find((c)=>c.scope==="team"&&c.promptIndex!==void 0&&a4t.resolve(a4t.join(t,c.mount,...c.promptIndex.split("/")))===r);if(o===void 0||o.promptIndex===void 0)return null;let s;try{s=(await _Ja.stat(e)).size}catch{return null}let i=o.promptIndexMaxBytes??vve;if(s<i*qFp)return null;let a=s>=i?`over the ${formatFileSize(i)} read limit \u2014 content beyond that is dropped when this index is loaded`:`approaching the ${formatFileSize(i)} read limit`;return`The memory index at ${`team/${o.mount}/${o.promptIndex}`} is ${formatFileSize(s)}, ${a}. Compact it to under ${formatFileSize(Math.floor(i*jFp))} now: keep one line per entry, move detail into topic files, and merge or drop stale entries.`}
var _Ja,a4t,qFp=0.8,jFp=0.7;
var TJa=b(()=>{ps();RQe();_Ja=require("fs/promises"),a4t=require("path")});
export {yJa,_Ja,a4t,qFp,jFp,TJa};
