// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {Kc,Y7,xm,zse,Jm} from "../src/config/2207_Jm.ts";
import {nz,hI,Zfe,cO} from "../src/telemetry/2249_cO.ts";
import {PUe,rz} from "../src/config/2253_displayName.ts";
import {Qx,M1e,r2} from "../src/config/0646_existsSync.ts";
import {b} from "../runtime.ts";
function h6p(e){return e.split(mDe.win32.sep).join(mDe.posix.sep)}
function tTe(e){let t=h6p(e);return DTo?t.toLowerCase():t}
function v6t(e){let t=or(),n=tTe(e),r=tTe(t);if(!n.startsWith(r))return null;if(n.includes("/projects/")&&n.endsWith(".jsonl"))return"session_transcript";return null}
function f8n(e){let t=e.split(mDe.win32.sep).join(mDe.posix.sep);if(t.includes(".jsonl")||t.includes("projects")&&t.includes("*.jsonl"))return"session_transcript";return null}
function t8e(e){if(Kc())return Y7(e);return!1}
function onl(e){if(nz(e))return"team";if(t8e(e))return"personal";return null}
function g6p(e){if(Kc())return PUe(e);return!1}
function n8e(e){if(t8e(e))return!0;if(nz(e))return!0;if(v6t(e)!==null)return!0;if(g6p(e))return!0;return!1}
function PTo(e){let t=mDe.normalize(e),n=tTe(t);if(Kc()&&(n.includes("/agent-memory/")||n.includes("/agent-memory-local/")))return!0;if(hI()&&Zfe(t))return!0;if(Kc()){let a=xm(),l=tTe(a.replace(/[/\\]+$/,"")),c=tTe(a);if(n===l||n.startsWith(c))return!0}let r=tTe(or()),o=tTe(zse()),s=n.startsWith(r),i=n.startsWith(o);if(!s&&!i)return!1;if(s&&n.includes("/projects/"))return!0;if(Kc()&&n.includes("/memory/"))return!0;return!1}
function snl(e){let t=or(),n=zse(),r=Kc()?xm().replace(/[/\\]+$/,""):"",o=tTe(e);if(![t,n,r].filter(Boolean).some((l)=>{if(o.includes(tTe(l)))return!0;if(DTo)return o.includes(Qx(l).toLowerCase());return!1}))return!1;let a=e.match(/(?:[A-Za-z]:[/\\]|\/)[^\s'"]+/g);if(!a)return!1;for(let l of a){let c=l.replace(/[,;|&>]+$/,""),u=DTo?M1e(c):c;if(n8e(u)||PTo(u))return!0}return!1}
function inl(e){if(f8n(e)!==null)return!0;if(Kc()&&(e.replaceAll("\\","/").includes("agent-memory/")||e.replaceAll("\\","/").includes("agent-memory-local/")))return!0;return!1}
var mDe,DTo=!1;
var Mmt=b(()=>{Jm();cO();rz();dn();r2();mDe=require("path")});
export {h6p,tTe,v6t,f8n,t8e,onl,g6p,n8e,PTo,snl,inl,mDe,DTo,Mmt};
