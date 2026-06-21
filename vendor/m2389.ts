// @ts-nocheck
import {uCi,dCi} from "./m2384.ts";
import {BaseBox,LZ} from "./m2387.ts";
import {BaseText,mUe} from "./m2388.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
import {gCi} from "./m2386.ts";
function Vid(e){return e.includes("$bunfs")||e.includes("~BUN")||e.includes("/snapshot/")||e.startsWith("node:")}
function Kid(e){return e.some(({value:t})=>t.length>Gid)}
function bCi(){return zid??=new W2r.default({cwd:process.cwd(),internals:W2r.default.nodeInternals()})}
function G2r({error:e}){let t=e.stack?e.stack.split(`
`).slice(1):void 0,n=t?bCi().parseLine(t[0]):void 0,r=SCi(n?.file),o,s=0;if(r&&n?.line&&!Vid(r))try{let i=ECi.readFileSync(r,"utf8");if(o=uCi(i,n.line),o&&Kid(o))o=void 0;if(o)for(let{line:a}of o)s=Math.max(s,String(a).length)}catch{}return w0.default.createElement(BaseBox,{flexDirection:"column",padding:1},w0.default.createElement(BaseBox,null,w0.default.createElement(BaseText,{backgroundColor:"ansi:red",color:"ansi:white"}," ","ERROR"," "),w0.default.createElement(BaseText,null," ",e.message)),n&&r&&w0.default.createElement(BaseBox,{marginTop:1},w0.default.createElement(BaseText,{dim:!0},r,":",n.line,":",n.column)),n&&o&&w0.default.createElement(BaseBox,{marginTop:1,flexDirection:"column"},o.map(({line:i,value:a})=>w0.default.createElement(BaseBox,{key:i},w0.default.createElement(BaseBox,{width:s+1},w0.default.createElement(BaseText,{dim:i!==n.line,backgroundColor:i===n.line?"ansi:red":void 0,color:i===n.line?"ansi:white":void 0},String(i).padStart(s," "),":")),w0.default.createElement(BaseText,{key:i,backgroundColor:i===n.line?"ansi:red":void 0,color:i===n.line?"ansi:white":void 0}," "+a)))),e.stack&&w0.default.createElement(BaseBox,{marginTop:1,flexDirection:"column"},e.stack.split(`
`).slice(1).map((i)=>{let a=bCi().parseLine(i);if(!a)return w0.default.createElement(BaseBox,{key:i},w0.default.createElement(BaseText,{dim:!0},"- "),w0.default.createElement(BaseText,{bold:!0},i));return w0.default.createElement(BaseBox,{key:i},w0.default.createElement(BaseText,{dim:!0},"- "),w0.default.createElement(BaseText,{bold:!0},a.function),w0.default.createElement(BaseText,{dim:!0}," ","(",SCi(a.file)??"",":",a.line,":",a.column,")"))})))}
var ECi,w0,W2r,SCi=(e)=>e?.replace(`file://${process.cwd()}/`,""),Gid=200,zid;
var CCi=b(()=>{dCi();LZ();mUe();ECi=require("fs"),w0=M(Te(),1),W2r=M(gCi(),1)});
export {Vid,Kid,bCi,G2r,ECi,w0,W2r,SCi,Gid,zid,CCi};
