// @ts-nocheck
import {qt,tn} from "../src/config/0230_encoding.ts";
import {z_,isGatewayAuthPinned,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
import {MS} from "./m460.ts";
import {ve} from "./m461.ts";
import {jt} from "./m253.ts";
function Nvd(e){let t=e.indexOf("."),n=e.indexOf(".",t+1);if(t<0||n<0)return null;try{let r=Mvd().safeParse(qt(Buffer.from(e.slice(t+1,n),"base64url").toString("utf8")));return r.success?r.data:null}catch{return null}}
function $vn(){let e=z_(),t=isGatewayAuthPinned(e)?e.jwt:void 0;if(t===bNi)return Uvn;if(bNi=t,!t)return Uvn=k8r;let n=Nvd(t);if(!n)return Uvn=k8r;let r={"identity.source":"gateway-oidc"};if(n.sub)r["user.id"]=n.sub;if(n.email)r["user.email"]=n.email;if(n.groups&&n.groups.length>0)r["user.groups"]=n.groups.join(",");return Uvn=Object.freeze(r)}
var Mvd,k8r,bNi,Uvn;
var H8r=b(()=>{MS();lt();tn();Mvd=ve(()=>jt.object({sub:jt.string().optional(),email:jt.string().optional(),groups:jt.array(jt.string()).optional()}).passthrough());k8r=Object.freeze({}),Uvn=k8r});
export {Nvd,$vn,Mvd,k8r,bNi,Uvn,H8r};
