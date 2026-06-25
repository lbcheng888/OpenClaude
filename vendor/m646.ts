// @ts-nocheck
import {b} from "../runtime.ts";
function rRt(e,t){if(e.type!=="user")return;if(e.isMeta===!0||e.isCompactSummary===!0)return;let n=e.message;if(!n)return;let r=n.content,o=[];if(typeof r==="string")o.push(r);else if(Array.isArray(r))for(let s of r){if(!s||typeof s!=="object")continue;if(s.type==="tool_result")return;if(s.type==="text"&&typeof s.text==="string")o.push(s.text)}for(let s of o){let i=s.replaceAll(`
`," ").trim();if(!i)continue;let a=Bou.exec(i);if(a){if(!t.commandFallback)t.commandFallback=a[1];continue}let l=/<bash-input>([\s\S]*?)<\/bash-input>/.exec(i);if(l)return`! ${l[1].trim()}`;if(Fou.test(i))continue;if(i.length>200)i=i.slice(0,200).trim()+"\u2026";return i}return}
var Fou,Bou;
var Pyr=b(()=>{Fou=/^(?:\s*<[a-z][\w-]*[\s>]|\[Request interrupted by user[^\]]*\])/,Bou=/<command-name>(.*?)<\/command-name>/});
export {rRt,Fou,Bou,Pyr};
