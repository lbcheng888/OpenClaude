// @ts-nocheck
import {useIsScreenReaderEnabled} from "./m2444.ts";
import {Text,zve} from "./m2433.ts";
import {Box,RAn} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function pb(e){let t=RMa.c(10),{children:n,color:r,title:o}=e,s=useIsScreenReaderEnabled(),i=s?void 0:"round",a=s?0:1,l=o?1:0,c;if(t[0]!==r||t[1]!==o)c=o&&c2n.jsx(Text,{bold:!0,color:r,children:o}),t[0]=r,t[1]=o,t[2]=c;else c=t[2];let u;if(t[3]!==n||t[4]!==r||t[5]!==i||t[6]!==a||t[7]!==l||t[8]!==c)u=c2n.jsxs(Box,{borderStyle:i,borderColor:r,flexDirection:"column",paddingX:a,gap:l,children:[c,n]}),t[3]=n,t[4]=r,t[5]=i,t[6]=a,t[7]=l,t[8]=c,t[9]=u;else u=t[9];return u}
var RMa,c2n;
var eG=b(()=>{je();RAn();zve();RMa=x(tt(),1),c2n=x(oe(),1)});
export {pb,RMa,c2n,eG};
