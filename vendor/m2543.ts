// @ts-nocheck
import {cAn,Sqr} from "./m2392.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function xie({line:e,column:t,active:n,visible:r=!1}){let o=Hhe.useContext(cAn),s=Hhe.useRef(null),i=Hhe.useCallback((a)=>{s.current=a},[]);return Hhe.useLayoutEffect(()=>{let a=s.current;if(n&&a)o({relativeX:t,relativeY:e,node:a,visible:r});else o(null,a)}),Hhe.useLayoutEffect(()=>()=>{o(null,s.current)},[o]),i}
var Hhe;
var bnt=b(()=>{Sqr();Hhe=x(et(),1)});
export {xie,Hhe,bnt};
