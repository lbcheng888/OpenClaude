// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {xu,vK,gf,Kse,tA} from "../src/config/2201_tA.ts";
import {xK,_debugModuleInit,qfe,GO} from "../src/telemetry/2241_GO.ts";
import {nIt,uZ} from "../src/config/2245_displayName.ts";
import {UD,jMe,L2} from "../src/config/0640_existsSync.ts";
import {b} from "../runtime.ts";
function OBp(e){return e.split(T0e.win32.sep).join(T0e.posix.sep)}
function O_e(e){let t=OBp(e);return Mfo?t.toLowerCase():t}
function i4t(e){let t=tr(),n=O_e(e),r=O_e(t);if(!n.startsWith(r))return null;if(n.includes("/projects/")&&n.endsWith(".jsonl"))return"session_transcript";return null}
function X4n(e){let t=e.split(T0e.win32.sep).join(T0e.posix.sep);if(t.includes(".jsonl")||t.includes("projects")&&t.includes("*.jsonl"))return"session_transcript";return null}
function x6e(e){if(xu())return vK(e);return!1}
function LYa(e){if(xK(e))return"team";if(x6e(e))return"personal";return null}
function LBp(e){if(xu())return nIt(e);return!1}
function k6e(e){if(x6e(e))return!0;if(xK(e))return!0;if(i4t(e)!==null)return!0;if(LBp(e))return!0;return!1}
function Nfo(e){let t=T0e.normalize(e),n=O_e(t);if(xu()&&(n.includes("/agent-memory/")||n.includes("/agent-memory-local/")))return!0;if(_debugModuleInit()&&qfe(t))return!0;if(xu()){let a=gf(),l=O_e(a.replace(/[/\\]+$/,"")),c=O_e(a);if(n===l||n.startsWith(c))return!0}let r=O_e(tr()),o=O_e(Kse()),s=n.startsWith(r),i=n.startsWith(o);if(!s&&!i)return!1;if(s&&n.includes("/projects/"))return!0;if(xu()&&n.includes("/memory/"))return!0;return!1}
function MYa(e){let t=tr(),n=Kse(),r=xu()?gf().replace(/[/\\]+$/,""):"",o=O_e(e);if(![t,n,r].filter(Boolean).some((l)=>{if(o.includes(O_e(l)))return!0;if(Mfo)return o.includes(UD(l).toLowerCase());return!1}))return!1;let a=e.match(/(?:[A-Za-z]:[/\\]|\/)[^\s'"]+/g);if(!a)return!1;for(let l of a){let c=l.replace(/[,;|&>]+$/,""),u=Mfo?jMe(c):c;if(k6e(u)||Nfo(u))return!0}return!1}
function NYa(e){if(X4n(e)!==null)return!0;if(xu()&&(e.replaceAll("\\","/").includes("agent-memory/")||e.replaceAll("\\","/").includes("agent-memory-local/")))return!0;return!1}
var T0e,Mfo=!1;
var Ndt=b(()=>{tA();GO();uZ();sn();L2();T0e=require("path")});
export {OBp,O_e,i4t,X4n,x6e,LYa,LBp,k6e,Nfo,MYa,NYa,T0e,Mfo,Ndt};
