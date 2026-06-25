// @ts-nocheck
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
import {fDt,SUe} from "../src/permissions/2218_surface.ts";
import {mn,He,Pt} from "../src/telemetry/0600_feature_name.ts";
import {qe,logForDebugging} from "../src/config/0236_setHasFormattedOutput.ts";
import {HA,HF,bUe} from "./m2219.ts";
import {vn,Ie} from "../src/session/0621_length.ts";
import {Xq,n6,$ce,kft} from "../src/agent/5220_bigint.ts";
import {IGn} from "./m4454.ts";
var y6l,T6l;
var S6l=b(()=>{Wi();fDt();mn();qe();HA();vn();Xq();IGn();y6l=require("path"),T6l=Hn(async(e)=>{try{let n=(await n6("output-styles",e)).map(({filePath:r,frontmatter:o,content:s,source:i,baseDir:a})=>{try{SUe("output-style",o);let c=y6l.basename(r).replace(/\.md$/,""),u=(o.name!=null?String(o.name):void 0)||c,d=HF(o.description,c)??$ce(s,`Custom ${c} output style`),p=bUe(o["keep-coding-instructions"]);if(o["force-for-plugin"]!==void 0)logForDebugging(`Output style "${u}" has force-for-plugin set, but this option only applies to plugin output styles. Ignoring.`,{level:"warn"});return{name:u,description:d,prompt:s.trim(),source:i,baseDir:a,keepCodingInstructions:p}}catch(l){return Ie(l),null}}).filter((r)=>r!==null).sort(kft);return He("output_style_load"),n}catch(t){return Pt("output_style_load","output_style_load_failed"),logForDebugging(`Failed to load output styles: ${t instanceof Error?t.message:String(t)}`,{level:"error"}),[]}})});
export {y6l,T6l,S6l};
