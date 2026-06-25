// @ts-nocheck
import {qw,sP} from "./m4535.ts";
import {Xe,Zs} from "./m2216.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {getOriginalCwd,lt} from "../src/session/0132_sent.ts";
import {hr,Ol} from "./m2573.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function iDl(e){let t=oDl.c(23),{onExit:n,toolPermissionContext:r,onRequestAddDirectory:o,onRequestRemoveDirectory:s,onHeaderFocusChange:i}=e,{headerFocused:a,focusHeader:l}=qw(),c,u;if(t[0]!==a||t[1]!==i)c=()=>{i(a)},u=[a,i],t[0]=a,t[1]=i,t[2]=c,t[3]=u;else c=t[2],u=t[3];sDl.useEffect(c,u);let d;if(t[4]!==r.additionalWorkingDirectories)d=Array.from(r.additionalWorkingDirectories.keys()).map(yhm),t[4]=r.additionalWorkingDirectories,t[5]=d;else d=t[5];let p=d,m;if(t[6]!==p||t[7]!==o||t[8]!==s)m=(R)=>{if(R==="add-directory"){o();return}let w=p.find((H)=>H.path===R);if(w&&w.isDeletable)s(w.path)},t[6]=p,t[7]=o,t[8]=s,t[9]=m;else m=t[9];let f=m,h;if(t[10]!==n)h=()=>n("Workspace dialog dismissed",{display:"system"}),t[10]=n,t[11]=h;else h=t[11];let g=h,_;if(t[12]!==p){_=p.map(_hm);let R;if(t[14]===Symbol.for("react.memo_cache_sentinel"))R={label:`Add directory${Xe.ellipsis}`,value:"add-directory"},t[14]=R;else R=t[14];_.push(R),t[12]=p,t[13]=_}else _=t[13];let T=_,y;if(t[15]===Symbol.for("react.memo_cache_sentinel"))y=$We.jsxs(Box,{flexDirection:"row",marginTop:1,marginLeft:2,gap:1,children:[$We.jsx(Text,{children:`-  ${getOriginalCwd()}`}),$We.jsx(Text,{dimColor:!0,children:"(Original working directory)"})]}),t[15]=y;else y=t[15];let S=Math.min(10,T.length),E;if(t[16]!==l||t[17]!==g||t[18]!==f||t[19]!==a||t[20]!==T||t[21]!==S)E=$We.jsxs(Box,{flexDirection:"column",marginBottom:1,children:[y,$We.jsx(hr,{options:T,onChange:f,onCancel:g,visibleOptionCount:S,onUpFromFirstItem:l,isDisabled:a})]}),t[16]=l,t[17]=g,t[18]=f,t[19]=a,t[20]=T,t[21]=S,t[22]=E;else E=t[22];return E}
function _hm(e){return{label:e.path,value:e.path}}
function yhm(e){return{path:e,isCurrent:!1,isDeletable:!0}}
var oDl,sDl,$We;
var aDl=b(()=>{Zs();lt();Ol();je();sP();oDl=x(tt(),1),sDl=x(et(),1),$We=x(oe(),1)});
export {iDl,_hm,yhm,oDl,sDl,$We,aDl};
