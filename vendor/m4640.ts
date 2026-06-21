// @ts-nocheck
import {Or,Ts} from "./m2542.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {at,rs} from "./m2546.ts";
import {yue} from "../src/tui/4630_existingApiKey.ts";
import {HE,JW} from "./m3976.ts";
import {AS,Yz} from "./m3174.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function gpl(e){let t=hpl.c(9),{warnings:n,onContinue:r}=e,o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o={context:"Confirmation"},t[0]=o;else o=t[0];Or("confirm:yes",r,o);let s;if(t[1]===Symbol.for("react.memo_cache_sentinel"))s=dD.default.createElement(Box,{flexDirection:"column",marginBottom:1},dD.default.createElement(Text,{bold:!0},et.warning," Setup Warnings"),dD.default.createElement(Text,{dimColor:!0},"We found some potential issues, but you can continue anyway")),t[1]=s;else s=t[1];let i;if(t[2]!==n)i=n.map(gzp),t[2]=n,t[3]=i;else i=t[3];let a;if(t[4]===Symbol.for("react.memo_cache_sentinel"))a=dD.default.createElement(at,{chord:"enter",action:"continue anyway"}),t[4]=a;else a=t[4];let l;if(t[5]===Symbol.for("react.memo_cache_sentinel"))l=dD.default.createElement(Box,{marginTop:1},dD.default.createElement(Text,{bold:!0,color:"permission"},"Press"," ",a,", or"," ",dD.default.createElement(at,{chord:"ctrl+c",action:"exit and fix issues",format:{modCase:"title",charCase:"upper"}}))),t[5]=l;else l=t[5];let c;if(t[6]===Symbol.for("react.memo_cache_sentinel"))c=dD.default.createElement(Box,{marginTop:1},dD.default.createElement(Text,{dimColor:!0},"You can also try the manual setup steps if needed:"," ",dD.default.createElement(Text,{color:"claude"},yue))),t[6]=c;else c=t[6];let u;if(t[7]!==i)u=dD.default.createElement(dD.default.Fragment,null,dD.default.createElement(HE,null,s,i,l,c)),t[7]=i,t[8]=u;else u=t[8];return u}
function gzp(e,t){return dD.default.createElement(Box,{key:t,flexDirection:"column",marginBottom:1},dD.default.createElement(Text,{color:"warning",bold:!0},e.title),dD.default.createElement(Text,null,e.message),e.instructions.length>0&&dD.default.createElement(Box,{flexDirection:"column",marginLeft:2,marginTop:1},e.instructions.map(_zp)))}
function _zp(e,t){return dD.default.createElement(AS,{key:t},dD.default.createElement(Text,{dimColor:!0},e))}
var hpl,dD;
var _pl=b(()=>{Ai();Yz();rs();JW();ze();Ts();hpl=M(rt(),1),dD=M(Te(),1)});
export {gpl,gzp,_zp,hpl,dD,_pl};
