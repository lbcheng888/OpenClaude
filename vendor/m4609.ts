// @ts-nocheck
import {xx,$P} from "./m4515.ts";
import {truncate} from "./m237.ts";
import {formatDescriptionWithSource,Sf} from "../src/tools/5142_toSlashCommands.ts";
import {Box} from "./m2422.ts";
import {ic,Ny} from "./m2574.ts";
import {Text} from "./m2423.ts";
import {pr,Yl} from "./m2562.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {ps} from "./m238.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function iSo(e){let t=Oul.c(14),{commands:n,maxHeight:r,columns:o,title:s,onCancel:i,emptyMessage:a}=e,{headerFocused:l,focusHeader:c}=xx(),u=Math.max(1,o-10),d=Math.max(1,Math.floor((r-10)/2)),p;if(t[0]!==n||t[1]!==u){let A=new Set,h;if(t[3]!==u)h=(g)=>({label:`/${g.name}`,value:g.name,description:truncate(formatDescriptionWithSource(g),u,!0)}),t[3]=u,t[4]=h;else h=t[4];p=n.filter((g)=>{if(A.has(g.name))return!1;return A.add(g.name),!0}).sort(LKp).map(h),t[0]=n,t[1]=u,t[2]=p}else p=t[2];let m=p,f;if(t[5]!==n.length||t[6]!==a||t[7]!==c||t[8]!==l||t[9]!==i||t[10]!==m||t[11]!==s||t[12]!==d)f=OU.createElement(Box,{flexDirection:"column",paddingY:1},n.length===0&&a?OU.createElement(ic,null,a):OU.createElement(OU.Fragment,null,OU.createElement(Text,null,s),OU.createElement(Box,{marginTop:1},OU.createElement(pr,{options:m,visibleOptionCount:d,onCancel:i,disableSelection:!0,hideIndexes:!0,layout:"compact-vertical",onUpFromFirstItem:c,isDisabled:l})))),t[5]=n.length,t[6]=a,t[7]=c,t[8]=l,t[9]=i,t[10]=m,t[11]=s,t[12]=d,t[13]=f;else f=t[13];return f}
function LKp(e,t){return e.name.localeCompare(t.name)}
var Oul,OU;
var Lul=b(()=>{Sf();ze();ps();Yl();Ny();$P();Oul=M(rt(),1),OU=M(Te(),1)});
export {iSo,LKp,Oul,OU,Lul};
