// @ts-nocheck
import {xf,Ibn,HA} from "./m2219.ts";
import {b} from "../runtime.ts";
var gE="MEMORY.md",tz=200,nie=25000,oZ="This directory already exists \u2014 write to it directly with the Write tool (do not run mkdir or check for its existence).",RDt="Both directories already exist \u2014 write to them directly with the Write tool (do not run mkdir or check for their existence).";
function nEn(e,t){let{frontmatter:n,content:r}=xf(e,t);return{frontmatter:ycd(n),body:r}}
function bEi(e,t){let n=Object.fromEntries([["node_type",gcd],...Object.entries(e.metadata).filter(([s])=>s!=="node_type")].filter(([,s])=>s!=null)),r={name:Tcd(e.name??""),...e.description!==null?{description:e.description}:{},metadata:n},o=t.replace(/^\n+/,"");return`---
${Ibn(r)}---

${o}`}
function rEn(e){return["```markdown","---","name: {{short-kebab-case-slug}}","description: {{one-line summary \u2014 used to decide relevance in future conversations, so be specific}}","metadata:",`  type: {{${e.join(", ")}}}`,"---","","{{memory content \u2014 for feedback/project types, structure as: rule/fact, then **Why:** and **How to apply:** lines. Link related memories with [[their-name]].}}","```","",...c9r]}
var fcd,hcd,gcd="memory",l9r=(e)=>typeof e==="string"&&e.length>0?e:null,_cd=(e)=>typeof e==="object"&&e!==null&&!Array.isArray(e),ycd=(e)=>{let t=_cd(e.metadata)?e.metadata:{},n=Object.entries(e).reduce((r,[o,s])=>{if(fcd.includes(o)||s==null)return r;return r[o]=s,r},{});return{name:l9r(e.name),description:l9r(e.description),metadata:Object.freeze({...n,...t})}},xUe=(e,t)=>l9r(e.metadata[t]),SEi=(e,t)=>({...e,metadata:Object.freeze({...e.metadata,...t})}),Tcd=(e)=>hcd.test(e)?e:e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),c9r;
var vDt=b(()=>{HA();fcd=["name","description","metadata"],hcd=/^[a-z0-9_-]+$/;c9r=["In the body, link to related memories with `[[name]]`, where `name` is the other memory's `name:` slug. Link liberally \u2014 a `[[name]]` that doesn't match an existing memory yet is fine; it marks something worth writing later, not an error."]});
export {gE,tz,nie,oZ,RDt,nEn,bEi,rEn,fcd,hcd,gcd,l9r,_cd,ycd,xUe,SEi,Tcd,c9r,vDt};
