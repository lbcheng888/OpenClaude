// @ts-nocheck
import {b} from "../runtime.ts";
function B_n(e,t){let n=e.toLowerCase();for(let r of t)if(typeof r==="string"&&r.length>0&&n.includes(r.toLowerCase()))return!0;return!1}
function CK(e){let t=e.toLowerCase().replace(/\u0131/g,"i").replace(/\u017f/g,"s");return t.replace(/[\u200c-\u200f\u202a-\u202e\u206a-\u206f\ufeff]/g,"").replace(/:.*$/,"").replace(/[. ]+$/,"")||t}
function mve(e,t,n){let r=e.slice(t.length).split(Ffi.sep),o=r.length-1;for(let s=0;s<r.length;s++){let i=CK(r[s]);if(rXu.has(i))return!0;if(s===o&&n?.has(i))return!0}return!1}
var Ffi,rXu;
var F_n=b(()=>{Ffi=require("path"),rXu=new Set([".git","hooks",".husky",".githooks","node_modules",".vscode",".idea","head","config","objects","refs",".claude","skills","commands","agents",".cargo",".devcontainer",".yarn",".mvn"])});
export {B_n,CK,mve,Ffi,rXu,F_n};
