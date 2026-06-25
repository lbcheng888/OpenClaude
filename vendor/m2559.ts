// @ts-nocheck
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
function getSettingsSchema(){return D2e.useContext(Z2)!==null}
function Dy(e){let t=LMi.c(3),n=D2e.useContext(Z2),r;if(t[0]!==n||t[1]!==e)r=n?{rows:n.rows,columns:n.columns}:e,t[0]=n,t[1]=e,t[2]=r;else r=t[2];return r}
function Ant(){return D2e.useContext(Z2)?.scrollRef??null}
function hvn(){return D2e.useContext(Z2)?.claimScrollBox??null}
var LMi,D2e,Z2;
var SE=b(()=>{LMi=x(tt(),1),D2e=x(et(),1),Z2=D2e.createContext(null)});
export {getSettingsSchema,Dy,Ant,hvn,LMi,D2e,Z2,SE};
