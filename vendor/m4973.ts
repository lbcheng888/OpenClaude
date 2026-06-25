// @ts-nocheck
import {KFa,tce} from "../src/permissions/3892_permissionMode.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {hr,Ol} from "./m2573.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function dYn(e){let t=ZPl.c(11),{initialModel:n,onComplete:r,onCancel:o}=e,s;if(t[0]!==n){e:{let d=KFa();if(n&&!d.some((p)=>p.value===n)){s=[{value:n,label:n,description:"Current model (custom ID)"},...d];break e}s=d}t[0]=n,t[1]=s}else s=t[1];let i=s,a=n??"sonnet",l;if(t[2]===Symbol.for("react.memo_cache_sentinel"))l=wgt.jsx(Box,{marginBottom:1,children:wgt.jsx(Text,{dimColor:!0,children:"Model determines the agent's reasoning capabilities and speed."})}),t[2]=l;else l=t[2];let c;if(t[3]!==o||t[4]!==r)c=()=>o?o():r(void 0),t[3]=o,t[4]=r,t[5]=c;else c=t[5];let u;if(t[6]!==a||t[7]!==i||t[8]!==r||t[9]!==c)u=wgt.jsxs(Box,{flexDirection:"column",children:[l,wgt.jsx(hr,{options:i,defaultValue:a,onChange:r,onCancel:c})]}),t[6]=a,t[7]=i,t[8]=r,t[9]=c,t[10]=u;else u=t[10];return u}
var ZPl,wgt;
var E0o=b(()=>{je();tce();Ol();ZPl=x(tt(),1),wgt=x(oe(),1)});
export {dYn,ZPl,wgt,E0o};
