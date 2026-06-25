// @ts-nocheck
import {ba,pd} from "./m706.ts";
import {lu,Cf,zf} from "./m133.ts";
import {Wt,ps} from "./m230.ts";
import {Q9t,W$n} from "../src/core/3922_truncatedContent.ts";
import {pG,oce} from "../src/telemetry/3912_oldStart.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {xB,j0e} from "./m3918.ts";
import {xEe} from "../src/api/0465_getOauthConfig.ts";
import {wae,Jot} from "./m3021.ts";
import {Cd,lr} from "./m233.ts";
import {pb,eG} from "./m3827.ts";
import {NoSelect} from "./m2447.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function YBa(e){let t=Uuo.c(7),n;if(t[0]!==e.notebook_path||t[1]!==e.remoteOldContent||t[2]!==e.skipLocalRead)n=e.remoteOldContent!==void 0?Promise.resolve(ba(e.remoteOldContent)):e.skipLocalRead||lu(e.notebook_path)&&!Cf(e.notebook_path)?Promise.resolve(null):Wt().readFile(e.notebook_path,{encoding:"utf-8"}).then(Ckp).catch(Ekp),t[0]=e.notebook_path,t[1]=e.remoteOldContent,t[2]=e.skipLocalRead,t[3]=n;else n=t[3];let r=n,o;if(t[4]!==r||t[5]!==e)o=$1.jsx(G$n.Suspense,{fallback:null,children:$1.jsx(Akp,{...e,promise:r})}),t[4]=r,t[5]=e,t[6]=o;else o=t[6];return o}
function Ekp(){return null}
function Ckp(e){return ba(e)}
function Akp(e){let t=Uuo.c(34),{notebook_path:n,cell_id:r,new_source:o,cell_type:s,edit_mode:i,verbose:a,width:l,promise:c}=e,u=i===void 0?"replace":i,d=G$n.use(c),p;if(t[0]!==r||t[1]!==d){e:{if(!d||!r){p="";break e}let H=Q9t(r);if(H!==void 0){if(d.cells[H]){let D=d.cells[H].source,O;if(t[3]!==D)O=Array.isArray(D)?D.join(""):D,t[3]=D,t[4]=O;else O=t[4];p=O;break e}p="";break e}let k;if(t[5]!==r)k=(D)=>D.id===r,t[5]=r,t[6]=k;else k=t[6];let I=d.cells.find(k);if(!I){p="";break e}p=Array.isArray(I.source)?I.source.join(""):I.source}t[0]=r,t[1]=d,t[2]=p}else p=t[2];let m=p,f;e:{if(!d||u==="insert"||u==="delete"){f=null;break e}let H;if(t[7]!==o||t[8]!==n||t[9]!==m)H=pG({filePath:n,fileContents:m,edits:[{old_string:m,new_string:o,replace_all:!1}],ignoreWhitespace:!1}),t[7]=o,t[8]=n,t[9]=m,t[10]=H;else H=t[10];f=H}let h=f,g;e:switch(u){case"insert":{g="Insert new cell";break e}case"delete":{g="Delete cell";break e}default:g="Replace cell contents"}let _;if(t[11]!==n||t[12]!==a)_=a?n:jBa.relative(isTmuxControlMode(),n),t[11]=n,t[12]=a,t[13]=_;else _=t[13];let T;if(t[14]!==_)T=$1.jsx(Text,{bold:!0,children:_}),t[14]=_,t[15]=T;else T=t[15];let y=s?` (${s})`:"",S;if(t[16]!==r||t[17]!==g||t[18]!==y)S=$1.jsxs(Text,{dimColor:!0,children:[g," for cell ",r,y]}),t[16]=r,t[17]=g,t[18]=y,t[19]=S;else S=t[19];let E;if(t[20]!==T||t[21]!==S)E=$1.jsxs(Box,{paddingBottom:1,flexDirection:"column",children:[T,S]}),t[20]=T,t[21]=S,t[22]=E;else E=t[22];let R;if(t[23]!==s||t[24]!==u||t[25]!==h||t[26]!==o||t[27]!==n||t[28]!==m||t[29]!==l)R=u==="delete"?$1.jsx(Box,{flexDirection:"column",paddingLeft:2,children:$1.jsx(xB,{code:m,filePath:n})}):u==="insert"?$1.jsx(Box,{flexDirection:"column",paddingLeft:2,children:$1.jsx(xB,{code:o,filePath:s==="markdown"?"file.md":n})}):h?xEe(h.map((H)=>$1.jsx(wae,{patch:H,dim:!1,width:l,filePath:n,firstLine:Cd(o),fileContent:m},H.newStart)),Rkp):$1.jsx(xB,{code:o,filePath:s==="markdown"?"file.md":n}),t[23]=s,t[24]=u,t[25]=h,t[26]=o,t[27]=n,t[28]=m,t[29]=l,t[30]=R;else R=t[30];let w;if(t[31]!==E||t[32]!==R)w=$1.jsx(Box,{flexDirection:"column",children:$1.jsxs(pb,{children:[E,R]})}),t[31]=E,t[32]=R,t[33]=w;else w=t[33];return w}
function Rkp(e){return $1.jsx(NoSelect,{fromLeftEdge:!0,children:$1.jsx(Text,{dimColor:!0,children:"..."})},`ellipsis-${e}`)}
var Uuo,jBa,G$n,$1;
var JBa=b(()=>{je();zf();Po();oce();ps();pd();W$n();lr();eG();j0e();Jot();Uuo=x(tt(),1),jBa=require("path"),G$n=x(et(),1),$1=x(oe(),1)});
export {YBa,Ekp,Ckp,Akp,Rkp,Uuo,jBa,G$n,$1,JBa};
