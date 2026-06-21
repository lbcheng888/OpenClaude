// @ts-nocheck
import {mr,ki} from "./m2453.ts";
import {sG,vce} from "../src/telemetry/4046_oldStart.ts";
import {zd,dr} from "./m231.ts";
import {YSe} from "../src/api/0459_getOauthConfig.ts";
import {wae,Wnt} from "./m3008.ts";
import {mU,kIe} from "./m4051.ts";
import {b9,lqe} from "./m3975.ts";
import {NoSelect} from "./m2437.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function IUa(e){let t=HUa.c(15),{file_path:n,content:r,fileExists:o,oldContent:s}=e,{columns:i}=mr(),a;e:{if(!o){a=null;break e}let m;if(t[0]!==r||t[1]!==n||t[2]!==s)m=sG({filePath:n,fileContents:s,edits:[{old_string:s,new_string:r,replace_all:!1}]}),t[0]=r,t[1]=n,t[2]=s,t[3]=m;else m=t[3];a=m}let l=a,c;if(t[4]!==r)c=zd(r),t[4]=r,t[5]=c;else c=t[5];let u=c,d;if(t[6]!==i||t[7]!==r||t[8]!==n||t[9]!==u||t[10]!==l||t[11]!==s)d=l?YSe(l.map((m)=>jte.createElement(wae,{key:m.newStart,patch:m,dim:!1,filePath:n,firstLine:u,fileContent:s,width:i-2})),ewp):jte.createElement(mU,{code:r||"(No content)",filePath:n}),t[6]=i,t[7]=r,t[8]=n,t[9]=u,t[10]=l,t[11]=s,t[12]=d;else d=t[12];let p;if(t[13]!==d)p=jte.createElement(b9,{paddingX:1},d),t[13]=d,t[14]=p;else p=t[14];return p}
function ewp(e){return jte.createElement(NoSelect,{fromLeftEdge:!0,key:`ellipsis-${e}`},jte.createElement(Text,{dimColor:!0},"..."))}
var HUa,jte;
var DUa=b(()=>{ki();ze();vce();dr();lqe();kIe();Wnt();HUa=M(rt(),1),jte=M(Te(),1)});
export {IUa,ewp,HUa,jte,DUa};
