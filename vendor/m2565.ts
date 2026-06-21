// @ts-nocheck
import {useApp,H$r} from "./m2442.ts";
import {Y4,Cet} from "../src/config/2565_Cet.ts";
import {ju,wk} from "../src/tui/2564_current.ts";
import {logFeatureBadAsync,get} from "./m2523.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function LIi(e,t,n,r=!0){let{handleInterrupt:o,handleExit:s,exitState:i}=S3r(t,n),a=Lwe.useMemo(()=>({"app:interrupt":o,"app:exit":s}),[o,s]);return e(a,{context:"Global",isActive:r}),i}
function S3r(e,t){let{exit:n}=useApp(),[r,o]=Lwe.useState({pending:!1,keyName:null}),s=Lwe.useMemo(()=>t??n,[t,n]),i=Y4(),a=ju("app:interrupt","Global","Ctrl-C"),l=ju("app:exit","Global","Ctrl-D"),c=i&&a?a:"Ctrl-C",u=i&&l?l:"Ctrl-D",d=logFeatureBadAsync((A)=>o({pending:A,keyName:c}),s),p=logFeatureBadAsync((A)=>o({pending:A,keyName:u}),s),m=Lwe.useCallback(()=>{if(e?.())return;d()},[d,e]),f=Lwe.useCallback(()=>{p()},[p]);return{handleInterrupt:m,handleExit:f,exitState:r}}
var Lwe;
var MIi=b(()=>{H$r();wk();Cet();get();Lwe=M(Te(),1)});
export {LIi,S3r,Lwe,MIi};
