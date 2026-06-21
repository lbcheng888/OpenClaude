// @ts-nocheck
import {YX,mYo} from "./m580.ts";
import {b} from "../runtime.ts";
import {gYo,hYo} from "./m581.ts";
function _Yo(e,t,n){let r=e.indexOf(t);if(r===-1)return e;let o=t.length,s=0,i="";do i+=e.slice(s,r)+t+n,s=r+o,r=e.indexOf(t,s);while(r!==-1);return i+=e.slice(s),i}
function yYo(e,t,n,r){let o=0,s="";do{let i=e[r-1]==="\r";s+=e.slice(o,i?r-1:r)+t+(i?`\r
`:`
`)+n,o=r+1,r=e.indexOf(`
`,o)}while(r!==-1);return s+=e.slice(o),s}
class Cmr{constructor(e){return EYo(e)}}
function _bt(e){return EYo(e)}
var TYo,SYo,Smr,o7e,gbt,bYo,s7e,oVc=(e,t={})=>{if(t.level&&!(Number.isInteger(t.level)&&t.level>=0&&t.level<=3))throw Error("The `level` option should be an integer from 0 to 3");let n=TYo?TYo.level:0;e.level=t.level===void 0?n:t.level},EYo=(e)=>{let t=(...n)=>n.join(" ");return oVc(t,e),Object.setPrototypeOf(t,_bt.prototype),t},bmr=(e,t,n,...r)=>{if(e==="rgb"){if(t==="ansi16m")return YX[n].ansi16m(...r);if(t==="ansi256")return YX[n].ansi256(YX.rgbToAnsi256(...r));return YX[n].ansi(YX.rgbToAnsi(...r))}if(e==="hex")return bmr("rgb",t,n,...YX.hexToRgb(...r));return YX[n][e](...r)},sVc,iVc,Emr=(e,t,n)=>{let r,o;if(n===void 0)r=e,o=t;else r=n.openAll+e,o=t+n.closeAll;return{open:e,close:t,openAll:r,closeAll:o,parent:n}},Hen=(e,t,n)=>{let r=(...o)=>aVc(r,o.length===1?""+o[0]:o.join(" "));return Object.setPrototypeOf(r,iVc),r[Smr]=e,r[o7e]=t,r[gbt]=n,r},aVc=(e,t)=>{if(e.level<=0||!t)return e[gbt]?"":t;let n=e[o7e];if(n===void 0)return t;let{openAll:r,closeAll:o}=n;if(t.includes("\x1B"))while(n!==void 0)t=_Yo(t,n.close,n.open),n=n.parent;let s=t.indexOf(`
`);if(s!==-1)t=yYo(t,o,r,s);return r+t+o},lVc,ZAf,_t;
var cu=b(()=>{mYo();gYo();({stdout:TYo,stderr:SYo}=hYo),Smr=Symbol("GENERATOR"),o7e=Symbol("STYLER"),gbt=Symbol("IS_EMPTY"),bYo=["ansi","ansi","ansi256","ansi16m"],s7e=Object.create(null);Object.setPrototypeOf(_bt.prototype,Function.prototype);for(let[e,t]of Object.entries(YX))s7e[e]={get(){let n=Hen(this,Emr(t.open,t.close,this[o7e]),this[gbt]);return Object.defineProperty(this,e,{value:n}),n}};s7e.visible={get(){let e=Hen(this,this[o7e],!0);return Object.defineProperty(this,"visible",{value:e}),e}};sVc=["rgb","hex","ansi256"];for(let e of sVc){s7e[e]={get(){let{level:n}=this;return function(...r){let o=Emr(bmr(e,bYo[n],"color",...r),YX.color.close,this[o7e]);return Hen(this,o,this[gbt])}}};let t="bg"+e[0].toUpperCase()+e.slice(1);s7e[t]={get(){let{level:n}=this;return function(...r){let o=Emr(bmr(e,bYo[n],"bgColor",...r),YX.bgColor.close,this[o7e]);return Hen(this,o,this[gbt])}}}}iVc=Object.defineProperties(()=>{},{...s7e,level:{enumerable:!0,get(){return this[Smr].level},set(e){this[Smr].level=e}}});Object.defineProperties(_bt.prototype,s7e);lVc=_bt(),ZAf=_bt({level:SYo?SYo.level:0}),_t=lVc});
export {_Yo,yYo,Cmr,_bt,TYo,SYo,Smr,o7e,gbt,bYo,s7e,oVc,EYo,bmr,sVc,iVc,Emr,Hen,aVc,lVc,ZAf,_t,cu};
