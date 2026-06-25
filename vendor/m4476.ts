// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {useTimeout} from "./m2460.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {Yn,Pl} from "./m2465.ts";
import {Box} from "./m2432.ts";
import {Mr,xl} from "./m4427.ts";
import {i_,Aae,Sw} from "./m2789.ts";
import {getAdditionalDirectoriesForClaudeMd,setAdditionalDirectoriesForClaudeMd,lt} from "../src/session/0132_sent.ts";
import {clearCommandsCache,Mm} from "../src/tools/5174_toSlashCommands.ts";
import {clearAgentDefinitionsCache,kg} from "../src/permissions/4476_toAgentInfos.ts";
import {resetSentSkillNames,GA} from "../src/agent/4451_tryGetPDFReference.ts";
import {oB,zke} from "./m2779.ts";
import {SandboxManager,Uh} from "./m2682.ts";
import {recordSessionAlias,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {z1i,Pf} from "../src/agent/2591_level.ts";
import {bt,Gc} from "./m588.ts";
import {ROt,n8r} from "./m2587.ts";
import {Vtt,Ktt,UAn} from "./m2466.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
var dul={};
ft(dul,{call:()=>Xzp});
function Jzp(e){let t=uul.c(7),{message:n,args:r,onDone:o}=e;useTimeout(o,0);let s;if(t[0]!==r)s=mTe.jsxs(Text,{dimColor:!0,children:[Xe.pointer," /add-dir ",r]}),t[0]=r,t[1]=s;else s=t[1];let i;if(t[2]!==n)i=mTe.jsx(Yn,{children:mTe.jsx(Text,{children:n})}),t[2]=n,t[3]=i;else i=t[3];let a;if(t[4]!==s||t[5]!==i)a=mTe.jsxs(Box,{flexDirection:"column",children:[s,i]}),t[4]=s,t[5]=i,t[6]=a;else a=t[6];return a}
async function Xzp(e,t,n){let r=(n??"").trim(),o=Mr(t),s=async(a,l=!1)=>{let u={type:"addDirectories",directories:[a],destination:l?"localSettings":"session"};t.setToolPermissionContext((f)=>i_(f,u));let d=getAdditionalDirectoriesForClaudeMd();if(!d.includes(a))setAdditionalDirectoriesForClaudeMd([...d,a]),clearCommandsCache(),clearAgentDefinitionsCache(),resetSentSkillNames(),oB.emit();SandboxManager.refreshConfig(),recordSessionAlias(a),z1i("--add-dir",a);let p;if(l)try{Aae(u),p=`Added ${bt.bold(a)} as a working directory and saved to local settings`}catch(f){p=`Added ${bt.bold(a)} as a working directory. Failed to save to local settings: ${f instanceof Error?f.message:"Unknown error"}`}else p=`Added ${bt.bold(a)} as a working directory for this session`;let m=`${p} ${bt.dim("\xB7 /permissions to manage")}`;e(m)};if(!r)return mTe.jsx(ROt,{permissionContext:o,onAddDirectory:s,onCancel:()=>{e("Did not add a working directory.")}});let i=await Vtt(r,o);if(i.resultType!=="success"){let a=Ktt(i);return mTe.jsx(Jzp,{message:a,args:n??"",onDone:()=>e(a)})}return mTe.jsx(ROt,{directoryPath:i.absolutePath,permissionContext:o,onAddDirectory:s,onCancel:()=>{e(`Did not add ${bt.bold(i.absolutePath)} as a working directory.`)}})}
var uul,mTe;
var pul=b(()=>{Gc();Zs();lt();Mm();Pl();n8r();je();Pf();kg();GA();xl();Sw();Uh();_a();zke();UAn();uul=x(tt(),1),mTe=x(oe(),1)});
export {dul,Jzp,Xzp,uul,mTe,pul};
