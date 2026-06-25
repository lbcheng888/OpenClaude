// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {HBt,rat} from "../src/telemetry/3328_stdout.ts";
import {Tmo,Smo} from "./m4069.ts";
import {Text} from "./m2433.ts";
import {Link} from "./m2437.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function G6e(e){let t=Iqa.c(35),{number:n,url:r,reviewState:o,bold:s,color:i,dimColor:a,underline:l,hidePrefix:c,kind:u}=e,d=l===void 0?!0:l,p=u==="cr"&&!1,m=_t(iPp),f;if(t[0]!==p||t[1]!==m||t[2]!==r)f=p?r:HBt(r,m),t[0]=p,t[1]=m,t[2]=r,t[3]=f;else f=t[3];let h=f,g,_;if(t[4]!==p||t[5]!==r||t[6]!==h)g=()=>{Tmo(h,r,p)},_=[h,r,p],t[4]=p,t[5]=r,t[6]=h,t[7]=g,t[8]=_;else g=t[7],_=t[8];xqa.useEffect(g,_);let T;if(t[9]!==i||t[10]!==o)T=i??aPp(o),t[9]=i,t[10]=o,t[11]=T;else T=t[11];let y=T,S=a||!y&&!s,E;if(t[12]!==s||t[13]!==S||t[14]!==n||t[15]!==y)E=Sce.jsxs(Text,{color:y,dimColor:S,bold:s,children:["#",n]}),t[12]=s,t[13]=S,t[14]=n,t[15]=y,t[16]=E;else E=t[16];let R=E,w;if(t[17]!==s||t[18]!==a||t[19]!==c||t[20]!==p)w=!c&&Sce.jsxs(Sce.Fragment,{children:[Sce.jsx(Text,{dimColor:a||!s,children:"PR"})," "]}),t[17]=s,t[18]=a,t[19]=c,t[20]=p,t[21]=w;else w=t[21];let H;if(t[22]!==s||t[23]!==S||t[24]!==n||t[25]!==y||t[26]!==d)H=Sce.jsxs(Text,{color:y,dimColor:S,underline:d,bold:s,children:["#",n]}),t[22]=s,t[23]=S,t[24]=n,t[25]=y,t[26]=d,t[27]=H;else H=t[27];let k;if(t[28]!==R||t[29]!==H||t[30]!==h)k=Sce.jsx(Link,{url:h,fallback:R,assumeSupport:!1,children:H}),t[28]=R,t[29]=H,t[30]=h,t[31]=k;else k=t[31];let I;if(t[32]!==w||t[33]!==k)I=Sce.jsxs(Text,{children:[w,k]}),t[32]=w,t[33]=k,t[34]=I;else I=t[34];return I}
function iPp(e){return e.settings?.prUrlTemplate}
function aPp(e){switch(e){case"approved":return"success";case"changes_requested":return"error";case"pending":return"warning";case"merged":return"merged";default:return}}
var Iqa,xqa,Sce;
var U3n=b(()=>{Smo();je();uo();rat();Iqa=x(tt(),1),xqa=x(et(),1),Sce=x(oe(),1)});
export {G6e,iPp,aPp,Iqa,xqa,Sce,U3n};
