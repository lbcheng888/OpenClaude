// @ts-nocheck
import {b} from "../runtime.ts";
function m4d(e,t,n,r,o){if(!e||!t)return null;let s=Math.max(0,Math.min(100,n)),i=Math.max(0,Math.min(100,r)),a=Math.round(s/100*e),l=Math.round(i/100*t),c=Math.floor(o/2),u=Math.max(0,a-c),d=Math.max(0,l-c),p=Math.min(o,e-u),m=Math.min(o,t-d);if(p<=0||m<=0)return null;return{x:u,y:d,width:p,height:m}}
function f4d(e,t,n,r,o,s=9){let i=m4d(n.width,n.height,r,o,s);if(!i)return!1;let a=e(t.base64,i),l=e(n.base64,i);if(!a||!l)return!1;return a.equals(l)}
async function Xta(e,t,n,r,o,s,i=9){if(!t)return{valid:!0,skipped:!0};try{let a=await o();if(!a)return{valid:!0,skipped:!0};if(f4d(e,t,a,n,r,i))return{valid:!0,skipped:!1};return{valid:!1,skipped:!1,warning:"Screen content at the target location changed since the last screenshot. Take a new screenshot before clicking."}}catch(a){return s.debug("[pixelCompare] validation error, skipping",a),{valid:!0,skipped:!0}}}
function nna(e){if(Qta.has(e))return"shell";if(Zta.has(e))return"filesystem";if(ena.has(e))return"system_settings";return null}
var Qta,Zta,ena,tna;
var jKr=b(()=>{Qta=new Set(["com.apple.Terminal","com.googlecode.iterm2","com.microsoft.VSCode","dev.warp.Warp-Stable","com.github.wez.wezterm","io.alacritty","net.kovidgoyal.kitty","com.jetbrains.intellij","com.jetbrains.pycharm"]),Zta=new Set(["com.apple.finder"]),ena=new Set(["com.apple.systempreferences"]),tna=new Set([...Qta,...Zta,...ena])});
export {m4d,f4d,Xta,nna,Qta,Zta,ena,tna,jKr};
