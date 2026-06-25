// @ts-nocheck
import {sn,mc} from "./m237.ts";
import {getFastModeModelDisplayName,lr} from "./m233.ts";
import {b} from "../runtime.ts";
function T1o(e,t){let n=Math.max(t,1),r=[];for(let o of e.split(`
`)){let s=o.match(/\s*\S+/g);if(!s){r.push("");continue}let i="",a=0,l=!1;for(let c of s){let u=sn(c);if(!l)i=c,a=u,l=!0;else if(a+u<=n)i+=c,a+=u;else{r.push(i);let d=c.replace(/^\s+/,"");i=d,a=sn(d)}}r.push(i)}return r.join(`
`)}
function QQn(e,t,n,r){let o=" ".repeat(qKt);if(!t)return o+e;let s=sn(e);if(t.includes(`
`)){let u=s<=n?getFastModeModelDisplayName(" ",n-s+WKt):" ".repeat(WKt);return(o+e+u+t).replace(/\n/g,`
`+o)}let i=r-qKt-n-WKt;if(s<=n&&i>=VDm){let u=getFastModeModelDisplayName(" ",n-s+WKt),d=" ".repeat(qKt+n+WKt),p=T1o(t,i);return o+e+u+p.replace(/\n/g,`
`+d)}let a=" ".repeat(qKt+W8l),l=r-qKt-W8l,c=T1o(t,l);return o+e+`
`+a+c.replace(/\n/g,`
`+a)}
function ZQn(e,t,n){if(n.length===0)return;e.push(t,...n,"")}
function KDm(e,t){let n=t.helpWidth||80,r=Math.min(t.padWidth(e,t),GDm),o=[`Usage: ${t.commandUsage(e)}`,""],s=t.commandDescription(e);if(s.length>0)o.push(T1o(s,n),"");if(ZQn(o,"Arguments:",t.visibleArguments(e).map((i)=>QQn(t.argumentTerm(i),t.argumentDescription(i),r,n))),ZQn(o,"Options:",t.visibleOptions(e).map((i)=>QQn(t.optionTerm(i),t.optionDescription(i),r,n))),t.showGlobalOptions)ZQn(o,"Global Options:",t.visibleGlobalOptions(e).map((i)=>QQn(t.optionTerm(i),t.optionDescription(i),r,n)));return ZQn(o,"Commands:",t.visibleCommands(e).map((i)=>QQn(t.subcommandTerm(i),t.subcommandDescription(i),r,n))),o.join(`
`)}
function vSe(){let e=(t)=>t.long?.replace(/^--/,"")??t.short?.replace(/^-/,"")??"";return Object.assign({sortSubcommands:!0,sortOptions:!0,formatHelp:KDm},{compareOptions:(t,n)=>e(t).localeCompare(e(n))})}
var qKt=2,WKt=2,GDm=36,VDm=30,W8l=4;
var eZn=b(()=>{mc();lr()});
export {T1o,QQn,ZQn,KDm,vSe,qKt,WKt,GDm,VDm,W8l,eZn};
