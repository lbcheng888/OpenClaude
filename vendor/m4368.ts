// @ts-nocheck
import {Kc,Ufe,Jm} from "../src/config/2207_Jm.ts";
import {gE,nie,tz} from "./m2246.ts";
import {PUe,rz} from "../src/config/2253_displayName.ts";
import {S8n,KTo} from "./m4367.ts";
import {nu,lr} from "./m233.ts";
import {b} from "../runtime.ts";
async function Vnl(e){if(!Kc())return null;if(!(I6t.resolve(e)===I6t.resolve(Ufe())||I6t.basename(e)===gE&&PUe(e)))return null;let n;try{n=await Gnl.readFile(e,"utf8")}catch{return null}let r=n.trim();return S8n({label:"memory index",displayPath:gE,sizeBytes:r.length,byteCap:nie,lineCount:nu(r,`
`)+1,lineCap:tz})}
var Gnl,I6t;
var Knl=b(()=>{Jm();rz();lr();KTo();Gnl=require("fs/promises"),I6t=require("path")});
export {Vnl,Gnl,I6t,Knl};
