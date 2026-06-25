// @ts-nocheck
import {useTheme} from "./m2285.ts";
import {Or,ss} from "./m2553.ts";
import {kW,$9e} from "./m3162.ts";
import {Ej,P$,wee} from "../src/config/3161_error.ts";
import {fk,lr} from "./m233.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {gd,xw} from "../src/tui/3853_mode.ts";
import {Link} from "./m2437.ts";
import {dr,uc} from "./m2558.ts";
import {preInitQueue,di} from "./m2583.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {bf,G8e} from "./m4537.ts";
import {color} from "./m2431.ts";
import {Xe,Zs} from "./m2216.ts";
import {Ba,I_} from "./m2584.ts";
import {hr} from "./m2573.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {TS} from "./m4541.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Gvo({agentServer:e,onCancel:t,onComplete:n}){let[r]=useTheme(),[o,s]=_ne.useState(!1),[i,a]=_ne.useState(null),[l,c]=_ne.useState(null),u=_ne.useRef(null);_ne.useEffect(()=>()=>u.current?.abort(),[]);let d=_ne.useCallback(()=>{if(o)u.current?.abort(),u.current=null,s(!1),c(null)},[o]);Or("confirm:no",d,{context:"Confirmation",isActive:o});let p=_ne.useCallback(async()=>{if(!e.needsAuth||!e.url||e.transport!=="http"&&e.transport!=="sse")return;let h=kW(e.name,{type:e.transport,url:e.url});if(h.kind==="anthropic-hosted"){a(h.message);return}if(h.kind!=="oauth")return;s(!0),a(null);let g=new AbortController;u.current=g;try{await Ej(e.name,h.config,c,g.signal),n(`Authentication successful for ${e.name}. The server will connect when the agent runs.`)}catch(_){if(_ instanceof Error&&!(_ instanceof P$))a(_.message)}finally{s(!1),u.current=null}},[e,n]),m=fk(String(e.name));if(o)return $u.jsxs(Box,{flexDirection:"column",gap:1,padding:1,children:[$u.jsxs(Text,{color:"claude",children:["Authenticating with ",e.name,"\u2026"]}),$u.jsxs(Box,{children:[$u.jsx(gd,{}),$u.jsx(Text,{children:" A browser window will open for authentication"})]}),l&&$u.jsxs(Box,{flexDirection:"column",children:[$u.jsx(Text,{dimColor:!0,children:"If your browser doesn't open automatically, copy this URL manually:"}),$u.jsx(Link,{url:l})]}),$u.jsx(Box,{marginLeft:3,children:$u.jsxs(Text,{dimColor:!0,children:["Return here after authenticating in your browser."," ",$u.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"go back"})]})})]});let f=[];if(e.needsAuth)f.push({label:e.isAuthenticated?"Re-authenticate":"Authenticate",value:"auth"});return f.push({label:"Back",value:"back"}),$u.jsxs(preInitQueue,{title:`${m} MCP Server`,subtitle:"agent-only",onCancel:t,inputGuide:$u.jsxs(bn,{children:[$u.jsx(at,{chord:["up","down"],action:"navigate"}),$u.jsx(at,{chord:"enter",action:"confirm"}),$u.jsx(dr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"go back"})]}),children:[$u.jsxs(bf,{box:"plain",columns:[{bold:!0,width:8},{}],children:[$u.jsxs(bf.Row,{children:[$u.jsx($u.Fragment,{children:"Type:"}),$u.jsx(Text,{dimColor:!0,children:e.transport})]}),e.url&&$u.jsxs(bf.Row,{children:[$u.jsx($u.Fragment,{children:"URL:"}),$u.jsx(Text,{dimColor:!0,children:e.url})]}),e.command&&$u.jsxs(bf.Row,{children:[$u.jsx($u.Fragment,{children:"Command:"}),$u.jsx(Text,{dimColor:!0,children:e.command})]}),$u.jsxs(bf.Row,{children:[$u.jsx($u.Fragment,{children:"Used by:"}),$u.jsx(Text,{dimColor:!0,children:e.sourceAgents.join(", ")})]})]}),$u.jsx(Box,{children:$u.jsxs(bf,{box:"plain",columns:[{bold:!0,width:8},{}],children:[$u.jsxs(bf.Row,{children:[$u.jsx($u.Fragment,{children:"Status:"}),$u.jsxs(Text,{children:[color("inactive",r)(Xe.radioOff)," not connected (agent-only)"]})]}),e.needsAuth&&$u.jsxs(bf.Row,{children:[$u.jsx($u.Fragment,{children:"Auth:"}),e.isAuthenticated?$u.jsxs(Text,{children:[color("success",r)(Xe.tick)," authenticated"]}):$u.jsxs(Text,{children:[color("warning",r)(Xe.triangleUpOutline)," may need authentication"]})]})]})}),$u.jsx(Box,{children:$u.jsx(Text,{dimColor:!0,children:"This server connects only when running the agent."})}),i&&$u.jsx(Box,{children:$u.jsx(Ba,{error:i})}),$u.jsx(Box,{children:$u.jsx(hr,{options:f,onChange:async(h)=>{switch(h){case"auth":await p();break;case"back":t();break}},onCancel:t})})]})}
var _ne,$u;
var Vvo=b(()=>{Zs();je();ss();wee();$9e();lr();uc();TS();Is();di();I_();Wo();G8e();xw();_ne=x(et(),1),$u=x(oe(),1)});
export {Gvo,_ne,$u,Vvo};
