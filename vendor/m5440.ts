// @ts-nocheck
import {sy,e9} from "./m2808.ts";
import {Ike,T9e} from "./m3307.ts";
import {mr,ki} from "./m2453.ts";
import {useTheme} from "./m2274.ts";
import {mUn,V2t} from "./m3930.ts";
import {tn,Hc} from "./m235.ts";
import {buildSystemPrompt,ope} from "./m236.ts";
import {uf,dr} from "./m231.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {U1,Yve} from "./m2365.ts";
import {Ansi} from "./m2431.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function TGl(e){let t=gLo.c(5),n=sy(),r;if(t[0]!==n.syntaxHighlightingDisabled)r=n.syntaxHighlightingDisabled?null:Ike(),t[0]=n.syntaxHighlightingDisabled,t[1]=r;else r=t[1];let o=r,s;if(t[2]!==o||t[3]!==e)s=ade.default.createElement(wOm,{...e,highlight:o}),t[2]=o,t[3]=e,t[4]=s;else s=t[4];return s}
function wOm(e){let t=gLo.c(37),{content:n,maxLines:r,minHeight:o,minWidth:s,maxWidth:i,highlight:a}=e,l=s===void 0?40:s,{columns:c}=mr(),[u]=useTheme(),d=i??c-4,p=r??20,m;if(t[0]!==n||t[1]!==a||t[2]!==u)m=mUn(n,u,a),t[0]=n,t[1]=a,t[2]=u,t[3]=m;else m=t[3];let f=m,A=Math.max(1,d-4),h,g,_,y,T,S;if(t[4]!==p||t[5]!==d||t[6]!==o||t[7]!==l||t[8]!==f||t[9]!==A){let x;if(t[16]!==A)x=(J)=>tn(J)>A?buildSystemPrompt(J,A,{hard:!0,trim:!1}).split(`
`):J,t[16]=A,t[17]=x;else x=t[17];let H=f.split(`
`).flatMap(x),I=H.length>p,P=I?H.slice(0,p):H,L=Math.min(o??0,p),D=Math.max(0,L-P.length-(I?1:0)),N=D>0?[...P,...Array(D).fill("")]:P,O=Math.max(l,...N.map(ROm)),$=Math.max(4,Math.min(O+4,d)),U=$-4,W=$-2,G;if(t[18]!==W)G=uf(iV.horizontal,W),t[18]=W,t[19]=G;else G=t[19];let V=`${iV.topLeft}${G}${iV.topRight}`,Q=$-2,K;if(t[20]!==Q)K=uf(iV.horizontal,Q),t[20]=Q,t[21]=K;else K=t[21];if(g=`${iV.bottomLeft}${K}${iV.bottomRight}`,S=I?(()=>{let J=H.length-p,ee=`${iV.horizontal.repeat(3)} \u2702 ${iV.horizontal.repeat(3)} ${J} lines hidden `,te=tn(ee),ne=Math.max(0,$-2-te);return`${iV.teeLeft}${ee}${iV.horizontal.repeat(ne)}${iV.teeRight}`})():null,h=Box,_="column",t[22]!==V)y=ade.default.createElement(Text,{dimColor:!0},V),t[22]=V,t[23]=y;else y=t[23];let Y;if(t[24]!==U)Y=(J,ee)=>{let ne=tn(J)>U?U1(J,0,U):J,re=" ".repeat(Math.max(0,U-tn(ne)));return ade.default.createElement(Box,{key:ee,flexDirection:"row"},ade.default.createElement(Text,{dimColor:!0},iV.vertical," "),ade.default.createElement(Ansi,null,ne),ade.default.createElement(Text,{dimColor:!0},re," ",iV.vertical))},t[24]=U,t[25]=Y;else Y=t[25];T=N.map(Y),t[4]=p,t[5]=d,t[6]=o,t[7]=l,t[8]=f,t[9]=A,t[10]=h,t[11]=g,t[12]=_,t[13]=y,t[14]=T,t[15]=S}else h=t[10],g=t[11],_=t[12],y=t[13],T=t[14],S=t[15];let v;if(t[26]!==S)v=S&&ade.default.createElement(Text,{color:"warning"},S),t[26]=S,t[27]=v;else v=t[27];let R;if(t[28]!==g)R=ade.default.createElement(Text,{dimColor:!0},g),t[28]=g,t[29]=R;else R=t[29];let k;if(t[30]!==h||t[31]!==_||t[32]!==y||t[33]!==T||t[34]!==v||t[35]!==R)k=ade.default.createElement(h,{flexDirection:_},y,T,v,R),t[30]=h,t[31]=_,t[32]=y,t[33]=T,t[34]=v,t[35]=R,t[36]=k;else k=t[36];return k}
function ROm(e){return tn(e)}
var gLo,ade,iV;
var SGl=b(()=>{e9();ki();Hc();ope();ze();T9e();V2t();Yve();dr();gLo=M(rt(),1),ade=M(Te(),1),iV={topLeft:"\u250C",topRight:"\u2510",bottomLeft:"\u2514",bottomRight:"\u2518",horizontal:"\u2500",vertical:"\u2502",teeLeft:"\u251C",teeRight:"\u2524"}});
export {TGl,wOm,ROm,gLo,ade,iV,SGl};
