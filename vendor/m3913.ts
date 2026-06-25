// @ts-nocheck
import {mk,nu,lr} from "./m233.ts";
import {pG,W0e,k$n,oce} from "../src/telemetry/3912_oldStart.ts";
import {FK,Jrn,Xl} from "../src/config/0651_maxBytes.ts";
import {ehe,ry} from "./m2253.ts";
import {Aot} from "./m2772.ts";
import {V9e,MHe} from "../src/config/3172_maxSizeBytes.ts";
import {hs,Tu} from "./m649.ts";
import {lu,Cf,zf} from "./m133.ts";
import {Suo,_Ba} from "./m3912.ts";
import {In,Ce,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {J$e} from "./m2773.ts";
function yBa(e){return e.replaceAll(Auo,"'").replaceAll(I$n,"'").replaceAll(Ruo,'"').replaceAll(vuo,'"')}
function wuo(e){let t=e.split(/(\r\n|\n|\r)/),n="";for(let r=0;r<t.length;r++){let o=t[r];if(o!==void 0)if(r%2===0)n+=o.replace(/\s+$/,"");else n+=o}return n}
function Euo(e){return e.replace(/(\\\\)|\\u([0-9a-fA-F]{4})/g,(t,n,r)=>n!==void 0?t:String.fromCharCode(parseInt(r,16)))}
function TBa(e){let t="";for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r>=128){t+="\\\\u";for(let o of r.toString(16).padStart(4,"0"))t+=o>="a"?`[${o}${o.toUpperCase()}]`:o}else t+=mk(e[n])}return t}
function SBa(e){return kuo.test(e)||Huo.test(e)}
function bBa(e,t,n){if(e===t)return n;if(Huo.test(e)&&new RegExp(`^${TBa(e)}$`).test(t)){let r=new Map,o=0,s=0;for(let i=0,a=0;i<e.length;i++){let l=e.charCodeAt(i);if(l>=128){let c=t.slice(a+2,a+6);r.set(l,c);for(let u of c)if(u>="a"&&u<="f")s++;else if(u>="A"&&u<="F")o++;a+=6}else a+=1}return n.replace(/[\u0080-\uffff]/g,(i)=>{let a=i.charCodeAt(0),l=r.get(a);if(l!==void 0)return"\\u"+l;let c=a.toString(16).padStart(4,"0");return"\\u"+(o>s?c.toUpperCase():c)})}if(kuo.test(e)&&Euo(e)===t)return Euo(n);return n}
function G0e(e,t){if(e.includes(t))return t;let n=yBa(t),o=yBa(e).indexOf(n);if(o!==-1)return e.substring(o,o+t.length);if(kuo.test(t)){let s=Euo(t);if(s!==t&&e.includes(s))return s}if(Huo.test(t)){let s=e.match(new RegExp(TBa(t)));if(s)return s[0]}return null}
function Fut(e,t,n){if(e===t)return n;let r=t.includes(Ruo)||t.includes(vuo),o=t.includes(Auo)||t.includes(I$n);if(!r&&!o)return n;let s=n;if(r)s=ekp(s);if(o)s=tkp(s);return s}
function EBa(e,t){if(t===0)return!0;let n=e[t-1];return n===" "||n==="\t"||n===`
`||n==="\r"||n==="("||n==="["||n==="{"||n==="\u2014"||n==="\u2013"}
function ekp(e){let t=[...e],n=[];for(let r=0;r<t.length;r++)if(t[r]==='"')n.push(EBa(t,r)?Ruo:vuo);else n.push(t[r]);return n.join("")}
function tkp(e){let t=[...e],n=[];for(let r=0;r<t.length;r++)if(t[r]==="'"){let o=r>0?t[r-1]:void 0,s=r<t.length-1?t[r+1]:void 0,i=o!==void 0&&/\p{L}/u.test(o),a=s!==void 0&&/\p{L}/u.test(s);if(i&&a)n.push(I$n);else n.push(EBa(t,r)?Auo:I$n)}else n.push(t[r]);return n.join("")}
function CBa(e,t,n,r=!1){let o=r?(i,a,l)=>i.replaceAll(a,()=>l):(i,a,l)=>i.replace(a,()=>l);if(n!=="")return o(e,t,n);return!t.endsWith(`
`)&&e.includes(t+`
`)?o(e,t+`
`,n):o(e,t,n)}
function Y9t({filePath:e,fileContents:t,oldString:n,newString:r,replaceAll:o=!1}){return Iuo({filePath:e,fileContents:t,edits:[{old_string:n,new_string:r,replace_all:o}]})}
function Iuo({filePath:e,fileContents:t,edits:n}){if(ABa(t,n))return{patch:pG({filePath:e,fileContents:t,edits:[{old_string:t,new_string:t,replace_all:!1}]}),updatedFile:""};let r=Cuo(t,n);return{patch:W0e({filePath:e,oldContent:FK(t),newContent:FK(r)}),updatedFile:r}}
function ABa(e,t){return!e&&t.length===1&&t[0]!==void 0&&t[0].old_string===""&&t[0].new_string===""}
function Cuo(e,t){if(ABa(e,t))return"";let n=e,r=[];for(let o of t){let s=o.old_string.replace(/\n+$/,"");for(let a of r)if(s!==""&&a.includes(s))throw Error("Cannot edit file: old_string is a substring of a new_string from a previous edit.");let i=n;if(n=o.old_string===""?o.new_string:CBa(n,o.old_string,o.new_string,o.replace_all),n===i)throw new ehe("String not found in file. Failed to apply edit.");r.push(o.new_string)}if(n===e)throw Error("Original and edited file match exactly. Failed to apply edit.");return n}
function RBa(e,t){let n=Aot("file.txt","file.txt",e,t,void 0,void 0,{context:8,timeout:k$n});if(!n)return"";let r=V9e(),o=n.hunks.map((d)=>({startLine:d.oldStart,content:d.lines.filter((p)=>!p.startsWith("-")&&!p.startsWith("\\")).map((p)=>p.slice(1)).join(`
`),tabAwareSeparator:r})).map(Jrn).join(`
...
`);if(o.length<=buo)return o;let s=o.lastIndexOf(`
`,buo),i=s>0?o.slice(0,s):o.slice(0,buo),a=1,l=1,u=nu(o,`
`,i.length+a)+l;return`${i}

... [${u} lines truncated] ...`}
function vBa(e){return e.map((t)=>{let n=[],r=[],o=[];for(let s of t.lines)if(s.startsWith(" "))n.push(s.slice(1)),r.push(s.slice(1)),o.push(s.slice(1));else if(s.startsWith("-"))r.push(s.slice(1));else if(s.startsWith("+"))o.push(s.slice(1));return{old_string:r.join(`
`),new_string:o.join(`
`),replace_all:!1}})}
function rkp(e){let t=e,n=[];for(let[r,o]of Object.entries(nkp)){let s=t;if(t=t.replaceAll(r,o),s!==t)n.push({from:r,to:o})}return{result:t,appliedReplacements:n}}
function wBa({file_path:e,edits:t}){if(t.length===0)return{file_path:e,edits:t};let n=/\.(md|mdx)$/i.test(e);try{let r=hs(e);if((lu(e)||lu(r))&&!(Cf(e)||Cf(r)))return{file_path:e,edits:t};let o=Suo(r);return{file_path:e,edits:t.map(({old_string:s,new_string:i,replace_all:a})=>{let l=n?i:wuo(i);if(o.includes(s))return{old_string:s,new_string:l,replace_all:a};let{result:c,appliedReplacements:u}=rkp(s);if(o.includes(c)){let d=l;for(let{from:p,to:m}of u)d=d.replaceAll(p,m);return{old_string:c,new_string:d,replace_all:a}}return{old_string:s,new_string:l,replace_all:a}})}}catch(r){if(!In(r))logForDebugging(`Failed to read ${e} for edit normalization: ${r instanceof Error?r.message:String(r)}`,{level:"error"})}return{file_path:e,edits:t}}
function okp(e,t,n){if(e.length===t.length&&e.every((a,l)=>{let c=t[l];return c!==void 0&&a.old_string===c.old_string&&a.new_string===c.new_string&&a.replace_all===c.replace_all}))return!0;let r=null,o=null,s=null,i=null;try{r=Cuo(n,e)}catch(a){o=Ce(a)}try{s=Cuo(n,t)}catch(a){i=Ce(a)}if(o!==null&&i!==null)return o===i;if(o!==null||i!==null)return!1;return r===s}
function kBa(e,t){if(e.file_path!==t.file_path)return!1;if(e.edits.length===t.edits.length&&e.edits.every((r,o)=>{let s=t.edits[o];return s!==void 0&&r.old_string===s.old_string&&r.new_string===s.new_string&&r.replace_all===s.replace_all}))return!0;let n="";if(!lu(e.file_path)||Cf(e.file_path))try{n=Suo(e.file_path)}catch(r){if(!In(r))throw r}return okp(e.edits,t.edits,n)}
var Auo="\u2018",I$n="\u2019",Ruo="\u201C",vuo="\u201D",kuo,Huo,buo=8192,nkp;
var V0e=b(()=>{J$e();Tu();lr();zf();qe();oce();Ct();Xl();_Ba();MHe();ry();kuo=/\\u[0-9a-fA-F]{4}/,Huo=/[\u0080-\uffff]/;nkp={"<fnr>":"<function_results>","<n>":"<name>","</n>":"</name>","<o>":"<output>","</o>":"</output>","<e>":"<error>","</e>":"</error>","<s>":"<system>","</s>":"</system>","<r>":"<result>","</r>":"</result>","< META_START >":"<META_START>","< META_END >":"<META_END>","< EOT >":"<EOT>","< META >":"<META>","< SOS >":"<SOS>","\n\nH:":`

Human:`,"\n\nA:":`

Assistant:`}});
export {yBa,wuo,Euo,TBa,SBa,bBa,G0e,Fut,EBa,ekp,tkp,CBa,Y9t,Iuo,ABa,Cuo,RBa,vBa,rkp,wBa,okp,kBa,Auo,I$n,Ruo,vuo,kuo,Huo,buo,nkp,V0e};
