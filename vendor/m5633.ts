// @ts-nocheck
import {useTimeout} from "./m2460.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {hr,Ol} from "./m2573.ts";
import {hm,DI} from "./m3357.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function yuc(e){let t=_uc.c(35),{pluginName:n,pluginDescription:r,marketplaceName:o,sourceCommand:s,onResponse:i}=e,a=$nr.useRef(i),l;if(t[0]!==i)l=()=>{a.current=i},t[0]=i,t[1]=l;else l=t[1];$nr.useEffect(l);let c;if(t[2]===Symbol.for("react.memo_cache_sentinel"))c=()=>a.current("no"),t[2]=c;else c=t[2];let u;if(t[3]===Symbol.for("react.memo_cache_sentinel"))u=[],t[3]=u;else u=t[3];useTimeout(c,zGm,u);let d;if(t[4]!==i)d=function(L){e:switch(L){case"yes":{i("yes");break e}case"disable":{i("disable");break e}default:i("no")}},t[4]=i,t[5]=d;else d=t[5];let p=d,m;if(t[6]!==n)m={label:e0.jsxs(Text,{children:["Yes, install ",e0.jsx(Text,{bold:!0,children:n})]}),value:"yes"},t[6]=n,t[7]=m;else m=t[7];let f,h;if(t[8]===Symbol.for("react.memo_cache_sentinel"))f={label:"No",value:"no"},h={label:"No, and don't show plugin installation hints again",value:"disable"},t[8]=f,t[9]=h;else f=t[8],h=t[9];let g;if(t[10]!==m)g=[m,f,h],t[10]=m,t[11]=g;else g=t[11];let _=g,T;if(t[12]!==s)T=e0.jsx(Box,{marginBottom:1,children:e0.jsxs(Text,{dimColor:!0,children:["The ",e0.jsx(Text,{bold:!0,children:s})," command suggests installing a plugin."]})}),t[12]=s,t[13]=T;else T=t[13];let y;if(t[14]===Symbol.for("react.memo_cache_sentinel"))y=e0.jsx(Text,{dimColor:!0,children:"Plugin:"}),t[14]=y;else y=t[14];let S;if(t[15]!==n)S=e0.jsxs(Box,{children:[y,e0.jsxs(Text,{children:[" ",n]})]}),t[15]=n,t[16]=S;else S=t[16];let E;if(t[17]===Symbol.for("react.memo_cache_sentinel"))E=e0.jsx(Text,{dimColor:!0,children:"Marketplace:"}),t[17]=E;else E=t[17];let R;if(t[18]!==o)R=e0.jsxs(Box,{children:[E,e0.jsxs(Text,{children:[" ",o]})]}),t[18]=o,t[19]=R;else R=t[19];let w;if(t[20]!==r)w=r&&e0.jsx(Box,{children:e0.jsx(Text,{dimColor:!0,children:r})}),t[20]=r,t[21]=w;else w=t[21];let H;if(t[22]===Symbol.for("react.memo_cache_sentinel"))H=e0.jsx(Box,{marginTop:1,children:e0.jsx(Text,{children:"Would you like to install it?"})}),t[22]=H;else H=t[22];let k;if(t[23]!==i)k=()=>i("no"),t[23]=i,t[24]=k;else k=t[24];let I;if(t[25]!==p||t[26]!==_||t[27]!==k)I=e0.jsx(Box,{children:e0.jsx(hr,{options:_,onChange:p,onCancel:k})}),t[25]=p,t[26]=_,t[27]=k,t[28]=I;else I=t[28];let D;if(t[29]!==S||t[30]!==R||t[31]!==w||t[32]!==I||t[33]!==T)D=e0.jsx(hm,{title:"Plugin recommendation",children:e0.jsxs(Box,{flexDirection:"column",paddingX:2,paddingY:1,children:[T,S,R,w,H,I]})}),t[29]=S,t[30]=R,t[31]=w,t[32]=I,t[33]=T,t[34]=D;else D=t[34];return D}
var _uc,$nr,e0,zGm=30000;
var Tuc=b(()=>{je();Ol();DI();_uc=x(tt(),1),$nr=x(et(),1),e0=x(oe(),1)});
export {yuc,_uc,$nr,e0,zGm,Tuc};
