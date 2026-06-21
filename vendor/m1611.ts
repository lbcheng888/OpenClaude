// @ts-nocheck
import {mi} from "./m135.ts";
import {b} from "../runtime.ts";
import {ipn} from "./m1606.ts";
function N8s(e){return e.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g,encodeURIComponent)}
var M8s,YMu=(e=N8s)=>function(n,...r){if(n.length===1)return n[0];let o=!1,s=[],i=n.reduce((u,d,p)=>{if(/[?#]/.test(d))o=!0;let m=r[p],f=(o?encodeURIComponent:e)(""+m);if(p!==r.length&&(m==null||typeof m==="object"&&m.toString===Object.getPrototypeOf(Object.getPrototypeOf(m.hasOwnProperty??M8s)??M8s)?.toString))f=m+"",s.push({start:u.length+d.length,length:f.length,error:`Value of type ${Object.prototype.toString.call(m).slice(8,-1)} is not a valid path parameter`});return u+d+(p===r.length?"":f)},""),a=i.split(/[?#]/,1)[0],l=/(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi,c;while((c=l.exec(a))!==null)s.push({start:c.index,length:c[0].length,error:`Value "${c[0]}" can't be safely passed as a path parameter`});if(s.sort((u,d)=>u.start-d.start),s.length>0){let u=0,d=s.reduce((p,m)=>{let f=" ".repeat(m.start-u),A="^".repeat(m.length);return u=m.start+m.length,p+f+A},"");throw new mi(`Path parameters result in path with invalid segments:
${s.map((p)=>p.error).join(`
`)}
${i}
${d}`)}return i},$kr;
var B8s=b(()=>{ipn();M8s=Object.freeze(Object.create(null)),$kr=YMu(N8s)});
export {N8s,M8s,YMu,$kr,B8s};
