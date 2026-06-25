// @ts-nocheck
import {_r,ui} from "./m2463.ts";
import {pG,oce} from "../src/telemetry/3912_oldStart.ts";
import {Cd,lr} from "./m233.ts";
import {xEe} from "../src/api/0465_getOauthConfig.ts";
import {wae,Jot} from "./m3021.ts";
import {xB,j0e} from "./m3918.ts";
import {K$,Jqe} from "./m3915.ts";
import {NoSelect} from "./m2447.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function $Ba(e){let t=UBa.c(15),{file_path:n,content:r,fileExists:o,oldContent:s}=e,{columns:i}=_r(),a;e:{if(!o){a=null;break e}let m;if(t[0]!==r||t[1]!==n||t[2]!==s)m=pG({filePath:n,fileContents:s,edits:[{old_string:s,new_string:r,replace_all:!1}]}),t[0]=r,t[1]=n,t[2]=s,t[3]=m;else m=t[3];a=m}let l=a,c;if(t[4]!==r)c=Cd(r),t[4]=r,t[5]=c;else c=t[5];let u=c,d;if(t[6]!==i||t[7]!==r||t[8]!==n||t[9]!==u||t[10]!==l||t[11]!==s)d=l?xEe(l.map((m)=>qut.jsx(wae,{patch:m,dim:!1,filePath:n,firstLine:u,fileContent:s,width:i-2},m.newStart)),pkp):qut.jsx(xB,{code:r||"(No content)",filePath:n}),t[6]=i,t[7]=r,t[8]=n,t[9]=u,t[10]=l,t[11]=s,t[12]=d;else d=t[12];let p;if(t[13]!==d)p=qut.jsx(K$,{paddingX:1,children:d}),t[13]=d,t[14]=p;else p=t[14];return p}
function pkp(e){return qut.jsx(NoSelect,{fromLeftEdge:!0,children:qut.jsx(Text,{dimColor:!0,children:"..."})},`ellipsis-${e}`)}
var UBa,qut;
var qBa=b(()=>{ui();je();oce();lr();Jqe();j0e();Jot();UBa=x(tt(),1),qut=x(oe(),1)});
export {$Ba,pkp,UBa,qut,qBa};
