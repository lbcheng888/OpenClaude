// @ts-nocheck
import {b,M} from "../runtime.ts";
import {HFe} from "./m2228.ts";
function readMcpbIgnorePatterns(e){let t=Iae.join(e,".mcpbignore");if(!qz.existsSync(t))return[];try{return qz.readFileSync(t,"utf-8").split(/\r?\n/).map((r)=>r.trim()).filter((r)=>r.length>0&&!r.startsWith("#"))}catch(n){return console.warn(`Warning: Could not read .mcpbignore file: ${n instanceof Error?n.message:"Unknown error"}`),[]}}
function TVr(e){return HKi.default().add(EXCLUDE_PATTERNS).add(e)}
function shouldExclude(e,t=[]){return TVr(t).ignores(e)}
function getAllFiles(e,t=e,n={},r=[]){let o=qz.readdirSync(e),s=TVr(r);for(let i of o){let a=Iae.join(e,i),l=Iae.relative(t,a);if(s.ignores(l))continue;if(qz.statSync(a).isDirectory())getAllFiles(a,t,n,r);else{let u=l.split(Iae.sep).join("/");n[u]=qz.readFileSync(a)}}return n}
function getAllFilesWithCount(e,t=e,n={},r=[],o=0){let s=qz.readdirSync(e),i=TVr(r);for(let a of s){let l=Iae.join(e,a),c=Iae.relative(t,l);if(i.ignores(c)){o++;continue}let u=qz.statSync(l);if(u.isDirectory())o=getAllFilesWithCount(l,t,n,r,o).ignoredCount;else{let d=c.split(Iae.sep).join("/");n[d]={data:qz.readFileSync(l),mode:u.mode}}}return{files:n,ignoredCount:o}}
var qz,HKi,Iae,EXCLUDE_PATTERNS;
var SVr=b(()=>{qz=require("fs"),HKi=M(HFe(),1),Iae=require("path"),EXCLUDE_PATTERNS=[".DS_Store","Thumbs.db",".gitignore",".git",".mcpbignore","*.log",".env*",".npm",".npmrc",".yarnrc",".yarn",".eslintrc",".editorconfig",".prettierrc",".prettierignore",".eslintignore",".nycrc",".babelrc",".pnp.*","node_modules/.cache","node_modules/.bin","*.map",".env.local",".env.*.local","npm-debug.log*","yarn-debug.log*","yarn-error.log*","package-lock.json","yarn.lock","*.mcpb","*.d.ts","*.tsbuildinfo","tsconfig.json"]});
export {readMcpbIgnorePatterns,TVr,shouldExclude,getAllFiles,getAllFilesWithCount,qz,HKi,Iae,EXCLUDE_PATTERNS,SVr};
