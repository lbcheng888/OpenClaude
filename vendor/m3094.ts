// @ts-nocheck
import {Q} from "../runtime.ts";
var bst=Q((oZg,zta)=>{function s8d(e,{EOL:t=`
`,finalEOL:n=!0,replacer:r=null,spaces:o}={}){let s=n?t:"";return JSON.stringify(e,r,o).replace(/\n/g,t)+s}function i8d(e){if(Buffer.isBuffer(e))e=e.toString("utf8");return e.replace(/^\uFEFF/,"")}zta.exports={stringify:s8d,stripBom:i8d}});
export {bst};
