// @ts-nocheck
import {X} from "../runtime.ts";
var grt=X((Ajh,eYi)=>{function CBd(e,{EOL:t=`
`,finalEOL:n=!0,replacer:r=null,spaces:o}={}){let s=n?t:"";return JSON.stringify(e,r,o).replace(/\n/g,t)+s}function vBd(e){if(Buffer.isBuffer(e))e=e.toString("utf8");return e.replace(/^\uFEFF/,"")}eYi.exports={stringify:CBd,stripBom:vBd}});
export {grt};
