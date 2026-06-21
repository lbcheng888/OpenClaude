// @ts-nocheck
import {loadAllPlugins,gg} from "../src/agent/4445_resolvePluginRoot.ts";
import {Rkn,sMt,ET,bL,vrt,Hq} from "./m3140.ts";
import {f7r,qxe} from "../src/config/3142_i.ts";
import {P$e,vkn,Ert} from "./m3139.ts";
import {Se,bt} from "./m195.ts";
import {sjt,KSo} from "./m4669.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
async function ajt(e){let{enabled:t,disabled:n}=await loadAllPlugins();return Rkn([...t,...n],e)}
function _Yp(e){return Object.keys(sMt(e)).length>0||f7r(e).length>0}
async function X5n(e,t){let n=await ajt(e);if(!n||!_Yp(n))return null;return{type:"plugin-options",plugin:n,pluginId:e,depNote:t?.suffix??"",alreadyInstalled:!0,depsResolved:t?.changed??!1}}
function Q5n(e){let t=Cml.c(11),{viewState:n,onFinish:r}=e,{plugin:o,pluginId:s,depNote:i,alreadyInstalled:a,depsResolved:l}=n,c=a?"Already installed":"Installed",u=!a||Boolean(l),d;if(t[0]!==a||t[1]!==u||t[2]!==i||t[3]!==r||t[4]!==o||t[5]!==c)d=(m,f,A)=>{e:switch(m){case"configured":{let h=Boolean(A),g=u||h;r(`\u2713 ${h?a?"Configured":"Installed and configured":c} ${ET(o)}${i}.${g?" Run /reload-plugins to apply.":""}`,g);break e}case"skipped":{let h=u||Boolean(A);r(`\u2713 ${c} ${ET(o)}${i}.${h?" Run /reload-plugins to apply.":""}`,h);break e}case"error":r(`${c} but failed to save config: ${f}`,u||Boolean(A))}},t[0]=a,t[1]=u,t[2]=i,t[3]=r,t[4]=o,t[5]=c,t[6]=d;else d=t[6];let p;if(t[7]!==o||t[8]!==s||t[9]!==d)p=ijt.createElement(zSo,{plugin:o,pluginId:s,onDone:d}),t[7]=o,t[8]=s,t[9]=d,t[10]=p;else p=t[10];return p}
function zSo({plugin:e,pluginId:t,onDone:n}){let[r]=vDe.useState(()=>{let u=[],d=sMt(e);if(Object.keys(d).length>0)u.push({key:"top-level",title:`Configure ${ET(e)}`,subtitle:"Plugin options",schema:d,load:()=>bL(t),save:(m)=>vrt(t,m,e.manifest.userConfig)});let p=f7r(e);for(let m of p)u.push({key:`channel:${m.server}`,title:`Configure ${m.displayName}`,subtitle:`Plugin: ${ET(e)}`,schema:m.configSchema,load:()=>P$e(t,m.server)??void 0,save:(f)=>vkn(t,m.server,f,m.configSchema)});return u}),[o,s]=vDe.useState(0),i=vDe.useRef(!1),a=vDe.useRef(n);if(a.current=n,vDe.useEffect(()=>{if(r.length===0)a.current("skipped")},[r.length]),r.length===0)return null;let l=r[o];async function c(u){try{await l.save(u)}catch(p){n("error",Se(p),i.current);return}if(Object.keys(u).length>0)i.current=!0;let d=o+1;if(d<r.length)s(d);else n("configured",void 0,i.current)}return ijt.createElement(sjt,{key:l.key,title:l.title,subtitle:l.subtitle,configSchema:l.schema,initialValues:l.load(),onSave:c,onCancel:()=>n("skipped",void 0,i.current)})}
var Cml,ijt,vDe;
var Z5n=b(()=>{bt();Ert();qxe();gg();Hq();KSo();Cml=M(rt(),1),ijt=M(Te(),1),vDe=M(Te(),1)});
export {ajt,_Yp,X5n,Q5n,zSo,Cml,ijt,vDe,Z5n};
