// @ts-nocheck
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
function Hft(e,t,n,r){let o=new TCo,s=(c)=>{if(c.length>0)o.push(TeamDeleteToolName(c).slice(1,-1))};o.push('{"content":"'),s("{");let i=!0,a=(c)=>{if(!i)s(",");i=!1,s(TeamDeleteToolName(c)+":")};for(let[c,u]of Object.entries(e)){if(u===void 0)continue;if(t.has(c)&&Array.isArray(u)){a(c),s("[");for(let d=0;d<u.length;d++){if(d>0)s(",");s(TeamDeleteToolName(u[d]))}s("]")}else if(n.has(c)&&u!==null&&typeof u==="object"){a(c),s("{");let d=Object.entries(u);for(let p=0;p<d.length;p++){let[m,f]=d[p]??["",void 0];if(p>0)s(",");if(s(TeamDeleteToolName(m)+":["),Array.isArray(f))for(let h=0;h<f.length;h++){if(h>0)s(",");s(TeamDeleteToolName(f[h]))}s("]")}s("}")}else a(c),s(TeamDeleteToolName(u))}s("}"),o.push('"');let l=r?.extraOuterFields;if(l)for(let[c,u]of Object.entries(l))o.push(`,${TeamDeleteToolName(c)}:${TeamDeleteToolName(u)}`);return o.push("}"),o.toBuffer()}
var TCo;
var SCo=b(()=>{tn();TCo=class TCo{chunks=[];static encoder=new TextEncoder;push(e){if(e.length>0)this.chunks.push(TCo.encoder.encode(e))}toBuffer(){return Buffer.concat(this.chunks)}}});
export {Hft,TCo,SCo};
