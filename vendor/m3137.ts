// @ts-nocheck
import {poe,Iu} from "./m643.ts";
import {v$e,BLt} from "./m3062.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {bt} from "./m195.ts";
import {ws} from "./m228.ts";
function d7r(e){if(poe(e))return!1;for(let n of e.split(/[/\\]/))if(/^\.\. [ .]*$/.test(n))return!1;let t=Ekn.normalize(e);if(Ekn.isAbsolute(t))return!1;return!0}
function E2d(e,t,n=JXi){t.fileCount++;let r;if(t.fileCount>n.MAX_FILE_COUNT)r=`Archive contains too many files: ${t.fileCount} (max: ${n.MAX_FILE_COUNT})`;if(!d7r(e.name))r=`Unsafe file path detected: "${e.name}". Path traversal or absolute paths are not allowed.`;let o=e.originalSize||0;if(o>n.MAX_FILE_SIZE)r=`File "${e.name}" is too large: ${Math.round(o/1024/1024)}MB (max: ${Math.round(n.MAX_FILE_SIZE/1024/1024)}MB)`;if(t.totalUncompressedSize+=o,t.totalUncompressedSize>n.MAX_TOTAL_SIZE)r=`Archive total size is too large: ${Math.round(t.totalUncompressedSize/1024/1024)}MB (max: ${Math.round(n.MAX_TOTAL_SIZE/1024/1024)}MB)`;let s=t.totalUncompressedSize/t.compressedSize;if(s>n.MAX_COMPRESSION_RATIO)r=`Suspicious compression ratio detected: ${s.toFixed(1)}:1 (max: ${n.MAX_COMPRESSION_RATIO}:1). This may be a zip bomb.`;return r?{isValid:!1,error:r}:{isValid:!0}}
async function Oae(e,t=JXi){let{unzipSync:n}=await Promise.resolve().then(() => (v$e(),BLt)),o={fileCount:0,totalUncompressedSize:0,compressedSize:e.length,errors:[]},s=n(new Uint8Array(e),{filter:(i)=>{let a=E2d(i,o,t);if(!a.isValid)throw Error(a.error);return!0}});return logForDebugging(`Zip extraction completed: ${o.fileCount} files, ${Math.round(o.totalUncompressedSize/1024)}KB uncompressed`),s}
function Uxe(e){let t=Buffer.from(e.buffer,e.byteOffset,e.byteLength),n={},r=Math.max(0,t.length-22-65535),o=-1;for(let a=t.length-22;a>=r;a--)if(t.readUInt32LE(a)===101010256){o=a;break}if(o<0)return n;let s=t.readUInt16LE(o+10),i=t.readUInt32LE(o+16);for(let a=0;a<s;a++){if(i+46>t.length||t.readUInt32LE(i)!==33639248)break;let l=t.readUInt16LE(i+4),c=t.readUInt16LE(i+28),u=t.readUInt16LE(i+30),d=t.readUInt16LE(i+32),p=t.readUInt32LE(i+38),m=t.toString("utf8",i+46,i+46+c);if(l>>8===3){let f=p>>>16&65535;if(f)n[m]=f}i+=46+c+u+d}return n}
var Ekn,JXi;
var H$e=b(()=>{qe();bt();ws();Iu();Ekn=require("path"),JXi={MAX_FILE_SIZE:536870912,MAX_TOTAL_SIZE:1073741824,MAX_FILE_COUNT:1e5,MAX_COMPRESSION_RATIO:50}});
export {d7r,E2d,Oae,Uxe,Ekn,JXi,H$e};
