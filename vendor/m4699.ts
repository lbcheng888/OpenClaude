// @ts-nocheck
import {loadAllPlugins,path} from "../src/agent/4467_resolvePluginRoot.ts";
import {gxn,PNt,yT,$O,Hst,V4} from "./m3150.ts";
import {YJr,IHe} from "../src/config/3152_i.ts";
import {M9e,fxn,wst} from "./m3149.ts";
import {Ce,Ct} from "./m197.ts";
import {vWt,awo} from "./m4698.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
async function wWt(e){let{enabled:t,disabled:n}=await loadAllPlugins();return gxn([...t,...n],e)}
function Som(e){return Object.keys(PNt(e)).length>0||YJr(e).length>0}
async function P7n(e,t){let n=await wWt(e);if(!n||!Som(n))return null;return{type:"plugin-options",plugin:n,pluginId:e,depNote:t?.suffix??"",alreadyInstalled:!0,depsResolved:t?.changed??!1}}
function O7n(e){let t=gbl.c(11),{viewState:n,onFinish:r}=e,{plugin:o,pluginId:s,depNote:i,alreadyInstalled:a,depsResolved:l}=n,c=a?"Already installed":"Installed",u=!a||Boolean(l),d;if(t[0]!==a||t[1]!==u||t[2]!==i||t[3]!==r||t[4]!==o||t[5]!==c)d=(m,f,h)=>{e:switch(m){case"configured":{let g=Boolean(h),_=u||g;r(`\u2713 ${g?a?"Configured":"Installed and configured":c} ${yT(o)}${i}.${_?" Run /reload-plugins to apply.":""}`,_);break e}case"skipped":{let g=u||Boolean(h);r(`\u2713 ${c} ${yT(o)}${i}.${g?" Run /reload-plugins to apply.":""}`,g);break e}case"error":r(`${c} but failed to save config: ${f}`,u||Boolean(h))}},t[0]=a,t[1]=u,t[2]=i,t[3]=r,t[4]=o,t[5]=c,t[6]=d;else d=t[6];let p;if(t[7]!==o||t[8]!==s||t[9]!==d)p=cwo.jsx(lwo,{plugin:o,pluginId:s,onDone:d}),t[7]=o,t[8]=s,t[9]=d,t[10]=p;else p=t[10];return p}
function lwo({plugin:e,pluginId:t,onDone:n}){let[r]=EPe.useState(()=>{let u=[],d=PNt(e);if(Object.keys(d).length>0)u.push({key:"top-level",title:`Configure ${yT(e)}`,subtitle:"Plugin options",schema:d,load:()=>$O(t),save:(m)=>Hst(t,m,e.manifest.userConfig)});let p=YJr(e);for(let m of p)u.push({key:`channel:${m.server}`,title:`Configure ${m.displayName}`,subtitle:`Plugin: ${yT(e)}`,schema:m.configSchema,load:()=>M9e(t,m.server)??void 0,save:(f)=>fxn(t,m.server,f,m.configSchema)});return u}),[o,s]=EPe.useState(0),i=EPe.useRef(!1),a=EPe.useRef(n);if(a.current=n,EPe.useEffect(()=>{if(r.length===0)a.current("skipped")},[r.length]),r.length===0)return null;let l=r[o];async function c(u){try{await l.save(u)}catch(p){n("error",Ce(p),i.current);return}if(Object.keys(u).length>0)i.current=!0;let d=o+1;if(d<r.length)s(d);else n("configured",void 0,i.current)}return cwo.jsx(vWt,{title:l.title,subtitle:l.subtitle,configSchema:l.schema,initialValues:l.load(),onSave:c,onCancel:()=>n("skipped",void 0,i.current)},l.key)}
var gbl,EPe,cwo;
var L7n=b(()=>{Ct();wst();IHe();path();V4();awo();gbl=x(tt(),1),EPe=x(et(),1),cwo=x(oe(),1)});
export {wWt,Som,P7n,O7n,lwo,gbl,EPe,cwo,L7n};
