// @ts-nocheck
import {BDt,$En,qEn,s3r,hg} from "./m2280.ts";
import {bMe,p0} from "./m236.ts";
import {getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {He,mn} from "../src/telemetry/0600_feature_name.ts";
import {useResolvedTheme,gZ} from "./m2285.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function ugl(e){if(e.wheelUp||e.wheelDown)return!1;if(e.pageUp||e.pageDown)return!1;if((e.home||e.end)&&e.ctrl)return!1;if((e.leftArrow||e.rightArrow||e.upArrow||e.downArrow||e.home||e.end)&&(e.shift||e.meta||e.super))return!1;return!0}
function Rem(e){if(e.name==="pageup"||e.name==="pagedown")return!1;if((e.name==="home"||e.name==="end")&&e.ctrl)return!1;if((e.name==="left"||e.name==="right"||e.name==="up"||e.name==="down"||e.name==="home"||e.name==="end")&&(e.shift||e.meta||e.superKey))return!1;return!0}
function dgl(e,t){return(n)=>{if(!e.hasSelection())return;if(n.name==="escape"){e.clearSelection(),n.consume();return}if(n.ctrl&&!n.shift&&!n.meta&&n.key==="c"){if(t)e.clearSelection();else e.copySelection();n.consume();return}if(Rem(n))e.clearSelection()}}
function vKn(e){let t=BDt(),n=bMe(e),r=n===1?"char":"chars",o;switch(t){case"native":o=`copied ${n} ${r} to clipboard`;break;case"tmux-buffer":o=`copied ${n} ${r} to tmux buffer \xB7 paste with prefix + ]`;break;case"osc52":o=`sent ${n} ${r} via OSC 52 \xB7 if paste fails, hold ${$En()} while selecting for native copy`;break}let s=qEn(e);if(s)o=`\u26A0 ${s} \xB7 ${o}`;return{key:"selection-copied",kind:"feedback",text:o,color:"suggestion",priority:"immediate",timeoutMs:s?6000:t==="native"?2000:4000}}
function wKn(e,t,n,r){let o=Qft.useRef(!1),s=Qft.useRef(n);s.current=n,Qft.useEffect(()=>{if(!t)return;return s3r(),e.subscribe(()=>{let a=e.getState(),l=e.hasSelection();if(a?.isDragging){if(o.current=!1,r)r.current=null;return}if(!l){if(o.current=!1,r)r.current=null;return}if(o.current){if(r)r.current=null;return}if(!(getGlobalConfig().copyOnSelect??!0))return;let u=e.copySelectionNoClear();if(!u||!u.trim()){o.current=!0;return}if(o.current=!0,r)r.current=u;He("clipboard_write"),s.current?.(u)})},[t,e,r])}
function kKn(e){let t=useResolvedTheme();Qft.useEffect(()=>{e.setSelectionBgColor(t.selectionBg)},[e,t.selectionBg])}
var Qft;
var ORo=b(()=>{gZ();hg();mn();tr();p0();Qft=x(et(),1)});
export {ugl,Rem,dgl,vKn,wKn,kKn,Qft,ORo};
