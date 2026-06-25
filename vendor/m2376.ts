// @ts-nocheck
import {ZM,Ove} from "./m2375.ts";
import {sn,mc} from "./m237.ts";
import {DN,ppe} from "./m238.ts";
import {b} from "../runtime.ts";
function jCn(e,t,n){let r=ZM(e,t,n);while(sn(r)>n-t&&n>t)n--,r=ZM(e,t,n);return r}
function sgd(e,t,n){if(t<1)return"";let r=sn(e);if(r<=t)return e;if(t===1)return zCn;if(n==="start")return zCn+jCn(e,r-t+1,r);if(n==="middle"){let o=Math.floor(t/2);return jCn(e,0,o)+zCn+jCn(e,r-(t-o)+1,r)}return jCn(e,0,t-1)+zCn}
function e1(e,t,n="wrap"){if(n==="wrap"||n==="wrap-stream")return DN(e,t,{trim:!1,hard:!0});if(n==="wrap-trim")return DN(e,t,{trim:!0,hard:!0});if(n==="end"||n==="middle"||n.startsWith("truncate")){let r="end";if(n==="truncate-middle"||n==="middle")r="middle";if(n==="truncate-start")r="start";return sgd(e,t,r)}return e}
var zCn="\u2026";
var hPt=b(()=>{Ove();mc();ppe()});
export {jCn,sgd,e1,zCn,hPt};
