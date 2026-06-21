// @ts-nocheck
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function eb(){return OUe.useContext(H$)!==null}
function My(e){let t=uIi.c(3),n=OUe.useContext(H$),r;if(t[0]!==n||t[1]!==e)r=n?{rows:n.rows,columns:n.columns}:e,t[0]=n,t[1]=e,t[2]=r;else r=t[2];return r}
function Tet(){return OUe.useContext(H$)?.scrollRef??null}
function xEn(){return OUe.useContext(H$)?.claimScrollBox??null}
var uIi,OUe,H$;
var pE=b(()=>{uIi=M(rt(),1),OUe=M(Te(),1),H$=OUe.createContext(null)});
export {eb,My,Tet,xEn,uIi,OUe,H$,pE};
