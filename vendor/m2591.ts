// @ts-nocheck
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {getGatewayAuth,isGatewayAuthPinned,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
import {iv} from "./m454.ts";
import {we} from "./m455.ts";
import {hn} from "./m251.ts";
function dhd(e){let t=e.indexOf("."),n=e.indexOf(".",t+1);if(t<0||n<0)return null;try{let r=uhd().safeParse(qt(Buffer.from(e.slice(t+1,n),"base64url").toString("utf8")));return r.success?r.data:null}catch{return null}}
function XEn(){let e=getGatewayAuth(),t=isGatewayAuthPinned(e)?e.jwt:void 0;if(t===j0i)return JEn;if(j0i=t,!t)return JEn=X3r;let n=dhd(t);if(!n)return JEn=X3r;let r={"identity.source":"gateway-oidc"};if(n.sub)r["user.id"]=n.sub;if(n.email)r["user.email"]=n.email;if(n.groups&&n.groups.length>0)r["user.groups"]=n.groups.join(",");return JEn=Object.freeze(r)}
var uhd,X3r,j0i,JEn;
var Q3r=b(()=>{iv();lt();Xt();uhd=we(()=>hn.object({sub:hn.string().optional(),email:hn.string().optional(),groups:hn.array(hn.string()).optional()}).passthrough());X3r=Object.freeze({}),JEn=X3r});
export {dhd,XEn,uhd,X3r,j0i,JEn,Q3r};
