// @ts-nocheck
import {mno,E_a} from "./m3363.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function R_a(e){let t=C_a.c(3),{children:n}=e,r;if(t[0]===Symbol.for("react.memo_cache_sentinel"))r=new mno,t[0]=r;else r=t[0];let o=r,s;if(t[1]!==n)s=w_a.jsx(A_a.Provider,{value:o,children:n}),t[1]=n,t[2]=s;else s=t[2];return s}
function v_a(){let e=lLn.useContext(A_a);if(!e)throw Error("useMailbox must be used within a MailboxProvider");return e}
var C_a,lLn,w_a,A_a;
var fno=b(()=>{E_a();C_a=x(tt(),1),lLn=x(et(),1),w_a=x(oe(),1),A_a=lLn.createContext(void 0)});
export {R_a,v_a,C_a,lLn,w_a,A_a,fno};
