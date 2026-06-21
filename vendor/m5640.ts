// @ts-nocheck
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function eZn(e){let t=zrc.c(7),{children:n}=e,{marker:r}=iOe.useContext(E1o),o;if(t[0]!==r)o=iOe.default.createElement(Text,{dimColor:!0},r),t[0]=r,t[1]=o;else o=t[1];let s;if(t[2]!==n)s=iOe.default.createElement(Box,{flexDirection:"column"},n),t[2]=n,t[3]=s;else s=t[3];let i;if(t[4]!==o||t[5]!==s)i=iOe.default.createElement(Box,{gap:1},o,s),t[4]=o,t[5]=s,t[6]=i;else i=t[6];return i}
var zrc,iOe,E1o;
var Yrc=b(()=>{ze();zrc=M(rt(),1),iOe=M(Te(),1),E1o=iOe.createContext({marker:""})});
export {eZn,zrc,iOe,E1o,Yrc};
