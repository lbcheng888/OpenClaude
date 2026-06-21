// @ts-nocheck
import {pIt,nTn,xFr,lg} from "./m2269.ts";
import {xLe,KI} from "./m234.ts";
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {useResolvedTheme,SZ} from "./m2274.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function V8n(e){let t=pIt(),n=xLe(e),r=n===1?"char":"chars",o;switch(t){case"native":o=`copied ${n} ${r} to clipboard`;break;case"tmux-buffer":o=`copied ${n} ${r} to tmux buffer \xB7 paste with prefix + ]`;break;case"osc52":o=`sent ${n} ${r} via OSC 52 \xB7 if paste fails, hold ${nTn()} while selecting for native copy`;break}return{key:"selection-copied",kind:"feedback",text:o,color:"suggestion",priority:"immediate",timeoutMs:t==="native"?2000:4000}}
function K8n(e,t,n,r){let o=zpt.useRef(!1),s=zpt.useRef(n);s.current=n,zpt.useEffect(()=>{if(!t)return;return xFr(),e.subscribe(()=>{let a=e.getState(),l=e.hasSelection();if(a?.isDragging){if(o.current=!1,r)r.current=null;return}if(!l){if(o.current=!1,r)r.current=null;return}if(o.current){if(r)r.current=null;return}if(!(getGlobalConfig().copyOnSelect??!0))return;let u=e.copySelectionNoClear();if(!u||!u.trim()){o.current=!0;return}if(o.current=!0,r)r.current=u;Ie("clipboard_write"),s.current?.(u)})},[t,e,r])}
function z8n(e){let t=useResolvedTheme();zpt.useEffect(()=>{e.setSelectionBgColor(t.selectionBg)},[e,t.selectionBg])}
var zpt;
var TTo=b(()=>{SZ();lg();ln();Qn();KI();zpt=M(Te(),1)});
export {V8n,K8n,z8n,zpt,TTo};
