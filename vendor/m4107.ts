// @ts-nocheck
import {Yn,Pl} from "./m2465.ts";
import {Text} from "./m2433.ts";
import {formatFileSize,Xo} from "./m240.ts";
import {Box} from "./m2432.ts";
import {truncate} from "./m239.ts";
import {DD} from "../src/telemetry/2792_eventName.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {oe} from "./m2275.ts";
function F5a({url:e,prompt:t},{verbose:n}){if(!e)return null;if(n)return`url: "${e}"${n&&t?`, prompt: "${t}"`:""}`;return e}
function B5a(){return AG.jsx(Yn,{height:1,children:AG.jsx(Text,{dimColor:!0,children:"Fetching\u2026"})})}
function U5a({bytes:e,code:t,codeText:n,result:r},o,{verbose:s}){let i=formatFileSize(e);if(s)return AG.jsxs(Box,{flexDirection:"column",children:[AG.jsx(Yn,{height:1,children:AG.jsxs(Text,{children:["Received ",AG.jsx(Text,{bold:!0,children:i})," (",t," ",n,")"]})}),AG.jsx(Box,{flexDirection:"column",children:AG.jsx(Text,{children:r})})]});return AG.jsx(Yn,{height:1,children:AG.jsxs(Text,{children:["Received ",AG.jsx(Text,{bold:!0,children:i})," (",t," ",n,")"]})})}
function Xmo(e){if(!e?.url)return null;return truncate(e.url,DD)}
var AG;
var $5a=b(()=>{Pl();je();Xo();AG=x(oe(),1)});
export {F5a,B5a,U5a,Xmo,AG,$5a};
