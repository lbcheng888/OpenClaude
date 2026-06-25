// @ts-nocheck
import {useResolvedTheme,gZ} from "./m2285.ts";
import {BaseText,u2e} from "./m2398.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function G0i(e,t){if(!e)return;if(e.startsWith("rgb(")||e.startsWith("#")||e.startsWith("ansi256(")||e.startsWith("ansi:"))return e;return t[e]}
function Text(e){let t=V0i.c(31),n,r,o,s,i,a,l,c,u,d,p;if(t[0]!==e)({color:s,backgroundColor:r,dimColor:i,bold:a,italic:l,underline:c,strikethrough:u,inverse:d,wrap:p,children:o,...n}=e),t[0]=e,t[1]=n,t[2]=r,t[3]=o,t[4]=s,t[5]=i,t[6]=a,t[7]=l,t[8]=c,t[9]=u,t[10]=d,t[11]=p;else n=t[1],r=t[2],o=t[3],s=t[4],i=t[5],a=t[6],l=t[7],c=t[8],u=t[9],d=t[10],p=t[11];let m=i===void 0?!1:i,f=a===void 0?!1:a,h=l===void 0?!1:l,g=c===void 0?!1:c,_=u===void 0?!1:u,T=d===void 0?!1:d,y=p===void 0?"wrap":p,S=useResolvedTheme(),E=z0i.useContext(Zqr),R;if(t[12]!==s||t[13]!==m||t[14]!==E||t[15]!==S)R=m&&!E?S.inactive:G0i(s,S),t[12]=s,t[13]=m,t[14]=E,t[15]=S,t[16]=R;else R=t[16];let w=R,H;if(t[17]!==r||t[18]!==S)H=G0i(r,S),t[17]=r,t[18]=S,t[19]=H;else H=t[19];let k=H,I;if(t[20]!==n||t[21]!==f||t[22]!==o||t[23]!==T||t[24]!==h||t[25]!==k||t[26]!==w||t[27]!==_||t[28]!==g||t[29]!==y)I=j0i.jsx(BaseText,{color:w,backgroundColor:k,bold:f,italic:h,underline:g,strikethrough:_,inverse:T,wrap:y,...n,children:o}),t[20]=n,t[21]=f,t[22]=o,t[23]=T,t[24]=h,t[25]=k,t[26]=w,t[27]=_,t[28]=g,t[29]=y,t[30]=I;else I=t[30];return I}
var V0i,K0i,z0i,j0i,Zqr;
var zve=b(()=>{u2e();gZ();V0i=x(tt(),1),K0i=x(et(),1),z0i=x(et(),1),j0i=x(oe(),1),Zqr=K0i.createContext(!1)});
export {G0i,Text,V0i,K0i,z0i,j0i,Zqr,zve};
