// @ts-nocheck
import {tn,Hc} from "./m235.ts";
import {uf,dr} from "./m231.ts";
import {b} from "../runtime.ts";
function eDo(e,t){let n=Math.max(t,1),r=[];for(let o of e.split(`
`)){let s=o.match(/\s*\S+/g);if(!s){r.push("");continue}let i="",a=0,l=!1;for(let c of s){let u=tn(c);if(!l)i=c,a=u,l=!0;else if(a+u<=n)i+=c,a+=u;else{r.push(i);let d=c.replace(/^\s+/,"");i=d,a=tn(d)}}r.push(i)}return r.join(`
`)}
function tYn(e,t,n,r){let o=" ".repeat(mWt);if(!t)return o+e;let s=tn(e);if(t.includes(`
`)){let u=s<=n?uf(" ",n-s+fWt):" ".repeat(fWt);return(o+e+u+t).replace(/\n/g,`
`+o)}let i=r-mWt-n-fWt;if(s<=n&&i>=DCm){let u=uf(" ",n-s+fWt),d=" ".repeat(mWt+n+fWt),p=eDo(t,i);return o+e+u+p.replace(/\n/g,`
`+d)}let a=" ".repeat(mWt+e2l),l=r-mWt-e2l,c=eDo(t,l);return o+e+`
`+a+c.replace(/\n/g,`
`+a)}
function nYn(e,t,n){if(n.length===0)return;e.push(t,...n,"")}
function PCm(e,t){let n=t.helpWidth||80,r=Math.min(t.padWidth(e,t),ICm),o=[`Usage: ${t.commandUsage(e)}`,""],s=t.commandDescription(e);if(s.length>0)o.push(eDo(s,n),"");if(nYn(o,"Arguments:",t.visibleArguments(e).map((i)=>tYn(t.argumentTerm(i),t.argumentDescription(i),r,n))),nYn(o,"Options:",t.visibleOptions(e).map((i)=>tYn(t.optionTerm(i),t.optionDescription(i),r,n))),t.showGlobalOptions)nYn(o,"Global Options:",t.visibleGlobalOptions(e).map((i)=>tYn(t.optionTerm(i),t.optionDescription(i),r,n)));return nYn(o,"Commands:",t.visibleCommands(e).map((i)=>tYn(t.subcommandTerm(i),t.subcommandDescription(i),r,n))),o.join(`
`)}
function Jye(){let e=(t)=>t.long?.replace(/^--/,"")??t.short?.replace(/^-/,"")??"";return Object.assign({sortSubcommands:!0,sortOptions:!0,formatHelp:PCm},{compareOptions:(t,n)=>e(t).localeCompare(e(n))})}
var mWt=2,fWt=2,ICm=36,DCm=30,e2l=4;
var rYn=b(()=>{Hc();dr()});
export {eDo,tYn,nYn,PCm,Jye,mWt,fWt,ICm,DCm,e2l,rYn};
