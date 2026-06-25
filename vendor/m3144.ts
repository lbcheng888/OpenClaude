// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {uxn} from "./m3141.ts";
import {lS} from "./m3065.ts";
import {initExtension,kYr} from "./m3071.ts";
import {validateManifest,$Jr} from "./m3143.ts";
import {McpbManifestSchema,CURRENT_MANIFEST_VERSION,oNt} from "./m3070.ts";
import {readMcpbIgnorePatterns,getAllFilesWithCount,nJr} from "./m3073.ts";
import {zipSync,k9e} from "./m3072.ts";
import {SYr} from "./m3069.ts";
var Moa={};
ft(Moa,{packExtension:()=>packExtension});
function xNt(e){if(e<1024)return`${e}B`;else if(e<1048576)return`${(e/1024).toFixed(1)}kB`;else return`${(e/1048576).toFixed(1)}MB`}
function eVd(e){return e.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-_.]/g,"").replace(/-+/g,"-").replace(/^-+|-+$/g,"").substring(0,100)}
async function packExtension({extensionPath:e,outputPath:t,silent:n}){let r=RW.resolve(e),o=uxn({silent:n});if(!Eee.existsSync(r)||!Eee.statSync(r).isDirectory())return o.error(`ERROR: Directory not found: ${e}`),!1;let s=RW.join(r,"manifest.json");if(!Eee.existsSync(s))if(o.log(`No manifest.json found in ${e}`),await lS({message:"Would you like to create a manifest.json file?",default:!0})){if(!await initExtension(e))return o.error("ERROR: Failed to create manifest"),!1}else return o.error("ERROR: Cannot pack extension without manifest.json"),!1;if(o.log("Validating manifest..."),!validateManifest(s))return o.error("ERROR: Cannot pack extension with invalid manifest"),!1;let i;try{let d=Eee.readFileSync(s,"utf-8"),p=JSON.parse(d);i=McpbManifestSchema.parse(p)}catch(d){if(o.error("ERROR: Failed to parse manifest.json"),d instanceof Error)o.error(`  ${d.message}`);return!1}let a=i.manifest_version||i.dxt_version;if(a!==CURRENT_MANIFEST_VERSION)return o.error(`ERROR: Manifest version mismatch. Expected "${CURRENT_MANIFEST_VERSION}", found "${a}"`),o.error(`  Please update the manifest_version in your manifest.json to "${CURRENT_MANIFEST_VERSION}"`),!1;let l=RW.basename(r),c=t?RW.resolve(t):RW.resolve(`${l}.mcpb`),u=RW.join(c,"..");Eee.mkdirSync(u,{recursive:!0});try{let d=readMcpbIgnorePatterns(r),{files:p,ignoredCount:m}=getAllFilesWithCount(r,r,{},d);o.log(`
\uD83D\uDCE6  ${i.name}@${i.version}`),o.log("Archive Contents");let f=Object.entries(p),h=0;f.sort(([H],[k])=>H.localeCompare(k));let g=new Map,_=[];for(let[H,k]of f){let I=RW.relative(r,H),D=k.data,O=typeof D==="string"?Buffer.byteLength(D,"utf8"):D.length;h+=O;let L=I.split(RW.sep);if(L.length>3){let P=L.slice(0,3).join("/");if(!g.has(P))g.set(P,{files:[],totalSize:0});let M=g.get(P);M.files.push(I),M.totalSize+=O}else _.push({path:I,size:O})}for(let{path:H,size:k}of _)o.log(`${xNt(k).padStart(8)} ${H}`);for(let[H,{files:k,totalSize:I}]of g)if(k.length===1){let D=k[0],O=I;o.log(`${xNt(O).padStart(8)} ${D}`)}else o.log(`${xNt(I).padStart(8)} ${H}/ [and ${k.length} more files]`);let T={},y=!0;for(let[H,k]of Object.entries(p))if(y)T[H]=[k.data,{os:3,attrs:(k.mode&511)<<16}];else T[H]=k.data;let S=zipSync(T,{level:9,mtime:new Date});Eee.writeFileSync(c,S);let E=Noa.createHash("sha1").update(S).digest("hex"),w=`${eVd(i.name)}-${i.version}.mcpb`;return o.log(`
Archive Details`),o.log(`name: ${i.name}`),o.log(`version: ${i.version}`),o.log(`filename: ${w}`),o.log(`package size: ${xNt(S.length)}`),o.log(`unpacked size: ${xNt(h)}`),o.log(`shasum: ${E}`),o.log(`total files: ${f.length}`),o.log(`ignored (.mcpbignore) files: ${m}`),o.log(`
Output: ${c}`),!0}catch(d){if(d instanceof Error)o.error(`ERROR: Archive error: ${d.message}`);else o.error("ERROR: Unknown archive error occurred");return!1}}
var Noa,Eee,RW;
var qJr=b(()=>{SYr();k9e();nJr();$Jr();oNt();kYr();Noa=require("crypto"),Eee=require("fs"),RW=require("path")});
export {Moa,xNt,eVd,packExtension,Noa,Eee,RW,qJr};
