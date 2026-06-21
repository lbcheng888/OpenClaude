// @ts-nocheck
import {mt,configProtoStore} from "./m2458.ts";
import {nft,_ye} from "./m4860.ts";
import {xct,xBa,o2n} from "../src/agent/4016_o2n.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function fOo(e){let t=mOo.c(13),{tasksSelected:n,onOpenDialog:r}=e,o=mt(PIm),s;if(t[0]!==o)s=Object.values(o??{}).filter(nft),t[0]=o,t[1]=s;else s=t[1];let i=s;if(i.length===0)return null;let a;if(t[2]!==i)a=xct(i),t[2]=i,t[3]=a;else a=t[3];let l;if(t[4]!==r||t[5]!==a||t[6]!==n)l=fj.createElement(OIm,{selected:n,onClick:r},a),t[4]=r,t[5]=a,t[6]=n,t[7]=l;else l=t[7];let c;if(t[8]!==i)c=xBa(i)&&fj.createElement(Text,{dimColor:!0}," \xB7 ",et.arrowDown," to view"),t[8]=i,t[9]=c;else c=t[9];let u;if(t[10]!==l||t[11]!==c)u=fj.createElement(fj.Fragment,null,l,c),t[10]=l,t[11]=c,t[12]=u;else u=t[12];return u}
function PIm(e){return e.tasks}
function OIm(e){let t=mOo.c(8),{selected:n,onClick:r,children:o}=e,[s,i]=ojl.useState(!1),a=n||s,l;if(t[0]!==o||t[1]!==a)l=fj.createElement(Text,{color:"background",inverse:a},o),t[0]=o,t[1]=a,t[2]=l;else l=t[2];let c=l;if(!r)return c;let u,d;if(t[3]===Symbol.for("react.memo_cache_sentinel"))u=()=>i(!0),d=()=>i(!1),t[3]=u,t[4]=d;else u=t[3],d=t[4];let p;if(t[5]!==c||t[6]!==r)p=fj.createElement(Box,{onClick:r,onMouseEnter:u,onMouseLeave:d},c),t[5]=c,t[6]=r,t[7]=p;else p=t[7];return p}
var mOo,fj,ojl;
var sjl=b(()=>{Ai();configProtoStore();o2n();ze();_ye();mOo=M(rt(),1),fj=M(Te(),1),ojl=M(Te(),1)});
export {fOo,PIm,OIm,mOo,fj,ojl,sjl};
