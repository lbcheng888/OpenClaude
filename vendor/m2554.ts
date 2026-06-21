// @ts-nocheck
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Tn(e){let t=EIi.c(5),{children:n}=e,r,o;if(t[0]!==n){o=Symbol.for("react.early_return_sentinel");e:{let i=Bie.Children.toArray(n).filter(rAd);if(i.length===0){o=null;break e}r=i.map(nAd)}t[0]=n,t[1]=r,t[2]=o}else r=t[1],o=t[2];if(o!==Symbol.for("react.early_return_sentinel"))return o;let s;if(t[3]!==r)s=Bie.default.createElement(Bie.default.Fragment,null,r),t[3]=r,t[4]=s;else s=t[4];return s}
function nAd(e,t){return Bie.default.createElement(Bie.default.Fragment,{key:Bie.isValidElement(e)?e.key??t:t},t>0&&Bie.default.createElement(Text,{dimColor:!0}," \xB7 "),e)}
function rAd(e){return e!==""}
var EIi,Bie;
var zs=b(()=>{ze();EIi=M(rt(),1),Bie=M(Te(),1)});
export {Tn,nAd,rAd,EIi,Bie,zs};
