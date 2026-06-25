// @ts-nocheck
import {KOl,zOl} from "./m4991.ts";
import {WOl,GOl} from "./m4990.ts";
import {Kc,Jm} from "../src/config/2207_Jm.ts";
import {xOl,DOl} from "../src/config/4987_goNext.ts";
import {gOl,yOl} from "../src/tui/4982_tools.ts";
import {kOl,HOl} from "./m4985.ts";
import {OOl,LOl} from "./m4987.ts";
import {ROl,vOl} from "../src/tui/4985_updateWizardData.ts";
import {UOl,$Ol} from "../src/tui/4990_goNext.ts";
import {SOl,bOl} from "./m4982.ts";
import {NOl,FOl} from "./m4988.ts";
import {uOl,dOl} from "../src/core/4979_goNext.ts";
import {gqe} from "./m3829.ts";
import {b,x} from "../runtime.ts";
import {Fy} from "./m3832.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function YOl(e){let t=jOl.c(17),{tools:n,existingAgents:r,onComplete:o,onCancel:s}=e,i;if(t[0]!==r)i=()=>FGt.jsx(KOl,{existingAgents:r}),t[0]=r,t[1]=i;else i=t[1];let a;if(t[2]!==n)a=()=>FGt.jsx(WOl,{tools:n}),t[2]=n,t[3]=a;else a=t[3];let l;if(t[4]===Symbol.for("react.memo_cache_sentinel"))l=Kc()?[xOl]:[],t[4]=l;else l=t[4];let c;if(t[5]!==r||t[6]!==o||t[7]!==n)c=()=>FGt.jsx(gOl,{tools:n,existingAgents:r,onComplete:o}),t[5]=r,t[6]=o,t[7]=n,t[8]=c;else c=t[8];let u;if(t[9]!==i||t[10]!==a||t[11]!==c)u=[kOl,OOl,ROl,i,UOl,SOl,a,NOl,uOl,...l,c],t[9]=i,t[10]=a,t[11]=c,t[12]=u;else u=t[12];let d=u,p;if(t[13]===Symbol.for("react.memo_cache_sentinel"))p={},t[13]=p;else p=t[13];let m;if(t[14]!==s||t[15]!==d)m=FGt.jsx(gqe,{steps:d,initialData:p,onComplete:Vgm,onCancel:s,title:"Create new agent",showStepCounter:!1}),t[14]=s,t[15]=d,t[16]=m;else m=t[16];return m}
function Vgm(){}
var jOl,FGt;
var JOl=b(()=>{Jm();Fy();dOl();yOl();bOl();vOl();HOl();DOl();LOl();FOl();$Ol();GOl();zOl();jOl=x(tt(),1),FGt=x(oe(),1)});
export {YOl,Vgm,jOl,FGt,JOl};
