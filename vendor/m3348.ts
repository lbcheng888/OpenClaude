// @ts-nocheck
import {IXr,cua} from "./m3347.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function pua(e){let t=uua.c(3),{children:n}=e,r;if(t[0]===Symbol.for("react.memo_cache_sentinel"))r=new IXr,t[0]=r;else r=t[0];let o=r,s;if(t[1]!==n)s=vst.default.createElement(dua.Provider,{value:o},n),t[1]=n,t[2]=s;else s=t[2];return s}
function mua(){let e=vst.useContext(dua);if(!e)throw Error("useMailbox must be used within a MailboxProvider");return e}
var uua,vst,dua;
var DXr=b(()=>{cua();uua=M(rt(),1),vst=M(Te(),1),dua=vst.createContext(void 0)});
export {pua,mua,uua,vst,dua,DXr};
