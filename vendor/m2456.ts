// @ts-nocheck
import {Ds,Iu} from "./m643.ts";
import {dn,bt} from "./m195.ts";
import {allWorkingDirectories,pathInWorkingPath,nA} from "../src/permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {_t,cu} from "./m582.ts";
import {b} from "../runtime.ts";
async function jZe(e,t){if(!e)return{resultType:"emptyPath"};let n=QSn.resolve(Ds(e));try{if(!(await Cwi.stat(n)).isDirectory())return{resultType:"notADirectory",directoryPath:e,absolutePath:n}}catch(o){let s=dn(o);if(s==="ENOENT"||s==="ENOTDIR"||s==="EACCES"||s==="EPERM")return{resultType:"pathNotFound",directoryPath:e,absolutePath:n};throw o}let r=allWorkingDirectories(t);for(let o of r)if(pathInWorkingPath(n,o,{caseFold:!1}))return{resultType:"alreadyInWorkingDirectory",directoryPath:e,workingDir:o};return{resultType:"success",absolutePath:n}}
function WZe(e){switch(e.resultType){case"emptyPath":return"Please provide a directory path.";case"pathNotFound":return`Path ${_t.bold(e.absolutePath)} was not found.`;case"notADirectory":{let t=QSn.dirname(e.absolutePath);return`${_t.bold(e.directoryPath)} is not a directory. Did you mean to add the parent directory ${_t.bold(t)}?`}case"alreadyInWorkingDirectory":return`${_t.bold(e.directoryPath)} is already accessible within the existing working directory ${_t.bold(e.workingDir)}.`;case"success":return`Added ${_t.bold(e.absolutePath)} as a working directory.`}}
var Cwi,QSn;
var ZSn=b(()=>{cu();bt();Iu();nA();Cwi=require("fs/promises"),QSn=require("path")});
export {jZe,WZe,Cwi,QSn,ZSn};
