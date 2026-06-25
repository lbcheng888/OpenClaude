// @ts-nocheck
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Bas,Pa} from "./m720.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function MDp(e){let t=[],n=/<mcp-resource-update\s+server="([^"]+)"\s+uri="([^"]+)"[^>]*>(?:[\s\S]*?<reason>([^<]+)<\/reason>)?/g,r;while((r=n.exec(e))!==null)t.push({kind:"resource",server:r[1]??"",target:r[2]??"",reason:r[3]});let o=/<mcp-polling-update\s+type="([^"]+)"\s+server="([^"]+)"\s+tool="([^"]+)"[^>]*>(?:[\s\S]*?<reason>([^<]+)<\/reason>)?/g;while((r=o.exec(e))!==null)t.push({kind:"polling",server:r[2]??"",target:r[3]??"",reason:r[4]});return t}
function NDp(e){if(e.startsWith("file://")){let t=e.slice(7),n=t.split("/");return n[n.length-1]||t}if(e.length>40)return e.slice(0,39)+"\u2026";return e}
function cqa(e){let t=lqa.c(12),{addMargin:n,param:r}=e,{text:o}=r,s,i,a,l,c;if(t[0]!==n||t[1]!==o){c=Symbol.for("react.early_return_sentinel");e:{let d=MDp(o);if(d.length===0){c=null;break e}s=Box,i="column",a=n?1:0,l=d.map(FDp)}t[0]=n,t[1]=o,t[2]=s,t[3]=i,t[4]=a,t[5]=l,t[6]=c}else s=t[2],i=t[3],a=t[4],l=t[5],c=t[6];if(c!==Symbol.for("react.early_return_sentinel"))return c;let u;if(t[7]!==s||t[8]!==i||t[9]!==a||t[10]!==l)u=Aye.jsx(s,{flexDirection:i,marginTop:a,children:l}),t[7]=s,t[8]=i,t[9]=a,t[10]=l,t[11]=u;else u=t[11];return u}
function FDp(e,t){return Aye.jsx(Box,{children:Aye.jsxs(Text,{children:[Aye.jsx(Text,{color:"success",children:Bas})," ",Aye.jsxs(Text,{dimColor:!0,children:[e.server,":"]})," ",Aye.jsx(Text,{color:"suggestion",children:e.kind==="resource"?NDp(e.target):e.target}),e.reason&&Aye.jsxs(Text,{dimColor:!0,children:[" \xB7 ",e.reason]})]})},t)}
var lqa,Aye;
var uqa=b(()=>{Pa();je();lqa=x(tt(),1),Aye=x(oe(),1)});
export {MDp,NDp,cqa,FDp,lqa,Aye,uqa};
