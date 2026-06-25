// @ts-nocheck
import {KX,uts} from "./m586.ts";
import {b} from "../runtime.ts";
import {fts,mts} from "./m587.ts";
function hts(e,t,n){let r=e.indexOf(t);if(r===-1)return e;let o=t.length,s=0,i="";do i+=e.slice(s,r)+t+n,s=r+o,r=e.indexOf(t,s);while(r!==-1);return i+=e.slice(s),i}
function gts(e,t,n,r){let o=0,s="";do{let i=e[r-1]==="\r";s+=e.slice(o,i?r-1:r)+t+(i?`\r
`:`
`)+n,o=r+1,r=e.indexOf(`
`,o)}while(r!==-1);return s+=e.slice(o),s}
class Z_r{constructor(e){return Sts(e)}}
function GAt(e){return Sts(e)}
var _ts,yts,J_r,nje,WAt,Tts,rje,btu=(e,t={})=>{if(t.level&&!(Number.isInteger(t.level)&&t.level>=0&&t.level<=3))throw Error("The `level` option should be an integer from 0 to 3");let n=_ts?_ts.level:0;e.level=t.level===void 0?n:t.level},Sts=(e)=>{let t=(...n)=>n.join(" ");return btu(t,e),Object.setPrototypeOf(t,GAt.prototype),t},X_r=(e,t,n,...r)=>{if(e==="rgb"){if(t==="ansi16m")return KX[n].ansi16m(...r);if(t==="ansi256")return KX[n].ansi256(KX.rgbToAnsi256(...r));return KX[n].ansi(KX.rgbToAnsi(...r))}if(e==="hex")return X_r("rgb",t,n,...KX.hexToRgb(...r));return KX[n][e](...r)},Etu,Ctu,Q_r=(e,t,n)=>{let r,o;if(n===void 0)r=e,o=t;else r=n.openAll+e,o=t+n.closeAll;return{open:e,close:t,openAll:r,closeAll:o,parent:n}},drn=(e,t,n)=>{let r=(...o)=>Atu(r,o.length===1?""+o[0]:o.join(" "));return Object.setPrototypeOf(r,Ctu),r[J_r]=e,r[nje]=t,r[WAt]=n,r},Atu=(e,t)=>{if(e.level<=0||!t)return e[WAt]?"":t;let n=e[nje];if(n===void 0)return t;let{openAll:r,closeAll:o}=n;if(t.includes("\x1B"))while(n!==void 0)t=hts(t,n.close,n.open),n=n.parent;let s=t.indexOf(`
`);if(s!==-1)t=gts(t,o,r,s);return r+t+o},Rtu,Skf,bt;
var Gc=b(()=>{uts();fts();({stdout:_ts,stderr:yts}=mts),J_r=Symbol("GENERATOR"),nje=Symbol("STYLER"),WAt=Symbol("IS_EMPTY"),Tts=["ansi","ansi","ansi256","ansi16m"],rje=Object.create(null);Object.setPrototypeOf(GAt.prototype,Function.prototype);for(let[e,t]of Object.entries(KX))rje[e]={get(){let n=drn(this,Q_r(t.open,t.close,this[nje]),this[WAt]);return Object.defineProperty(this,e,{value:n}),n}};rje.visible={get(){let e=drn(this,this[nje],!0);return Object.defineProperty(this,"visible",{value:e}),e}};Etu=["rgb","hex","ansi256"];for(let e of Etu){rje[e]={get(){let{level:n}=this;return function(...r){let o=Q_r(X_r(e,Tts[n],"color",...r),KX.color.close,this[nje]);return drn(this,o,this[WAt])}}};let t="bg"+e[0].toUpperCase()+e.slice(1);rje[t]={get(){let{level:n}=this;return function(...r){let o=Q_r(X_r(e,Tts[n],"bgColor",...r),KX.bgColor.close,this[nje]);return drn(this,o,this[WAt])}}}}Ctu=Object.defineProperties(()=>{},{...rje,level:{enumerable:!0,get(){return this[J_r].level},set(e){this[J_r].level=e}}});Object.defineProperties(GAt.prototype,rje);Rtu=GAt(),Skf=GAt({level:yts?yts.level:0}),bt=Rtu});
export {hts,gts,Z_r,GAt,_ts,yts,J_r,nje,WAt,Tts,rje,btu,Sts,X_r,Etu,Ctu,Q_r,drn,Atu,Rtu,Skf,bt,Gc};
