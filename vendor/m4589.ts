// @ts-nocheck
import {SandboxManager,Ag} from "./m2671.ts";
import {Box} from "./m2422.ts";
import {Hx,Ypt} from "./m4573.ts";
import {Es,kte} from "./m3926.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function jcl(){let e=qcl.c(2);if(!SandboxManager.isSupportedPlatform())return null;if(!SandboxManager.isSandboxEnabledInSettings())return null;if(!SandboxManager.isPlatformInEnabledList())return null;let t,n;if(e[0]===Symbol.for("react.memo_cache_sentinel")){n=Symbol.for("react.early_return_sentinel");e:{let r=SandboxManager.checkDependencies(),o=r.errors.length>0,s=r.warnings.length>0;if(!o&&!s){n=null;break e}t=_De.default.createElement(Box,{flexDirection:"column",marginTop:1},_De.default.createElement(Hx,{title:"Sandbox",status:o?"error":"warning"}),_De.default.createElement(Es,{variant:"tree"},r.errors.map(B7p),r.warnings.map(N7p),o&&_De.default.createElement(Es.Node,{dimColor:!0},"Run ",_De.default.createElement(Text,{color:"suggestion"},"/sandbox")," for install instructions")))}e[0]=t,e[1]=n}else t=e[0],n=e[1];if(n!==Symbol.for("react.early_return_sentinel"))return n;return t}
function N7p(e,t){return _De.default.createElement(Es.Node,{key:t,color:"warning"},e)}
function B7p(e,t){return _De.default.createElement(Es.Node,{key:t,color:"error"},e)}
var qcl,_De;
var Wcl=b(()=>{ze();Ag();Ypt();kte();qcl=M(rt(),1),_De=M(Te(),1)});
export {jcl,N7p,B7p,qcl,_De,Wcl};
