// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {useTimeout} from "./m2450.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {Gn,sc} from "./m2455.ts";
import {Box} from "./m2422.ts";
import {Fr,Ql} from "./m4405.ts";
import {Yg,Cae,lx} from "./m2777.ts";
import {getAdditionalDirectoriesForClaudeMd,setAdditionalDirectoriesForClaudeMd,lt} from "../src/session/0131_sent.ts";
import {clearCommandsCache,Sf} from "../src/tools/5142_toSlashCommands.ts";
import {clearAgentDefinitionsCache,scrubPathsConfig} from "../src/permissions/4454_toAgentInfos.ts";
import {resetSentSkillNames,Bv} from "../src/agent/4429_tryGetPDFReference.ts";
import {LF,axe} from "./m2767.ts";
import {SandboxManager,Ag} from "./m2671.ts";
import {recordSessionAlias,ja} from "../src/permissions/5143_writeRemoteAgentMetadata.ts";
import {A0i,mg} from "../src/agent/2580_level.ts";
import {_t,cu} from "./m582.ts";
import {z0t,R3r} from "./m2576.ts";
import {jZe,WZe,ZSn} from "./m2456.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var vrl={};
isFullscreenWithTTY(vrl,{call:()=>m6p});
function p6p(e){let t=Crl.c(7),{message:n,args:r,onDone:o}=e;useTimeout(o,0);let s;if(t[0]!==r)s=J0e.default.createElement(Text,{dimColor:!0},et.pointer," /add-dir ",r),t[0]=r,t[1]=s;else s=t[1];let i;if(t[2]!==n)i=J0e.default.createElement(Gn,null,J0e.default.createElement(Text,null,n)),t[2]=n,t[3]=i;else i=t[3];let a;if(t[4]!==s||t[5]!==i)a=J0e.default.createElement(Box,{flexDirection:"column"},s,i),t[4]=s,t[5]=i,t[6]=a;else a=t[6];return a}
async function m6p(e,t,n){let r=(n??"").trim(),o=Fr(t),s=async(a,l=!1)=>{let u={type:"addDirectories",directories:[a],destination:l?"localSettings":"session"};t.setToolPermissionContext((f)=>Yg(f,u));let d=getAdditionalDirectoriesForClaudeMd();if(!d.includes(a))setAdditionalDirectoriesForClaudeMd([...d,a]),clearCommandsCache(),clearAgentDefinitionsCache(),resetSentSkillNames(),LF.emit();SandboxManager.refreshConfig(),recordSessionAlias(a),A0i("--add-dir",a);let p;if(l)try{Cae(u),p=`Added ${_t.bold(a)} as a working directory and saved to local settings`}catch(f){p=`Added ${_t.bold(a)} as a working directory. Failed to save to local settings: ${f instanceof Error?f.message:"Unknown error"}`}else p=`Added ${_t.bold(a)} as a working directory for this session`;let m=`${p} ${_t.dim("\xB7 /permissions to manage")}`;e(m)};if(!r)return J0e.default.createElement(z0t,{permissionContext:o,onAddDirectory:s,onCancel:()=>{e("Did not add a working directory.")}});let i=await jZe(r,o);if(i.resultType!=="success"){let a=WZe(i);return J0e.default.createElement(p6p,{message:a,args:n??"",onDone:()=>e(a)})}return J0e.default.createElement(z0t,{directoryPath:i.absolutePath,permissionContext:o,onAddDirectory:s,onCancel:()=>{e(`Did not add ${_t.bold(i.absolutePath)} as a working directory.`)}})}
var Crl,J0e;
var wrl=b(()=>{cu();Ai();lt();Sf();sc();R3r();ze();mg();scrubPathsConfig();Bv();Ql();lx();Ag();ja();axe();ZSn();Crl=M(rt(),1),J0e=M(Te(),1)});
export {vrl,p6p,m6p,Crl,J0e,wrl};
