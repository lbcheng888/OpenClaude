// @ts-nocheck
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
function kpt(e,t,n,r){let o=new C_o,s=(c)=>{if(c.length>0)o.push(Le(c).slice(1,-1))};o.push('{"content":"'),s("{");let i=!0,a=(c)=>{if(!i)s(",");i=!1,s(Le(c)+":")};for(let[c,u]of Object.entries(e)){if(u===void 0)continue;if(t.has(c)&&Array.isArray(u)){a(c),s("[");for(let d=0;d<u.length;d++){if(d>0)s(",");s(Le(u[d]))}s("]")}else if(n.has(c)&&u!==null&&typeof u==="object"){a(c),s("{");let d=Object.entries(u);for(let p=0;p<d.length;p++){let[m,f]=d[p]??["",void 0];if(p>0)s(",");if(s(Le(m)+":["),Array.isArray(f))for(let A=0;A<f.length;A++){if(A>0)s(",");s(Le(f[A]))}s("]")}s("}")}else a(c),s(Le(u))}s("}"),o.push('"');let l=r?.extraOuterFields;if(l)for(let[c,u]of Object.entries(l))o.push(`,${Le(c)}:${Le(u)}`);return o.push("}"),o.toBuffer()}
var C_o;
var v_o=b(()=>{Xt();C_o=class C_o{chunks=[];static encoder=new TextEncoder;push(e){if(e.length>0)this.chunks.push(C_o.encoder.encode(e))}toBuffer(){return Buffer.concat(this.chunks)}}});
export {kpt,C_o,v_o};
