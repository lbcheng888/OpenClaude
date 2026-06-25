// @ts-nocheck
import {b,x} from "../runtime.ts";
import {wUe} from "./m2236.ts";
function readMcpbIgnorePatterns(e){let t=Iae.join(e,".mcpbignore");if(!yj.existsSync(t))return[];try{return yj.readFileSync(t,"utf-8").split(/\r?\n/).map((r)=>r.trim()).filter((r)=>r.length>0&&!r.startsWith("#"))}catch(n){return console.warn(`Warning: Could not read .mcpbignore file: ${n instanceof Error?n.message:"Unknown error"}`),[]}}
function tJr(e){return Cea.default().add(EXCLUDE_PATTERNS).add(e)}
function shouldExclude(e,t=[]){return tJr(t).ignores(e)}
function getAllFiles(e,t=e,n={},r=[]){let o=yj.readdirSync(e),s=tJr(r);for(let i of o){let a=Iae.join(e,i),l=Iae.relative(t,a);if(s.ignores(l))continue;if(yj.statSync(a).isDirectory())getAllFiles(a,t,n,r);else{let u=l.split(Iae.sep).join("/");n[u]=yj.readFileSync(a)}}return n}
function getAllFilesWithCount(e,t=e,n={},r=[],o=0){let s=yj.readdirSync(e),i=tJr(r);for(let a of s){let l=Iae.join(e,a),c=Iae.relative(t,l);if(i.ignores(c)){o++;continue}let u=yj.statSync(l);if(u.isDirectory())o=getAllFilesWithCount(l,t,n,r,o).ignoredCount;else{let d=c.split(Iae.sep).join("/");n[d]={data:yj.readFileSync(l),mode:u.mode}}}return{files:n,ignoredCount:o}}
var yj,Cea,Iae,EXCLUDE_PATTERNS;
var nJr=b(()=>{yj=require("fs"),Cea=x(wUe(),1),Iae=require("path"),EXCLUDE_PATTERNS=[".DS_Store","Thumbs.db",".gitignore",".git",".mcpbignore","*.log",".env*",".npm",".npmrc",".yarnrc",".yarn",".eslintrc",".editorconfig",".prettierrc",".prettierignore",".eslintignore",".nycrc",".babelrc",".pnp.*","node_modules/.cache","node_modules/.bin","*.map",".env.local",".env.*.local","npm-debug.log*","yarn-debug.log*","yarn-error.log*","package-lock.json","yarn.lock","*.mcpb","*.d.ts","*.tsbuildinfo","tsconfig.json"]});
export {readMcpbIgnorePatterns,tJr,shouldExclude,getAllFiles,getAllFilesWithCount,yj,Cea,Iae,EXCLUDE_PATTERNS,nJr};
