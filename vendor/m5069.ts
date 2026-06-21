// @ts-nocheck
import {JT,ube,utn,QT} from "./m642.ts";
import {Qut,S3n} from "./m4217.ts";
import {b} from "../runtime.ts";
async function t0l(e,t={}){let n=JT(e);if(!n)return;let r=await ube(n,t.dir);if(!r)return;let o=await utn(r.filePath);if(!o)return;return Qut(n,o,r.projectPath)??void 0}
var n0l=b(()=>{S3n();QT()});
export {t0l,n0l};
