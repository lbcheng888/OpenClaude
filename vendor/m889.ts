// @ts-nocheck
import {Q} from "../runtime.ts";
import {dys} from "./m888.ts";
var pme=Q((can)=>{var j_u=dys(),pys="content-length";function mys(e){return(t)=>async(n)=>{let r=n.request;if(j_u.HttpRequest.isInstance(r)){let{body:o,headers:s}=r;if(o&&Object.keys(s).map((i)=>i.toLowerCase()).indexOf(pys)===-1)try{let i=e(o);r.headers={...r.headers,[pys]:String(i)}}catch(i){}}return t({...n,request:r})}}var fys={step:"build",tags:["SET_CONTENT_LENGTH","CONTENT_LENGTH"],name:"contentLengthMiddleware",override:!0},Y_u=(e)=>({applyToStack:(t)=>{t.add(mys(e.bodyLengthChecker),fys)}});can.contentLengthMiddleware=mys;can.contentLengthMiddlewareOptions=fys;can.getContentLengthPlugin=Y_u});
export {pme};
