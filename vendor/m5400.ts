// @ts-nocheck
import {HYl,IYl} from "./m5399.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function xYl({input:e,pastedContents:t,onInputChange:n,setCursorOffset:r,setPastedContents:o}){let[s,i]=G7t.useState(!1);G7t.useEffect(()=>{if(s)return;if(e.length<=1e4)return;let{newInput:a,newPastedContents:l}=HYl(e,t);n(a),r(a.length),o(l),i(!0)},[e,s,t,n,o,r]),G7t.useEffect(()=>{if(e==="")i(!1)},[e])}
var G7t;
var DYl=b(()=>{IYl();G7t=x(et(),1)});
export {xYl,G7t,DYl};
