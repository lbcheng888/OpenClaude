// @ts-nocheck
import {qw,sP} from "./m4535.ts";
import {truncate} from "./m239.ts";
import {formatDescriptionWithSource,Mm} from "../src/tools/5174_toSlashCommands.ts";
import {Box} from "./m2432.ts";
import {wl,sy} from "./m2585.ts";
import {Text} from "./m2433.ts";
import {hr,Ol} from "./m2573.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {Xo} from "./m240.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Svo(e){let t=_yl.c(14),{commands:n,maxHeight:r,columns:o,title:s,onCancel:i,emptyMessage:a}=e,{headerFocused:l,focusHeader:c}=qw(),u=Math.max(1,o-10),d=Math.max(1,Math.floor((r-10)/2)),p;if(t[0]!==n||t[1]!==u){let h=new Set,g;if(t[3]!==u)g=(_)=>({label:`/${_.name}`,value:_.name,description:truncate(formatDescriptionWithSource(_),u,!0)}),t[3]=u,t[4]=g;else g=t[4];p=n.filter((_)=>{if(h.has(_.name))return!1;return h.add(_.name),!0}).sort(Fnm).map(g),t[0]=n,t[1]=u,t[2]=p}else p=t[2];let m=p,f;if(t[5]!==n.length||t[6]!==a||t[7]!==c||t[8]!==l||t[9]!==i||t[10]!==m||t[11]!==s||t[12]!==d)f=gue.jsx(Box,{flexDirection:"column",paddingY:1,children:n.length===0&&a?gue.jsx(wl,{children:a}):gue.jsxs(gue.Fragment,{children:[gue.jsx(Text,{children:s}),gue.jsx(Box,{marginTop:1,children:gue.jsx(hr,{options:m,visibleOptionCount:d,onCancel:i,disableSelection:!0,hideIndexes:!0,layout:"compact-vertical",onUpFromFirstItem:c,isDisabled:l})})]})}),t[5]=n.length,t[6]=a,t[7]=c,t[8]=l,t[9]=i,t[10]=m,t[11]=s,t[12]=d,t[13]=f;else f=t[13];return f}
function Fnm(e,t){return e.name.localeCompare(t.name)}
var _yl,gue;
var yyl=b(()=>{Mm();je();Xo();Ol();sy();sP();_yl=x(tt(),1),gue=x(oe(),1)});
export {Svo,Fnm,_yl,gue,yyl};
