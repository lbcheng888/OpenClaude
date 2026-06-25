// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {Sn,lr} from "./m233.ts";
import {b} from "../runtime.ts";
function Lqt(e,t){if(!e)return logForDebugging("formatUri called with undefined URI - indicates malformed LSP server response",{level:"warn"}),"<unknown location>";let n=e.replace(/^file:\/\//,"");if(/^\/[A-Za-z]:/.test(n))n=n.slice(1);try{n=decodeURIComponent(n)}catch(r){let o=Ce(r);logForDebugging(`Failed to decode LSP URI '${e}': ${o}. Using un-decoded path: ${n}`,{level:"warn"})}if(t){let r=$Ya.relative(t,n).replaceAll("\\","/");if(r.length<n.length&&!r.startsWith("../../"))return r}return n.replaceAll("\\","/")}
function qYa(e,t){let n=new Map;for(let r of e){let o="uri"in r?r.uri:r.location.uri,s=Lqt(o,t),i=n.get(s);if(i)i.push(r);else n.set(s,[r])}return n}
function a5n(e,t){let n=Lqt(e.uri,t),r=e.range.start.line+1,o=e.range.start.character+1;return`${n}:${r}:${o}`}
function FYa(e){return{uri:e.targetUri,range:e.targetSelectionRange||e.targetRange}}
function BYa(e){return"targetUri"in e}
function x_o(e,t){if(!e)return"No definition found. This may occur if the cursor is not on a symbol, or if the definition is in an external library not indexed by the LSP server.";if(Array.isArray(e)){let r=e.map((a)=>BYa(a)?FYa(a):a),o=r.filter((a)=>!a||!a.uri);if(o.length>0)logForDebugging(`formatGoToDefinitionResult: Filtering out ${o.length} invalid location(s) - this should have been caught earlier`,{level:"warn"});let s=r.filter((a)=>a&&a.uri);if(s.length===0)return"No definition found. This may occur if the cursor is not on a symbol, or if the definition is in an external library not indexed by the LSP server.";if(s.length===1)return`Defined in ${a5n(s[0],t)}`;let i=s.map((a)=>`  ${a5n(a,t)}`).join(`
`);return`Found ${s.length} definitions:
${i}`}let n=BYa(e)?FYa(e):e;return`Defined in ${a5n(n,t)}`}
function WYa(e,t){if(!e||e.length===0)return"No references found. This may occur if the symbol has no usages, or if the LSP server has not fully indexed the workspace.";let n=e.filter((i)=>!i||!i.uri);if(n.length>0)logForDebugging(`formatFindReferencesResult: Filtering out ${n.length} invalid location(s) - this should have been caught earlier`,{level:"warn"});let r=e.filter((i)=>i&&i.uri);if(r.length===0)return"No references found. This may occur if the symbol has no usages, or if the LSP server has not fully indexed the workspace.";if(r.length===1)return`Found 1 reference:
  ${a5n(r[0],t)}`;let o=qYa(r,t),s=[`Found ${r.length} references across ${o.size} files:`];for(let[i,a]of o){s.push(`
${i}:`);for(let l of a){let c=l.range.start.line+1,u=l.range.start.character+1;s.push(`  Line ${c}:${u}`)}}return s.join(`
`)}
function Y2p(e){if(Array.isArray(e))return e.map((t)=>{if(typeof t==="string")return t;return t.value}).join(`

`);if(typeof e==="string")return e;if("kind"in e)return e.value;return e.value}
function GYa(e,t){if(!e)return"No hover information available. This may occur if the cursor is not on a symbol, or if the LSP server has not fully indexed the file.";let n=Y2p(e.contents);if(e.range){let r=e.range.start.line+1,o=e.range.start.character+1;return`Hover info at ${r}:${o}:

${n}`}return n}
function imt(e){return{[1]:"File",[2]:"Module",[3]:"Namespace",[4]:"Package",[5]:"Class",[6]:"Method",[7]:"Property",[8]:"Field",[9]:"Constructor",[10]:"Enum",[11]:"Interface",[12]:"Function",[13]:"Variable",[14]:"Constant",[15]:"String",[16]:"Number",[17]:"Boolean",[18]:"Array",[19]:"Object",[20]:"Key",[21]:"Null",[22]:"EnumMember",[23]:"Struct",[24]:"Event",[25]:"Operator",[26]:"TypeParameter"}[e]||"Unknown"}
function VYa(e,t=0){let n=[],r="  ".repeat(t),o=imt(e.kind),s=`${r}${e.name} (${o})`;if(e.detail)s+=` ${e.detail}`;let i=e.range.start.line+1;if(s+=` - Line ${i}`,n.push(s),e.children&&e.children.length>0)for(let a of e.children)n.push(...VYa(a,t+1));return n}
function KYa(e,t){if(!e||e.length===0)return"No symbols found in document. This may occur if the file is empty, not supported by the LSP server, or if the server has not fully indexed the file.";let n=e[0];if(n&&"location"in n)return D_o(e,t);let o=["Document symbols:"];for(let s of e)o.push(...VYa(s));return o.join(`
`)}
function D_o(e,t){if(!e||e.length===0)return"No symbols found in workspace. This may occur if the workspace is empty, or if the LSP server has not finished indexing the project.";let n=e.filter((i)=>!i||!i.location||!i.location.uri);if(n.length>0)logForDebugging(`formatWorkspaceSymbolResult: Filtering out ${n.length} invalid symbol(s) - this should have been caught earlier`,{level:"warn"});let r=e.filter((i)=>i&&i.location&&i.location.uri);if(r.length===0)return"No symbols found in workspace. This may occur if the workspace is empty, or if the LSP server has not finished indexing the project.";let o=[`Found ${r.length} ${Sn(r.length,"symbol")} in workspace:`],s=qYa(r,t);for(let[i,a]of s){o.push(`
${i}:`);for(let l of a){let c=imt(l.kind),u=l.location.range.start.line+1,d=`  ${l.name} (${c}) - Line ${u}`;if(l.containerName)d+=` in ${l.containerName}`;o.push(d)}}return o.join(`
`)}
function UYa(e,t){if(!e.uri)return logForDebugging("formatCallHierarchyItem: CallHierarchyItem has undefined URI",{level:"warn"}),`${e.name} (${imt(e.kind)}) - <unknown location>`;let n=Lqt(e.uri,t),r=e.range.start.line+1,o=imt(e.kind),s=`${e.name} (${o}) - ${n}:${r}`;if(e.detail)s+=` [${e.detail}]`;return s}
function zYa(e,t){if(!e||e.length===0)return"No call hierarchy item found at this position";if(e.length===1)return`Call hierarchy item: ${UYa(e[0],t)}`;let n=[`Found ${e.length} call hierarchy items:`];for(let r of e)n.push(`  ${UYa(r,t)}`);return n.join(`
`)}
function jYa(e,t){if(!e||e.length===0)return"No incoming calls found (nothing calls this function)";let n=[`Found ${e.length} incoming ${Sn(e.length,"call")}:`],r=new Map;for(let o of e){if(!o.from){logForDebugging("formatIncomingCallsResult: CallHierarchyIncomingCall has undefined from field",{level:"warn"});continue}let s=Lqt(o.from.uri,t),i=r.get(s);if(i)i.push(o);else r.set(s,[o])}for(let[o,s]of r){n.push(`
${o}:`);for(let i of s){if(!i.from)continue;let a=imt(i.from.kind),l=i.from.range.start.line+1,c=`  ${i.from.name} (${a}) - Line ${l}`;if(i.fromRanges&&i.fromRanges.length>0){let u=i.fromRanges.map((d)=>`${d.start.line+1}:${d.start.character+1}`).join(", ");c+=` [calls at: ${u}]`}n.push(c)}}return n.join(`
`)}
function YYa(e,t){if(!e||e.length===0)return"No outgoing calls found (this function calls nothing)";let n=[`Found ${e.length} outgoing ${Sn(e.length,"call")}:`],r=new Map;for(let o of e){if(!o.to){logForDebugging("formatOutgoingCallsResult: CallHierarchyOutgoingCall has undefined to field",{level:"warn"});continue}let s=Lqt(o.to.uri,t),i=r.get(s);if(i)i.push(o);else r.set(s,[o])}for(let[o,s]of r){n.push(`
${o}:`);for(let i of s){if(!i.to)continue;let a=imt(i.to.kind),l=i.to.range.start.line+1,c=`  ${i.to.name} (${a}) - Line ${l}`;if(i.fromRanges&&i.fromRanges.length>0){let u=i.fromRanges.map((d)=>`${d.start.line+1}:${d.start.character+1}`).join(", ");c+=` [called from: ${u}]`}n.push(c)}}return n.join(`
`)}
var $Ya;
var JYa=b(()=>{qe();Ct();lr();$Ya=require("path")});
export {Lqt,qYa,a5n,FYa,BYa,x_o,WYa,Y2p,GYa,imt,VYa,KYa,D_o,UYa,zYa,jYa,YYa,$Ya,JYa};
