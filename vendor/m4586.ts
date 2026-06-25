// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {P_,po} from "../src/tools/5224_userPromptCount.ts";
import {Cs,tp} from "../src/config/2284_loggedTmuxCcDisable.ts";
import {Nu,sM,Wu} from "./m438.ts";
import {fct,i0e} from "./m3768.ts";
import {RRo,rgl} from "../src/core/4585_count.ts";
import {Y8t,vRo} from "../src/core/4586_categories.ts";
import {Ce,Ct} from "./m197.ts";
import {jWn,YWn} from "../src/permissions/4434_level.ts";
import {oe} from "./m2275.ts";
var ogl={};
ft(ogl,{call:()=>_em});
function gem(e){return P_(e)}
async function _em(e,t,n){let r=Cs()&&n.trim().toLowerCase()!=="all",o=Nu();if(o){if(!sM("controlChannel"))return e("Context usage isn't available over this remote connection"),null;try{let f=await o.sendControlRequest({subtype:"get_context_usage"}),h=await fct(wRo.jsx(RRo,{data:f,isRemote:!0,collapseDetailSections:r}));e(h,{display:"system",metaMessages:[Y8t(f,{skipCollapseStatus:!0})]})}catch(f){e(`Couldn't fetch context from remote: ${Ce(f)}`)}return null}let{messages:s,getAppState:i,options:{mainLoopModel:a,tools:l}}=t,c=gem(s),u=process.stdout.columns||80,d=i(),p=await jWn(c,a,async()=>d.toolPermissionContext,l,d.agentDefinitions,u,t,void 0,c,d.autoCompactWindow),m=await fct(wRo.jsx(RRo,{data:p,collapseDetailSections:r}));return e(m,{display:"system",metaMessages:[Y8t(p)]}),null}
var wRo;
var sgl=b(()=>{rgl();Wu();YWn();Ct();tp();po();i0e();vRo();wRo=x(oe(),1)});
export {ogl,gem,_em,wRo,sgl};
