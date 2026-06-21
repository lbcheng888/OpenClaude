// @ts-nocheck
import {b} from "../runtime.ts";
async function dIa(){let e=new Set,t=uIa.homedir();for(let{path:n,re:r}of[{path:poo.join(t,".aws","config"),re:/^\[(?:profile\s+)?([^\]]+)\]/gm},{path:poo.join(t,".aws","credentials"),re:/^\[([^\]]+)\]/gm}])try{for(let o of(await cIa.readFile(n,"utf8")).matchAll(r)){let s=o[1]?.trim();if(s&&!s.startsWith("sso-session "))e.add(s)}}catch{}return[...e].sort()}
var cIa,uIa,poo;
var pIa=b(()=>{cIa=require("fs/promises"),uIa=require("os"),poo=require("path")});
export {dIa,cIa,uIa,poo,pIa};
