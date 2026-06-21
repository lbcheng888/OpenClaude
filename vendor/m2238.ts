// @ts-nocheck
import {RA,z_n,Ev} from "./m2211.ts";
import {b} from "../runtime.ts";
var Nw="MEMORY.md",rie=200,vve=25000,cZ="This directory already exists \u2014 write to it directly with the Write tool (do not run mkdir or check for its existence).",YHt="Both directories already exist \u2014 write to them directly with the Write tool (do not run mkdir or check for their existence).";
function yyn(e,t){let{frontmatter:n,content:r}=RA(e,t);return{frontmatter:zQu(n),body:r}}
function Thi(e,t){let n=Object.fromEntries([["node_type",VQu],...Object.entries(e.metadata).filter(([s])=>s!=="node_type")].filter(([,s])=>s!=null)),r={name:YQu(e.name??""),...e.description!==null?{description:e.description}:{},metadata:n},o=t.replace(/^\n+/,"");return`---
${z_n(r)}---

${o}`}
function Tyn(e){return["```markdown","---","name: {{short-kebab-case-slug}}","description: {{one-line summary \u2014 used to decide relevance in future conversations, so be specific}}","metadata:",`  type: {{${e.join(", ")}}}`,"---","","{{memory content \u2014 for feedback/project types, structure as: rule/fact, then **Why:** and **How to apply:** lines. Link related memories with [[their-name]].}}","```","",...DBr]}
var WQu,GQu,VQu="memory",IBr=(e)=>typeof e==="string"&&e.length>0?e:null,KQu=(e)=>typeof e==="object"&&e!==null&&!Array.isArray(e),zQu=(e)=>{let t=KQu(e.metadata)?e.metadata:{},n=Object.entries(e).reduce((r,[o,s])=>{if(WQu.includes(o)||s==null)return r;return r[o]=s,r},{});return{name:IBr(e.name),description:IBr(e.description),metadata:Object.freeze({...n,...t})}},OFe=(e,t)=>IBr(e.metadata[t]),yhi=(e,t)=>({...e,metadata:Object.freeze({...e.metadata,...t})}),YQu=(e)=>GQu.test(e)?e:e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),DBr;
var JHt=b(()=>{Ev();WQu=["name","description","metadata"],GQu=/^[a-z0-9_-]+$/;DBr=["In the body, link to related memories with `[[name]]`, where `name` is the other memory's `name:` slug. Link liberally \u2014 a `[[name]]` that doesn't match an existing memory yet is fine; it marks something worth writing later, not an error."]});
export {Nw,rie,vve,cZ,YHt,yyn,Thi,Tyn,WQu,GQu,VQu,IBr,KQu,zQu,OFe,yhi,YQu,DBr,JHt};
