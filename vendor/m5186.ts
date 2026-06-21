// @ts-nocheck
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
import {UHt,EFe} from "../src/permissions/2210_surface.ts";
import {ln,Ie,isTmuxControlMode} from "../src/telemetry/0594_feature_name.ts";
import {qe,logForDebugging} from "../src/config/0234_setHasFormattedOutput.ts";
import {Ev,iF,CFe} from "./m2211.ts";
import {Rn,De} from "../src/session/0615_length.ts";
import {D6,N6,Gce,xpt} from "../src/agent/5186_bigint.ts";
import {ujn} from "./m4432.ts";
var DBl,PBl;
var OBl=b(()=>{ta();UHt();ln();qe();Ev();Rn();D6();ujn();DBl=require("path"),PBl=wn(async(e)=>{try{let n=(await N6("output-styles",e)).map(({filePath:r,frontmatter:o,content:s,source:i,baseDir:a})=>{try{EFe("output-style",o);let c=DBl.basename(r).replace(/\.md$/,""),u=(o.name!=null?String(o.name):void 0)||c,d=iF(o.description,c)??Gce(s,`Custom ${c} output style`),p=CFe(o["keep-coding-instructions"]);if(o["force-for-plugin"]!==void 0)logForDebugging(`Output style "${u}" has force-for-plugin set, but this option only applies to plugin output styles. Ignoring.`,{level:"warn"});return{name:u,description:d,prompt:s.trim(),source:i,baseDir:a,keepCodingInstructions:p}}catch(l){return De(l),null}}).filter((r)=>r!==null).sort(xpt);return Ie("output_style_load"),n}catch(t){return isTmuxControlMode("output_style_load","output_style_load_failed"),logForDebugging(`Failed to load output styles: ${t instanceof Error?t.message:String(t)}`,{level:"error"}),[]}})});
export {DBl,PBl,OBl};
