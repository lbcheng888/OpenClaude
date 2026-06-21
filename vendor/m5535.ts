// @ts-nocheck
import {gie,wZe} from "./m2390.ts";
import {w5,F4} from "./m2416.ts";
import {qu,bk} from "./m2291.ts";
import {Wve,mF,RZ,XS} from "../src/config/2341_XS.ts";
import {jve,mie,BK} from "./m2339.ts";
import {BaseBox,LZ} from "./m2387.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function S5e(e){let t=zXl.c(7),{children:n,mouseTracking:r}=e,o=r===void 0?!0:r,s=T5e.useContext(gie),i=T5e.useContext(w5),a,l;if(t[0]!==o||t[1]!==i)a=()=>{let d=qu.get(process.stdout);if(!i)return;return i(Wve()+(o?jve:"")),d?.setAltScreenActive(!0,o),()=>{let p=d?!d.isAltScreenActive:!1;if(d?.setAltScreenActive(!1),d?.clearTextSelection(),p){i(o?mie:"");return}i((o?mie:"")+mF()+(d?.hasUnmounted?"":RZ()))}},l=[i,o],t[0]=o,t[1]=i,t[2]=a,t[3]=l;else a=t[2],l=t[3];T5e.useInsertionEffect(a,l);let c=s?.rows??24,u;if(t[4]!==n||t[5]!==c)u=T5e.default.createElement(BaseBox,{flexDirection:"column",height:c,width:"100%",flexShrink:0},n),t[4]=n,t[5]=c,t[6]=u;else u=t[6];return u}
var zXl,T5e;
var GXn=b(()=>{bk();XS();BK();F4();LZ();wZe();zXl=M(rt(),1),T5e=M(Te(),1)});
export {S5e,zXl,T5e,GXn};
