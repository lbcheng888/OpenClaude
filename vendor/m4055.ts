// @ts-nocheck
import {Fa,Pd} from "./m701.ts";
import {yd,YA,ng} from "./m132.ts";
import {jt,ws} from "./m228.ts";
import {B$t,Q2n} from "../src/core/4055_truncatedContent.ts";
import {sG,vce} from "../src/telemetry/4046_oldStart.ts";
import {Pt,Go} from "./m632.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {mU,kIe} from "./m4051.ts";
import {YSe} from "../src/api/0459_getOauthConfig.ts";
import {wae,Wnt} from "./m3008.ts";
import {zd,dr} from "./m231.ts";
import {HE,JW} from "./m3976.ts";
import {NoSelect} from "./m2437.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function FUa(e){let t=Dlo.c(7),n;if(t[0]!==e.notebook_path||t[1]!==e.remoteOldContent||t[2]!==e.skipLocalRead)n=e.remoteOldContent!==void 0?Promise.resolve(Fa(e.remoteOldContent)):e.skipLocalRead||yd(e.notebook_path)&&!YA(e.notebook_path)?Promise.resolve(null):jt().readFile(e.notebook_path,{encoding:"utf-8"}).then(dwp).catch(uwp),t[0]=e.notebook_path,t[1]=e.remoteOldContent,t[2]=e.skipLocalRead,t[3]=n;else n=t[3];let r=n,o;if(t[4]!==r||t[5]!==e)o=jy.createElement(Z2n.Suspense,{fallback:null},jy.createElement(pwp,{...e,promise:r})),t[4]=r,t[5]=e,t[6]=o;else o=t[6];return o}
function uwp(){return null}
function dwp(e){return Fa(e)}
function pwp(e){let t=Dlo.c(34),{notebook_path:n,cell_id:r,new_source:o,cell_type:s,edit_mode:i,verbose:a,width:l,promise:c}=e,u=i===void 0?"replace":i,d=Z2n.use(c),p;if(t[0]!==r||t[1]!==d){e:{if(!d||!r){p="";break e}let k=B$t(r);if(k!==void 0){if(d.cells[k]){let I=d.cells[k].source,P;if(t[3]!==I)P=Array.isArray(I)?I.join(""):I,t[3]=I,t[4]=P;else P=t[4];p=P;break e}p="";break e}let x;if(t[5]!==r)x=(I)=>I.id===r,t[5]=r,t[6]=x;else x=t[6];let H=d.cells.find(x);if(!H){p="";break e}p=Array.isArray(H.source)?H.source.join(""):H.source}t[0]=r,t[1]=d,t[2]=p}else p=t[2];let m=p,f;e:{if(!d||u==="insert"||u==="delete"){f=null;break e}let k;if(t[7]!==o||t[8]!==n||t[9]!==m)k=sG({filePath:n,fileContents:m,edits:[{old_string:m,new_string:o,replace_all:!1}],ignoreWhitespace:!1}),t[7]=o,t[8]=n,t[9]=m,t[10]=k;else k=t[10];f=k}let A=f,h;e:switch(u){case"insert":{h="Insert new cell";break e}case"delete":{h="Delete cell";break e}default:h="Replace cell contents"}let g;if(t[11]!==n||t[12]!==a)g=a?n:BUa.relative(Pt(),n),t[11]=n,t[12]=a,t[13]=g;else g=t[13];let _;if(t[14]!==g)_=jy.createElement(Text,{bold:!0},g),t[14]=g,t[15]=_;else _=t[15];let y=s?` (${s})`:"",T;if(t[16]!==r||t[17]!==h||t[18]!==y)T=jy.createElement(Text,{dimColor:!0},h," for cell ",r,y),t[16]=r,t[17]=h,t[18]=y,t[19]=T;else T=t[19];let S;if(t[20]!==_||t[21]!==T)S=jy.createElement(Box,{paddingBottom:1,flexDirection:"column"},_,T),t[20]=_,t[21]=T,t[22]=S;else S=t[22];let v;if(t[23]!==s||t[24]!==u||t[25]!==A||t[26]!==o||t[27]!==n||t[28]!==m||t[29]!==l)v=u==="delete"?jy.createElement(Box,{flexDirection:"column",paddingLeft:2},jy.createElement(mU,{code:m,filePath:n})):u==="insert"?jy.createElement(Box,{flexDirection:"column",paddingLeft:2},jy.createElement(mU,{code:o,filePath:s==="markdown"?"file.md":n})):A?YSe(A.map((k)=>jy.createElement(wae,{key:k.newStart,patch:k,dim:!1,width:l,filePath:n,firstLine:zd(o),fileContent:m})),mwp):jy.createElement(mU,{code:o,filePath:s==="markdown"?"file.md":n}),t[23]=s,t[24]=u,t[25]=A,t[26]=o,t[27]=n,t[28]=m,t[29]=l,t[30]=v;else v=t[30];let R;if(t[31]!==S||t[32]!==v)R=jy.createElement(Box,{flexDirection:"column"},jy.createElement(HE,null,S,v)),t[31]=S,t[32]=v,t[33]=R;else R=t[33];return R}
function mwp(e){return jy.createElement(NoSelect,{fromLeftEdge:!0,key:`ellipsis-${e}`},jy.createElement(Text,{dimColor:!0},"..."))}
var Dlo,BUa,jy,Z2n;
var UUa=b(()=>{ze();ng();Go();vce();ws();Pd();Q2n();dr();JW();kIe();Wnt();Dlo=M(rt(),1),BUa=require("path"),jy=M(Te(),1),Z2n=M(Te(),1)});
export {FUa,uwp,dwp,pwp,mwp,Dlo,BUa,jy,Z2n,UUa};
