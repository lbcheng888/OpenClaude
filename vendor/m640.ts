// @ts-nocheck
import {Wt,Nd,ps} from "./m230.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function Orn(e){let{buffer:t,bytesRead:n}=Wt().readSync(e,{length:4096});if(n===0)return"utf8";if(n>=2){if(t[0]===255&&t[1]===254)return"utf16le"}if(n>=3&&t[0]===239&&t[1]===187&&t[2]===191)return"utf8";return"utf8"}
function Lrn(e){let t=0,n=0;for(let r=0;r<e.length;r++)if(e[r]===`
`)if(r>0&&e[r-1]==="\r")t++;else n++;return t>n?"CRLF":"LF"}
function XX(e){let t=Wt(),{resolvedPath:n,isSymlink:r}=Nd(t,e);if(r)logForDebugging(`Reading through symlink: ${e} -> ${n}`);let o=Orn(n),s=t.readFileSync(n,{encoding:o}),i=Lrn(s.slice(0,4096));return{content:s.replaceAll(`\r
`,`
`),encoding:o,lineEndings:i}}
function Ov(e){return XX(e).content}
async function wrs(e){let t=Wt(),{resolvedPath:n,isSymlink:r}=Nd(t,e);if(r)logForDebugging(`Reading through symlink: ${e} -> ${n}`);let o=Orn(n),s=await t.readFile(n,{encoding:o}),i=Lrn(s.slice(0,4096));return{content:s.replaceAll(`\r
`,`
`),encoding:o,lineEndings:i}}
var GN=b(()=>{qe();ps()});
export {Orn,Lrn,XX,Ov,wrs,GN};
