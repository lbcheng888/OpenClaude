// @ts-nocheck
import {b} from "../runtime.ts";
async function L1a(){let e=new Set,t=O1a.homedir();for(let{path:n,re:r}of[{path:Qlo.join(t,".aws","config"),re:/^\[(?:profile\s+)?([^\]]+)\]/gm},{path:Qlo.join(t,".aws","credentials"),re:/^\[([^\]]+)\]/gm}])try{for(let o of(await P1a.readFile(n,"utf8")).matchAll(r)){let s=o[1]?.trim();if(s&&!s.startsWith("sso-session "))e.add(s)}}catch{}return[...e].sort()}
var P1a,O1a,Qlo;
var M1a=b(()=>{P1a=require("fs/promises"),O1a=require("os"),Qlo=require("path")});
export {L1a,P1a,O1a,Qlo,M1a};
