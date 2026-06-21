// @ts-nocheck
import {b} from "../runtime.ts";
function Ubt(e){let t=e.slice(e.lastIndexOf(".")).toLowerCase();return yJc.has(t)}
function Yfr(e){let t=Math.min(e.length,TJc),n=0;for(let r=0;r<t;r++){let o=e[r];if(o===0)return!0;if(o<32&&o!==9&&o!==10&&o!==13)n++}return n/t>0.1}
var yJc,TJc=8192;
var Htn=b(()=>{yJc=new Set([".png",".jpg",".jpeg",".gif",".bmp",".ico",".webp",".tiff",".tif",".mp4",".mov",".avi",".mkv",".webm",".wmv",".flv",".m4v",".mpeg",".mpg",".mp3",".wav",".ogg",".flac",".aac",".m4a",".wma",".aiff",".opus",".zip",".tar",".gz",".bz2",".7z",".rar",".xz",".z",".tgz",".iso",".exe",".dll",".so",".dylib",".bin",".o",".a",".obj",".lib",".app",".msi",".deb",".rpm",".pdf",".doc",".docx",".xls",".xlsx",".ppt",".pptx",".odt",".ods",".odp",".ttf",".otf",".woff",".woff2",".eot",".pyc",".pyo",".class",".jar",".war",".ear",".node",".wasm",".rlib",".sqlite",".sqlite3",".db",".mdb",".idx",".psd",".ai",".eps",".sketch",".fig",".xd",".blend",".3ds",".max",".swf",".fla",".lockb",".dat",".data"])});
export {Ubt,Yfr,yJc,TJc,Htn};
