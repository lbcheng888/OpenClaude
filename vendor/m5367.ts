// @ts-nocheck
import {Vjl,Kjl} from "./m5366.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function zjl({input:e,pastedContents:t,onInputChange:n,setCursorOffset:r,setPastedContents:o}){let[s,i]=gGt.useState(!1);gGt.useEffect(()=>{if(s)return;if(e.length<=1e4)return;let{newInput:a,newPastedContents:l}=Vjl(e,t);n(a),r(a.length),o(l),i(!0)},[e,s,t,n,o,r]),gGt.useEffect(()=>{if(e==="")i(!1)},[e])}
var gGt;
var Yjl=b(()=>{Kjl();gGt=M(Te(),1)});
export {zjl,gGt,Yjl};
