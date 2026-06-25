// @ts-nocheck
import {hs,Tu} from "./m649.ts";
import {cn,Ct} from "./m197.ts";
import {allWorkingDirectories,pathInWorkingPath,Xm} from "../src/permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {bt,Gc} from "./m588.ts";
import {b} from "../runtime.ts";
async function Vtt(e,t){if(!e)return{resultType:"emptyPath"};let n=BAn.resolve(hs(e));try{if(!(await Wxi.stat(n)).isDirectory())return{resultType:"notADirectory",directoryPath:e,absolutePath:n}}catch(o){let s=cn(o);if(s==="ENOENT"||s==="ENOTDIR"||s==="EACCES"||s==="EPERM")return{resultType:"pathNotFound",directoryPath:e,absolutePath:n};throw o}let r=allWorkingDirectories(t);for(let o of r)if(pathInWorkingPath(n,o,{caseFold:!1}))return{resultType:"alreadyInWorkingDirectory",directoryPath:e,workingDir:o};return{resultType:"success",absolutePath:n}}
function Ktt(e){switch(e.resultType){case"emptyPath":return"Please provide a directory path.";case"pathNotFound":return`Path ${bt.bold(e.absolutePath)} was not found.`;case"notADirectory":{let t=BAn.dirname(e.absolutePath);return`${bt.bold(e.directoryPath)} is not a directory. Did you mean to add the parent directory ${bt.bold(t)}?`}case"alreadyInWorkingDirectory":return`${bt.bold(e.directoryPath)} is already accessible within the existing working directory ${bt.bold(e.workingDir)}.`;case"success":return`Added ${bt.bold(e.absolutePath)} as a working directory.`}}
var Wxi,BAn;
var UAn=b(()=>{Gc();Ct();Tu();Xm();Wxi=require("fs/promises"),BAn=require("path")});
export {Vtt,Ktt,Wxi,BAn,UAn};
