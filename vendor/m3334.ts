// @ts-nocheck
import {Lca,Mca} from "./m3333.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function SNt(){return Sst.useContext(yXr)}
function cY(e,t,{enabled:n=!0}={}){let r=SNt();Sst.useEffect(()=>{if(!n||!r)return;if(Lca(e))t()},[n,r,e,t])}
var Sst,yXr;
var rge=b(()=>{Mca();Sst=M(Te(),1),yXr=Sst.createContext(!0)});
export {SNt,cY,Sst,yXr,rge};
