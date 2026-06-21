// @ts-nocheck
import {X} from "../runtime.ts";
var w5i=X((n3h,v5i)=>{function lOd(e){let n={className:"string",begin:"\\$.{1}"},r={className:"symbol",begin:"#"+e.UNDERSCORE_IDENT_RE};return{name:"Smalltalk",aliases:["st"],keywords:"self super nil true false thisContext",contains:[e.COMMENT('"','"'),e.APOS_STRING_MODE,{className:"type",begin:"\\b[A-Z][A-Za-z0-9_]*",relevance:0},{begin:"[a-z][a-zA-Z0-9_]*:",relevance:0},e.C_NUMBER_MODE,r,n,{begin:"\\|[ ]*[a-z][a-zA-Z0-9_]*([ ]+[a-z][a-zA-Z0-9_]*)*[ ]*\\|",returnBegin:!0,end:/\|/,illegal:/\S/,contains:[{begin:"(\\|[ ]*)?[a-z][a-zA-Z0-9_]*"}]},{begin:"#\\(",end:"\\)",contains:[e.APOS_STRING_MODE,n,e.C_NUMBER_MODE,r]}]}}v5i.exports=lOd});
export {w5i};
