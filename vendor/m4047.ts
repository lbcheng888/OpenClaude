// @ts-nocheck
import {VI,Uu,dr} from "./m231.ts";
import {sG,CIe,N2n,vce} from "../src/telemetry/4046_oldStart.ts";
import {d7,Atn,mc} from "../src/config/0645_maxBytes.ts";
import {jfe,ty} from "./m2245.ts";
import {ynt} from "./m2760.ts";
import {N$e,Kxe} from "../src/config/3156_maxSizeBytes.ts";
import {Ds,Iu} from "./m643.ts";
import {yd,YA,ng} from "./m132.ts";
import {plo,cUa} from "./m4046.ts";
import {Pn,Se,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {W2e} from "./m2761.ts";
function uUa(e){return e.replaceAll(hlo,"'").replaceAll(F2n,"'").replaceAll(glo,'"').replaceAll(_lo,'"')}
function ylo(e){let t=e.split(/(\r\n|\n|\r)/),n="";for(let r=0;r<t.length;r++){let o=t[r];if(o!==void 0)if(r%2===0)n+=o.replace(/\s+$/,"");else n+=o}return n}
function flo(e){return e.replace(/(\\\\)|\\u([0-9a-fA-F]{4})/g,(t,n,r)=>n!==void 0?t:String.fromCharCode(parseInt(r,16)))}
function dUa(e){let t="";for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r>=128){t+="\\\\u";for(let o of r.toString(16).padStart(4,"0"))t+=o>="a"?`[${o}${o.toUpperCase()}]`:o}else t+=VI(e[n])}return t}
function pUa(e){return Tlo.test(e)||Slo.test(e)}
function mUa(e,t,n){if(e===t)return n;if(Slo.test(e)&&new RegExp(`^${dUa(e)}$`).test(t)){let r=new Map,o=0,s=0;for(let i=0,a=0;i<e.length;i++){let l=e.charCodeAt(i);if(l>=128){let c=t.slice(a+2,a+6);r.set(l,c);for(let u of c)if(u>="a"&&u<="f")s++;else if(u>="A"&&u<="F")o++;a+=6}else a+=1}return n.replace(/[\u0080-\uffff]/g,(i)=>{let a=i.charCodeAt(0),l=r.get(a);if(l!==void 0)return"\\u"+l;let c=a.toString(16).padStart(4,"0");return"\\u"+(o>s?c.toUpperCase():c)})}if(Tlo.test(e)&&flo(e)===t)return flo(n);return n}
function vIe(e,t){if(e.includes(t))return t;let n=uUa(t),o=uUa(e).indexOf(n);if(o!==-1)return e.substring(o,o+t.length);if(Tlo.test(t)){let s=flo(t);if(s!==t&&e.includes(s))return s}if(Slo.test(t)){let s=e.match(new RegExp(dUa(t)));if(s)return s[0]}return null}
function Wct(e,t,n){if(e===t)return n;let r=t.includes(glo)||t.includes(_lo),o=t.includes(hlo)||t.includes(F2n);if(!r&&!o)return n;let s=n;if(r)s=qvp(s);if(o)s=jvp(s);return s}
function fUa(e,t){if(t===0)return!0;let n=e[t-1];return n===" "||n==="\t"||n===`
`||n==="\r"||n==="("||n==="["||n==="{"||n==="\u2014"||n==="\u2013"}
function qvp(e){let t=[...e],n=[];for(let r=0;r<t.length;r++)if(t[r]==='"')n.push(fUa(t,r)?glo:_lo);else n.push(t[r]);return n.join("")}
function jvp(e){let t=[...e],n=[];for(let r=0;r<t.length;r++)if(t[r]==="'"){let o=r>0?t[r-1]:void 0,s=r<t.length-1?t[r+1]:void 0,i=o!==void 0&&/\p{L}/u.test(o),a=s!==void 0&&/\p{L}/u.test(s);if(i&&a)n.push(F2n);else n.push(fUa(t,r)?hlo:F2n)}else n.push(t[r]);return n.join("")}
function AUa(e,t,n,r=!1){let o=r?(i,a,l)=>i.replaceAll(a,()=>l):(i,a,l)=>i.replace(a,()=>l);if(n!=="")return o(e,t,n);return!t.endsWith(`
`)&&e.includes(t+`
`)?o(e,t+`
`,n):o(e,t,n)}
function L$t({filePath:e,fileContents:t,oldString:n,newString:r,replaceAll:o=!1}){return blo({filePath:e,fileContents:t,edits:[{old_string:n,new_string:r,replace_all:o}]})}
function blo({filePath:e,fileContents:t,edits:n}){if(hUa(t,n))return{patch:sG({filePath:e,fileContents:t,edits:[{old_string:t,new_string:t,replace_all:!1}]}),updatedFile:""};let r=Alo(t,n);return{patch:CIe({filePath:e,oldContent:d7(t),newContent:d7(r)}),updatedFile:r}}
function hUa(e,t){return!e&&t.length===1&&t[0]!==void 0&&t[0].old_string===""&&t[0].new_string===""}
function Alo(e,t){if(hUa(e,t))return"";let n=e,r=[];for(let o of t){let s=o.old_string.replace(/\n+$/,"");for(let a of r)if(s!==""&&a.includes(s))throw Error("Cannot edit file: old_string is a substring of a new_string from a previous edit.");let i=n;if(n=o.old_string===""?o.new_string:AUa(n,o.old_string,o.new_string,o.replace_all),n===i)throw new jfe("String not found in file. Failed to apply edit.");r.push(o.new_string)}if(n===e)throw Error("Original and edited file match exactly. Failed to apply edit.");return n}
function gUa(e,t){let n=ynt("file.txt","file.txt",e,t,void 0,void 0,{context:8,timeout:N2n});if(!n)return"";let r=N$e(),o=n.hunks.map((d)=>({startLine:d.oldStart,content:d.lines.filter((p)=>!p.startsWith("-")&&!p.startsWith("\\")).map((p)=>p.slice(1)).join(`
`),tabAwareSeparator:r})).map(Atn).join(`
...
`);if(o.length<=mlo)return o;let s=o.lastIndexOf(`
`,mlo),i=s>0?o.slice(0,s):o.slice(0,mlo),a=1,l=1,u=Uu(o,`
`,i.length+a)+l;return`${i}

... [${u} lines truncated] ...`}
function _Ua(e){return e.map((t)=>{let n=[],r=[],o=[];for(let s of t.lines)if(s.startsWith(" "))n.push(s.slice(1)),r.push(s.slice(1)),o.push(s.slice(1));else if(s.startsWith("-"))r.push(s.slice(1));else if(s.startsWith("+"))o.push(s.slice(1));return{old_string:r.join(`
`),new_string:o.join(`
`),replace_all:!1}})}
function Gvp(e){let t=e,n=[];for(let[r,o]of Object.entries(Wvp)){let s=t;if(t=t.replaceAll(r,o),s!==t)n.push({from:r,to:o})}return{result:t,appliedReplacements:n}}
function yUa({file_path:e,edits:t}){if(t.length===0)return{file_path:e,edits:t};let n=/\.(md|mdx)$/i.test(e);try{let r=Ds(e);if((yd(e)||yd(r))&&!(YA(e)||YA(r)))return{file_path:e,edits:t};let o=plo(r);return{file_path:e,edits:t.map(({old_string:s,new_string:i,replace_all:a})=>{let l=n?i:ylo(i);if(o.includes(s))return{old_string:s,new_string:l,replace_all:a};let{result:c,appliedReplacements:u}=Gvp(s);if(o.includes(c)){let d=l;for(let{from:p,to:m}of u)d=d.replaceAll(p,m);return{old_string:c,new_string:d,replace_all:a}}return{old_string:s,new_string:l,replace_all:a}})}}catch(r){if(!Pn(r))logForDebugging(`Failed to read ${e} for edit normalization: ${r instanceof Error?r.message:String(r)}`,{level:"error"})}return{file_path:e,edits:t}}
function Vvp(e,t,n){if(e.length===t.length&&e.every((a,l)=>{let c=t[l];return c!==void 0&&a.old_string===c.old_string&&a.new_string===c.new_string&&a.replace_all===c.replace_all}))return!0;let r=null,o=null,s=null,i=null;try{r=Alo(n,e)}catch(a){o=Se(a)}try{s=Alo(n,t)}catch(a){i=Se(a)}if(o!==null&&i!==null)return o===i;if(o!==null||i!==null)return!1;return r===s}
function TUa(e,t){if(e.file_path!==t.file_path)return!1;if(e.edits.length===t.edits.length&&e.edits.every((r,o)=>{let s=t.edits[o];return s!==void 0&&r.old_string===s.old_string&&r.new_string===s.new_string&&r.replace_all===s.replace_all}))return!0;let n="";if(!yd(e.file_path)||YA(e.file_path))try{n=plo(e.file_path)}catch(r){if(!Pn(r))throw r}return Vvp(e.edits,t.edits,n)}
var hlo="\u2018",F2n="\u2019",glo="\u201C",_lo="\u201D",Tlo,Slo,mlo=8192,Wvp;
var wIe=b(()=>{W2e();Iu();dr();ng();qe();vce();bt();mc();cUa();Kxe();ty();Tlo=/\\u[0-9a-fA-F]{4}/,Slo=/[\u0080-\uffff]/;Wvp={"<fnr>":"<function_results>","<n>":"<name>","</n>":"</name>","<o>":"<output>","</o>":"</output>","<e>":"<error>","</e>":"</error>","<s>":"<system>","</s>":"</system>","<r>":"<result>","</r>":"</result>","< META_START >":"<META_START>","< META_END >":"<META_END>","< EOT >":"<EOT>","< META >":"<META>","< SOS >":"<SOS>","\n\nH:":`

Human:`,"\n\nA:":`

Assistant:`}});
export {uUa,ylo,flo,dUa,pUa,mUa,vIe,Wct,fUa,qvp,jvp,AUa,L$t,blo,hUa,Alo,gUa,_Ua,Gvp,yUa,Vvp,TUa,hlo,F2n,glo,_lo,Tlo,Slo,mlo,Wvp,wIe};
