// @ts-nocheck
import {useTerminalFocus,twe} from "./m2380.ts";
import {gF} from "./m2379.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Hid(e){let t=new Map,n=null,r=e,o=performance.now(),s=0;function i(){s=performance.now()-o;for(let c of t.keys())c()}function a(){if([...t.values()].some(Boolean)){if(n)clearInterval(n),n=null;n=setInterval(i,r)}else if(n)clearInterval(n),n=null}function l(c,u){return t.set(c,u),a(),()=>{t.delete(c),a()}}return{subscribeKeepAlive(c){return l(c,!0)},subscribeFollower(c){return l(c,!1)},now(){if(n&&s)return s;return performance.now()-o},setTickInterval(c){if(c===r)return;r=c,a()},setTimeout(c,u){let d=setTimeout(c,u);return()=>clearTimeout(d)}}}
function iCi(e){let t=sCi.c(7),{children:n}=e,[r]=nwe.useState(Did),o=useTerminalFocus(),s,i;if(t[0]!==r||t[1]!==o)s=()=>{r.setTickInterval(o?gF:Iid)},i=[r,o],t[0]=r,t[1]=o,t[2]=s,t[3]=i;else s=t[2],i=t[3];nwe.useEffect(s,i);let a;if(t[4]!==n||t[5]!==r)a=nwe.default.createElement(B4.Provider,{value:r},n),t[4]=n,t[5]=r,t[6]=a;else a=t[6];return a}
function Did(){return Hid(gF)}
var sCi,nwe,CZe=(e,t)=>{let n=setTimeout(e,t);return()=>clearTimeout(n)},vZe=()=>()=>{},bSn=()=>null,B4,Iid;
var rwe=b(()=>{twe();sCi=M(rt(),1),nwe=M(Te(),1);B4=nwe.createContext(null),Iid=gF*2});
export {Hid,iCi,Did,sCi,nwe,CZe,vZe,bSn,B4,Iid,rwe};
