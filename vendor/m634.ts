// @ts-nocheck
import {jt,jp,ws} from "./m228.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function Zen(e){let{buffer:t,bytesRead:n}=jt().readSync(e,{length:4096});if(n===0)return"utf8";if(n>=2){if(t[0]===255&&t[1]===254)return"utf16le"}if(n>=3&&t[0]===239&&t[1]===187&&t[2]===191)return"utf8";return"utf8"}
function etn(e){let t=0,n=0;for(let r=0;r<e.length;r++)if(e[r]===`
`)if(r>0&&e[r-1]==="\r")t++;else n++;return t>n?"CRLF":"LF"}
function eQ(e){let t=jt(),{resolvedPath:n,isSymlink:r}=jp(t,e);if(r)logForDebugging(`Reading through symlink: ${e} -> ${n}`);let o=Zen(n),s=t.readFileSync(n,{encoding:o}),i=etn(s.slice(0,4096));return{content:s.replaceAll(`\r
`,`
`),encoding:o,lineEndings:i}}
function ER(e){return eQ(e).content}
async function HXo(e){let t=jt(),{resolvedPath:n,isSymlink:r}=jp(t,e);if(r)logForDebugging(`Reading through symlink: ${e} -> ${n}`);let o=Zen(n),s=await t.readFile(n,{encoding:o}),i=etn(s.slice(0,4096));return{content:s.replaceAll(`\r
`,`
`),encoding:o,lineEndings:i}}
var bB=b(()=>{qe();ws()});
export {Zen,etn,eQ,ER,HXo,bB};
