// @ts-nocheck
import {useTheme} from "./m2285.ts";
import {gc,uo} from "./m2468.ts";
import {hht,Sue} from "./m4678.ts";
import {Text} from "./m2433.ts";
import {Hc,OE} from "./m3855.ts";
import {Box} from "./m2432.ts";
import {color} from "./m2431.ts";
import {Xe,Zs} from "./m2216.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function jvo(e){let t=$Sl.c(25),{serverName:n,onComplete:r}=e,[o]=useTheme(),s=gc(),i=hht(),[a,l]=_Wt.useState(!0),[c,u]=_Wt.useState(null),d,p;if(t[0]!==r||t[1]!==i||t[2]!==n||t[3]!==s)d=()=>{(async function(){try{if(!s.getState().mcp.clients.find((_)=>_.name===n)){u(`MCP server "${n}" not found`),l(!1),r(`MCP server "${n}" not found`);return}let g=await i(n);e:switch(g.client.type){case"connected":{l(!1),r(`Successfully reconnected to ${n}`);break e}case"needs-auth":{u(`${n} requires authentication`),l(!1),r(`${n} requires authentication. Use /mcp to authenticate.`);break e}case"pending":case"failed":case"disabled":u(`Failed to reconnect to ${n}`),l(!1),r(`Failed to reconnect to ${n}`)}}catch(h){let g=h,_=g instanceof Error?g.message:String(g);u(_),l(!1),r(`Error: ${_}`)}})()},p=[n,i,s,r],t[0]=r,t[1]=i,t[2]=n,t[3]=s,t[4]=d,t[5]=p;else d=t[4],p=t[5];if(_Wt.useEffect(d,p),a){let m;if(t[6]!==n)m=yne.jsxs(Text,{color:"text",children:["Reconnecting to ",yne.jsx(Text,{bold:!0,children:n})]}),t[6]=n,t[7]=m;else m=t[7];let f;if(t[8]===Symbol.for("react.memo_cache_sentinel"))f=yne.jsx(Hc,{message:"Establishing connection to MCP server"}),t[8]=f;else f=t[8];let h;if(t[9]!==m)h=yne.jsxs(Box,{flexDirection:"column",gap:1,padding:1,children:[m,f]}),t[9]=m,t[10]=h;else h=t[10];return h}if(c){let m;if(t[11]!==o)m=color("error",o)(Xe.cross),t[11]=o,t[12]=m;else m=t[12];let f;if(t[13]!==m)f=yne.jsxs(Text,{children:[m," "]}),t[13]=m,t[14]=f;else f=t[14];let h;if(t[15]!==n)h=yne.jsxs(Text,{color:"error",children:["Failed to reconnect to ",n]}),t[15]=n,t[16]=h;else h=t[16];let g;if(t[17]!==f||t[18]!==h)g=yne.jsxs(Box,{children:[f,h]}),t[17]=f,t[18]=h,t[19]=g;else g=t[19];let _;if(t[20]!==c)_=yne.jsxs(Text,{dimColor:!0,children:["Error: ",c]}),t[20]=c,t[21]=_;else _=t[21];let T;if(t[22]!==g||t[23]!==_)T=yne.jsxs(Box,{flexDirection:"column",gap:1,padding:1,children:[g,_]}),t[22]=g,t[23]=_,t[24]=T;else T=t[24];return T}return null}
var $Sl,_Wt,yne;
var Yvo=b(()=>{Zs();je();Sue();uo();OE();$Sl=x(tt(),1),_Wt=x(et(),1),yne=x(oe(),1)});
export {jvo,$Sl,_Wt,yne,Yvo};
