// @ts-nocheck
import {useApp,a6r} from "./m2452.ts";
import {g4,wnt} from "../src/config/2576_wnt.ts";
import {wu,$k} from "../src/tui/2575_current.ts";
import {X2,Snt} from "./m2534.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function l1i(e,t,n,r=!0){let{handleInterrupt:o,handleExit:s,exitState:i}=J5r(t,n),a=Twe.useMemo(()=>({"app:interrupt":o,"app:exit":s}),[o,s]);return e(a,{context:"Global",isActive:r}),i}
function J5r(e,t){let{exit:n}=useApp(),[r,o]=Twe.useState({pending:!1,keyName:null}),s=Twe.useMemo(()=>t??n,[t,n]),i=g4(),a=wu("app:interrupt","Global","Ctrl-C"),l=wu("app:exit","Global","Ctrl-D"),c=i&&a?a:"Ctrl-C",u=i&&l?l:"Ctrl-D",d=X2((h)=>o({pending:h,keyName:c}),s),p=X2((h)=>o({pending:h,keyName:u}),s),m=Twe.useCallback(()=>{if(e?.())return;d()},[d,e]),f=Twe.useCallback(()=>{p()},[p]);return{handleInterrupt:m,handleExit:f,exitState:r}}
var Twe;
var c1i=b(()=>{a6r();$k();wnt();Snt();Twe=x(et(),1)});
export {l1i,J5r,Twe,c1i};
