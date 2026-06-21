// @ts-nocheck
import {useResolvedTheme,SZ} from "./m2274.ts";
import {BaseText,mUe} from "./m2388.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Ivi(e,t){if(!e)return;if(e.startsWith("rgb(")||e.startsWith("#")||e.startsWith("ansi256(")||e.startsWith("ansi:"))return e;return t[e]}
function Text(e){let t=Dvi.c(31),n,r,o,s,i,a,l,c,u,d,p;if(t[0]!==e)({color:s,backgroundColor:r,dimColor:i,bold:a,italic:l,underline:c,strikethrough:u,inverse:d,wrap:p,children:o,...n}=e),t[0]=e,t[1]=n,t[2]=r,t[3]=o,t[4]=s,t[5]=i,t[6]=a,t[7]=l,t[8]=c,t[9]=u,t[10]=d,t[11]=p;else n=t[1],r=t[2],o=t[3],s=t[4],i=t[5],a=t[6],l=t[7],c=t[8],u=t[9],d=t[10],p=t[11];let m=i===void 0?!1:i,f=a===void 0?!1:a,A=l===void 0?!1:l,h=c===void 0?!1:c,g=u===void 0?!1:u,_=d===void 0?!1:d,y=p===void 0?"wrap":p,T=useResolvedTheme(),S=u0t.useContext(b$r),v;if(t[12]!==s||t[13]!==m||t[14]!==S||t[15]!==T)v=m&&!S?T.inactive:Ivi(s,T),t[12]=s,t[13]=m,t[14]=S,t[15]=T,t[16]=v;else v=t[16];let R=v,k;if(t[17]!==r||t[18]!==T)k=Ivi(r,T),t[17]=r,t[18]=T,t[19]=k;else k=t[19];let x=k,H;if(t[20]!==n||t[21]!==f||t[22]!==o||t[23]!==_||t[24]!==A||t[25]!==x||t[26]!==R||t[27]!==g||t[28]!==h||t[29]!==y)H=u0t.default.createElement(BaseText,{color:R,backgroundColor:x,bold:f,italic:A,underline:h,strikethrough:g,inverse:_,wrap:y,...n},o),t[20]=n,t[21]=f,t[22]=o,t[23]=_,t[24]=A,t[25]=x,t[26]=R,t[27]=g,t[28]=h,t[29]=y,t[30]=H;else H=t[30];return H}
var Dvi,u0t,b$r;
var cwe=b(()=>{mUe();SZ();Dvi=M(rt(),1),u0t=M(Te(),1),b$r=u0t.default.createContext(!1)});
export {Ivi,Text,Dvi,u0t,b$r,cwe};
