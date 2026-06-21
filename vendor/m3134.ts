// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Skn} from "./m3131.ts";
import {fS} from "./m3055.ts";
import {initExtension,KGr} from "./m3061.ts";
import {validateManifest,i7r} from "./m3133.ts";
import {McpbManifestSchema,CURRENT_MANIFEST_VERSION,HLt} from "./m3060.ts";
import {readMcpbIgnorePatterns,getAllFilesWithCount,SVr} from "./m3063.ts";
import {zipSync,v$e} from "./m3062.ts";
import {FGr} from "./m3059.ts";
var jXi={};
isFullscreenWithTTY(jXi,{packExtension:()=>packExtension});
function rMt(e){if(e<1024)return`${e}B`;else if(e<1048576)return`${(e/1024).toFixed(1)}kB`;else return`${(e/1048576).toFixed(1)}MB`}
function y2d(e){return e.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-_.]/g,"").replace(/-+/g,"-").replace(/^-+|-+$/g,"").substring(0,100)}
async function packExtension({extensionPath:e,outputPath:t,silent:n}){let r=lW.resolve(e),o=Skn({silent:n});if(!wee.existsSync(r)||!wee.statSync(r).isDirectory())return o.error(`ERROR: Directory not found: ${e}`),!1;let s=lW.join(r,"manifest.json");if(!wee.existsSync(s))if(o.log(`No manifest.json found in ${e}`),await fS({message:"Would you like to create a manifest.json file?",default:!0})){if(!await initExtension(e))return o.error("ERROR: Failed to create manifest"),!1}else return o.error("ERROR: Cannot pack extension without manifest.json"),!1;if(o.log("Validating manifest..."),!validateManifest(s))return o.error("ERROR: Cannot pack extension with invalid manifest"),!1;let i;try{let d=wee.readFileSync(s,"utf-8"),p=JSON.parse(d);i=McpbManifestSchema.parse(p)}catch(d){if(o.error("ERROR: Failed to parse manifest.json"),d instanceof Error)o.error(`  ${d.message}`);return!1}let a=i.manifest_version||i.dxt_version;if(a!==CURRENT_MANIFEST_VERSION)return o.error(`ERROR: Manifest version mismatch. Expected "${CURRENT_MANIFEST_VERSION}", found "${a}"`),o.error(`  Please update the manifest_version in your manifest.json to "${CURRENT_MANIFEST_VERSION}"`),!1;let l=lW.basename(r),c=t?lW.resolve(t):lW.resolve(`${l}.mcpb`),u=lW.join(c,"..");wee.mkdirSync(u,{recursive:!0});try{let d=readMcpbIgnorePatterns(r),{files:p,ignoredCount:m}=getAllFilesWithCount(r,r,{},d);o.log(`
\uD83D\uDCE6  ${i.name}@${i.version}`),o.log("Archive Contents");let f=Object.entries(p),A=0;f.sort(([k],[x])=>k.localeCompare(x));let h=new Map,g=[];for(let[k,x]of f){let H=lW.relative(r,k),I=x.data,P=typeof I==="string"?Buffer.byteLength(I,"utf8"):I.length;A+=P;let L=H.split(lW.sep);if(L.length>3){let D=L.slice(0,3).join("/");if(!h.has(D))h.set(D,{files:[],totalSize:0});let N=h.get(D);N.files.push(H),N.totalSize+=P}else g.push({path:H,size:P})}for(let{path:k,size:x}of g)o.log(`${rMt(x).padStart(8)} ${k}`);for(let[k,{files:x,totalSize:H}]of h)if(x.length===1){let I=x[0],P=H;o.log(`${rMt(P).padStart(8)} ${I}`)}else o.log(`${rMt(H).padStart(8)} ${k}/ [and ${x.length} more files]`);let _={},y=!0;for(let[k,x]of Object.entries(p))if(y)_[k]=[x.data,{os:3,attrs:(x.mode&511)<<16}];else _[k]=x.data;let T=zipSync(_,{level:9,mtime:new Date});wee.writeFileSync(c,T);let S=WXi.createHash("sha1").update(T).digest("hex"),R=`${y2d(i.name)}-${i.version}.mcpb`;return o.log(`
Archive Details`),o.log(`name: ${i.name}`),o.log(`version: ${i.version}`),o.log(`filename: ${R}`),o.log(`package size: ${rMt(T.length)}`),o.log(`unpacked size: ${rMt(A)}`),o.log(`shasum: ${S}`),o.log(`total files: ${f.length}`),o.log(`ignored (.mcpbignore) files: ${m}`),o.log(`
Output: ${c}`),!0}catch(d){if(d instanceof Error)o.error(`ERROR: Archive error: ${d.message}`);else o.error("ERROR: Unknown archive error occurred");return!1}}
var WXi,wee,lW;
var a7r=b(()=>{FGr();v$e();SVr();i7r();HLt();KGr();WXi=require("crypto"),wee=require("fs"),lW=require("path")});
export {jXi,rMt,y2d,packExtension,WXi,wee,lW,a7r};
