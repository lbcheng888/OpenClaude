// @ts-nocheck
import {gie,wtt} from "./m2400.ts";
import {U8,i4} from "./m2426.ts";
import {du,iw} from "./m2302.ts";
import {Hve,MF,isNonMainSubagent,nS} from "../src/config/2351_nS.ts";
import {kve,mie,mz} from "./m2349.ts";
import {BaseBox,xZ} from "./m2397.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function wyt(e){let t=Pic.c(7),{children:n,mouseTracking:r}=e,o=r===void 0?!0:r,s=gzt.useContext(gie),i=gzt.useContext(U8),a,l;if(t[0]!==o||t[1]!==i)a=()=>{let d=du.get(process.stdout);if(!i)return;return i(Hve()+(o?kve:"")),d?.setAltScreenActive(!0,o),()=>{let p=d?!d.isAltScreenActive:!1;if(d?.setAltScreenActive(!1),d?.clearTextSelection(),p){i(o?mie:"");return}i((o?mie:"")+MF()+(d?.hasUnmounted?"":isNonMainSubagent()))}},l=[i,o],t[0]=o,t[1]=i,t[2]=a,t[3]=l;else a=t[2],l=t[3];gzt.useInsertionEffect(a,l);let c=s?.rows??24,u;if(t[4]!==n||t[5]!==c)u=Oic.jsx(BaseBox,{flexDirection:"column",height:c,width:"100%",flexShrink:0,children:n}),t[4]=n,t[5]=c,t[6]=u;else u=t[6];return u}
var Pic,gzt,Oic;
var Ktr=b(()=>{iw();nS();mz();i4();xZ();wtt();Pic=x(tt(),1),gzt=x(et(),1),Oic=x(oe(),1)});
export {wyt,Pic,gzt,Oic,Ktr};
