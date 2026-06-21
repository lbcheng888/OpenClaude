// @ts-nocheck
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {Gts,sl} from "./m715.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function qEp(e){let t=[],n=/<mcp-resource-update\s+server="([^"]+)"\s+uri="([^"]+)"[^>]*>(?:[\s\S]*?<reason>([^<]+)<\/reason>)?/g,r;while((r=n.exec(e))!==null)t.push({kind:"resource",server:r[1]??"",target:r[2]??"",reason:r[3]});let o=/<mcp-polling-update\s+type="([^"]+)"\s+server="([^"]+)"\s+tool="([^"]+)"[^>]*>(?:[\s\S]*?<reason>([^<]+)<\/reason>)?/g;while((r=o.exec(e))!==null)t.push({kind:"polling",server:r[2]??"",target:r[3]??"",reason:r[4]});return t}
function jEp(e){if(e.startsWith("file://")){let t=e.slice(7),n=t.split("/");return n[n.length-1]||t}if(e.length>40)return e.slice(0,39)+"\u2026";return e}
function NNa(e){let t=MNa.c(12),{addMargin:n,param:r}=e,{text:o}=r,s,i,a,l,c;if(t[0]!==n||t[1]!==o){c=Symbol.for("react.early_return_sentinel");e:{let d=qEp(o);if(d.length===0){c=null;break e}s=Box,i="column",a=n?1:0,l=d.map(WEp)}t[0]=n,t[1]=o,t[2]=s,t[3]=i,t[4]=a,t[5]=l,t[6]=c}else s=t[2],i=t[3],a=t[4],l=t[5],c=t[6];if(c!==Symbol.for("react.early_return_sentinel"))return c;let u;if(t[7]!==s||t[8]!==i||t[9]!==a||t[10]!==l)u=isFullscreenEnabled.createElement(s,{flexDirection:i,marginTop:a},l),t[7]=s,t[8]=i,t[9]=a,t[10]=l,t[11]=u;else u=t[11];return u}
function WEp(e,t){return isFullscreenEnabled.createElement(Box,{key:t},isFullscreenEnabled.createElement(Text,null,isFullscreenEnabled.createElement(Text,{color:"success"},Gts)," ",isFullscreenEnabled.createElement(Text,{dimColor:!0},e.server,":")," ",isFullscreenEnabled.createElement(Text,{color:"suggestion"},e.kind==="resource"?jEp(e.target):e.target),e.reason&&isFullscreenEnabled.createElement(Text,{dimColor:!0}," \xB7 ",e.reason)))}
var MNa,isFullscreenEnabled;
var BNa=b(()=>{sl();ze();MNa=M(rt(),1),isFullscreenEnabled=M(Te(),1)});
export {qEp,jEp,NNa,WEp,MNa,isFullscreenEnabled,BNa};
