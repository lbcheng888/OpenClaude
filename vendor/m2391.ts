// @ts-nocheck
import {useTerminalFocus,Uve} from "./m2390.ts";
import {UF} from "./m2389.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function t_d(e){let t=new Map,n=null,r=e,o=performance.now(),s=0;function i(){s=performance.now()-o;for(let c of t.keys())c()}function a(){if([...t.values()].some(Boolean)){if(n)clearInterval(n),n=null;n=setInterval(i,r)}else if(n)clearInterval(n),n=null}function l(c,u){return t.set(c,u),a(),()=>{t.delete(c),a()}}return{subscribeKeepAlive(c){return l(c,!0)},subscribeFollower(c){return l(c,!1)},now(){if(n&&s)return s;return performance.now()-o},setTickInterval(c){if(c===r)return;r=c,a()},setTimeout(c,u){let d=setTimeout(c,u);return()=>clearTimeout(d)}}}
function _Ii(e){let t=gIi.c(7),{children:n}=e,[r]=Att.useState(r_d),o=useTerminalFocus(),s,i;if(t[0]!==r||t[1]!==o)s=()=>{r.setTickInterval(o?UF:n_d)},i=[r,o],t[0]=r,t[1]=o,t[2]=s,t[3]=i;else s=t[2],i=t[3];Att.useEffect(s,i);let a;if(t[4]!==n||t[5]!==r)a=yIi.jsx(s4.Provider,{value:r,children:n}),t[4]=n,t[5]=r,t[6]=a;else a=t[6];return a}
function r_d(){return t_d(UF)}
var gIi,Att,yIi,Rtt=(e,t)=>{let n=setTimeout(e,t);return()=>clearTimeout(n)},vtt=()=>()=>{},lAn=()=>null,s4,n_d;
var $ve=b(()=>{Uve();gIi=x(tt(),1),Att=x(et(),1),yIi=x(oe(),1);s4=Att.createContext(null),n_d=UF*2});
export {t_d,_Ii,r_d,gIi,Att,yIi,Rtt,vtt,lAn,s4,n_d,$ve};
